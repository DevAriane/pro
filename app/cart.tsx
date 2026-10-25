import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useOrders } from '@/contexts/OrderContext';
import { useCart } from '@/contexts/CartContext';
import { getCurrentAddress } from '@/utils/location';

const DELIVERY_FEE = 1000;

type CartOption = { name: string };

type CartItem = {
  id: string;
  name: string;
  imageUrl?: string;
  unitPrice: number;
  nbre: number;
  options?: Record<string, CartOption>;
};

function Cart() {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<unknown>(null);

  const { items, removeFromCart, updateQuantity, clearCart, restaurantCartId } =
    useCart();
  const router = useRouter();
  const { createOrder } = useOrders();
  const { t } = useTranslation();

  const cartItems = items as CartItem[];
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.nbre,
    0
  );
  const total = totalPrice + DELIVERY_FEE;
  const isCartEmpty = cartItems.length === 0;

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const fetchedAddress = await getCurrentAddress();
        setAddress(fetchedAddress);
      } catch (error) {
        console.error('Failed to fetch address:', error);
        Alert.alert(t('cart.errorTitle'), t('cart.addressFetchError'));
      }
    };
    fetchAddress();
  }, [t]);

  const handleOrder = async () => {
    if (!address) {
      Alert.alert(
        t('cart.locationRequiredTitle'),
        t('cart.locationRequiredMessage')
      );
      return;
    }
    setLoading(true);
    try {
      const orderData = {
        restaurantId: restaurantCartId,
        items: cartItems,
        pricing: {
          subtotal: totalPrice,
          deliveryFee: DELIVERY_FEE,
          net: total,
        },
        payment: { method: 'cash', status: 'completed' },
        delivery: {
          address,
          instructions: t('cart.defaultInstructions'),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await createOrder(orderData);
      clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert(t('cart.errorTitle'), t('cart.orderFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    clearCart();
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="#10B981" style="light" />

      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel={t('cart.back')}
        >
          <AntDesign name="left" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>{t('cart.title')}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {isCartEmpty ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="cart-off"
              size={64}
              color="#9CA3AF"
            />
            <Text style={styles.emptyText}>{t('cart.empty')}</Text>
          </View>
        ) : (
          <>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                  {item.imageUrl ? (
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  ) : null}
                </View>

                <View style={styles.itemDetails}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  {Object.entries(item.options || {}).map(([group, option]) => (
                    <Text style={styles.optionText} key={group}>
                      {group}:{' '}
                      <Text style={styles.optionValue}>{option.name}</Text>
                    </Text>
                  ))}
                  <Text style={styles.itemPrice}>
                    {(item.unitPrice * item.nbre).toFixed(0)}{' '}
                    <Text style={styles.currency}>{t('cart.currency')}</Text>
                  </Text>
                </View>

                <View style={styles.actions}>
                  <Pressable
                    onPress={() => removeFromCart(item.id)}
                    accessibilityRole="button"
                    accessibilityLabel={t('cart.removeItem', {
                      name: item.name,
                    })}
                    style={styles.removeButton}
                  >
                    <AntDesign name="closecircle" size={20} color="#EF4444" />
                  </Pressable>
                  <View style={styles.quantityControls}>
                    <Pressable
                      onPress={() => updateQuantity(item.id, item.nbre - 1)}
                      accessibilityLabel={t('cart.decrease')}
                    >
                      <AntDesign
                        name="minuscircleo"
                        size={20}
                        color="#10B981"
                      />
                    </Pressable>
                    <Text style={styles.quantity}>{item.nbre}</Text>
                    <Pressable
                      onPress={() => updateQuantity(item.id, item.nbre + 1)}
                      accessibilityLabel={t('cart.increase')}
                    >
                      <AntDesign name="pluscircle" size={20} color="#10B981" />
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}

            <View style={styles.totalSection}>
              <Text style={styles.totalLabel}>{t('cart.amountToPay')}</Text>
              <View style={styles.totalRow}>
                <Text style={styles.totalKey}>{t('cart.subtotal')}</Text>
                <Text style={styles.totalValue}>
                  {totalPrice.toFixed(0)}{' '}
                  <Text style={styles.currency}>{t('cart.currency')}</Text>
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalKey}>{t('cart.deliveryFee')}</Text>
                <Text style={styles.totalValue}>
                  {DELIVERY_FEE}{' '}
                  <Text style={styles.currency}>{t('cart.currency')}</Text>
                </Text>
              </View>
              <View style={[styles.totalRow, styles.totalRowHighlight]}>
                <Text style={styles.totalKeyBold}>{t('cart.total')}</Text>
                <Text style={styles.totalValueBold}>
                  {total.toFixed(0)}{' '}
                  <Text style={styles.currencyBold}>{t('cart.currency')}</Text>
                </Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.clearCartButton, loading && styles.buttonDisabled]}
                disabled={loading}
                onPress={handleClear}
                accessibilityRole="button"
              >
                <MaterialCommunityIcons
                  name="delete-forever"
                  size={20}
                  color="#10B981"
                />
                <Text style={styles.clearCartText}>{t('cart.clearCart')}</Text>
              </Pressable>
              <Pressable
                style={[styles.orderButton, loading && styles.buttonDisabled]}
                disabled={loading}
                onPress={handleOrder}
                accessibilityRole="button"
              >
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    color="#FFFFFF"
                    style={styles.indicator}
                  />
                ) : (
                  <AntDesign name="checkcircle" size={20} color="#FFFFFF" />
                )}
                <Text style={styles.orderButtonText}>
                  {t('cart.orderButton')}
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Cart;

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    width: '100%',
    minHeight: 56,
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 44,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 10,
    paddingBottom: 24,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontWeight: '700',
    fontSize: 14,
    color: '#111827',
  },
  optionText: {
    fontWeight: '600',
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  optionValue: {
    color: '#111827',
  },
  itemPrice: {
    fontWeight: '700',
    fontSize: 16,
    color: '#111827',
    marginTop: 4,
  },
  currency: {
    fontSize: 12,
    fontWeight: '500',
  },
  actions: {
    alignItems: 'flex-end',
  },
  removeButton: {
    marginBottom: 10,
    padding: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 80,
  },
  quantity: {
    fontWeight: '700',
    fontSize: 14,
    color: '#111827',
    paddingHorizontal: 8,
  },
  totalSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  totalLabel: {
    fontWeight: '700',
    fontSize: 16,
    color: '#111827',
    marginBottom: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  totalRowHighlight: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
    marginTop: 8,
  },
  totalKey: {
    color: '#6B7280',
    fontSize: 14,
  },
  totalValue: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  totalKeyBold: {
    fontWeight: '700',
    color: '#111827',
    fontSize: 16,
  },
  totalValueBold: {
    fontWeight: '700',
    color: '#10B981',
    fontSize: 16,
  },
  currencyBold: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  clearCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#10B981',
    backgroundColor: '#FFFFFF',
    minHeight: 48,
    paddingHorizontal: 12,
    gap: 6,
  },
  clearCartText: {
    color: '#10B981',
    fontWeight: '600',
    fontSize: 14,
  },
  orderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#10B981',
    minHeight: 48,
    paddingHorizontal: 12,
    gap: 6,
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  indicator: {
    marginRight: 8,
  },
});