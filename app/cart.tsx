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
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
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
  const insets = useSafeAreaInsets();

  const cartItems = items as CartItem[];
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.nbre,
    0
  );
  const total = totalPrice + DELIVERY_FEE;
  const isCartEmpty = cartItems.length === 0;
  const itemCount = cartItems.reduce((acc, item) => acc + item.nbre, 0);

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
    Alert.alert(
      t('cart.clearConfirmTitle'),
      t('cart.clearConfirmMessage'),
      [
        { text: t('cart.cancel'), style: 'cancel' },
        {
          text: t('cart.clearCart'),
          style: 'destructive',
          onPress: () => {
            clearCart();
            router.push('/(tabs)');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.area} edges={['top']}>
      {/* ✅ Uniquement `style` — le vert vient du SafeAreaView */}
      <StatusBar style="light" />

      {/* ─── Header ─── */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel={t('cart.back')}
        >
          {/* ✅ Cohérent avec le reste de l'app */}
          <AntDesign name="left" size={22} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {t('cart.title')}
        </Text>
        <View style={styles.itemBadge}>
          <Text style={styles.itemBadgeText}>
            {t('cart.itemsCount', { count: itemCount })}
          </Text>
        </View>
      </View>

      {/* ─── Contenu ─── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {isCartEmpty ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconWrapper}>
              {/* ✅ Gardé : pas d'équivalent Feather pour le panier barré */}
              <MaterialCommunityIcons
                name="cart-off"
                size={56}
                color="green"
              />
            </View>
            <Text style={styles.emptyTitle}>{t('cart.empty')}</Text>
            <Text style={styles.emptySubtitle}>{t('cart.emptySubtitle')}</Text>
            <Pressable
              onPress={() => router.push('/(tabs)')}
              style={({ pressed }) => [
                styles.emptyButton,
                pressed && styles.buttonPressed,
              ]}
              accessibilityRole="button"
            >
              <Text style={styles.emptyButtonText}>
                {t('cart.browseRestaurants')}
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            {/* ─── Articles ─── */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                {/* ✅ Feather shopping-bag (inchangé, validé) */}
                <Feather name="shopping-bag" size={16} color="green" />
                <Text style={styles.sectionTitle}>
                  {t('cart.itemsSectionTitle')}
                </Text>
              </View>

              {cartItems.map((item) => (
                <View key={item.id} style={styles.itemCard}>
                  <View style={styles.itemImageWrapper}>
                    {item.imageUrl ? (
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.itemImage}
                        resizeMode="cover"
                      />
                    ) : null}
                  </View>

                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.name}
                    </Text>

                    {Object.entries(item.options || {}).map(([group, option]) => (
                      <View key={group} style={styles.optionRow}>
                        <Text style={styles.optionLabel}>{group}:</Text>
                        <Text style={styles.optionValue}>{option.name}</Text>
                      </View>
                    ))}

                    <View style={styles.itemBottomRow}>
                      <Text style={styles.itemPrice}>
                        {(item.unitPrice * item.nbre).toFixed(0)}{' '}
                        <Text style={styles.currency}>
                          {t('cart.currency')}
                        </Text>
                      </Text>

                      <View style={styles.quantityControls}>
                        <Pressable
                          onPress={() =>
                            updateQuantity(item.id, item.nbre - 1)
                          }
                          style={styles.qtyBtn}
                          accessibilityLabel={t('cart.decrease')}
                        >
                          {/* ✅ Cohérent avec le Signup/qty ailleurs dans l'app */}
                          <AntDesign name="minus" size={14} color="green" />
                        </Pressable>
                        <Text style={styles.quantity}>{item.nbre}</Text>
                        <Pressable
                          onPress={() =>
                            updateQuantity(item.id, item.nbre + 1)
                          }
                          style={[styles.qtyBtn, styles.qtyBtnPrimary]}
                          accessibilityLabel={t('cart.increase')}
                        >
                          <AntDesign name="plus" size={14} color="#FFFFFF" />
                        </Pressable>
                      </View>
                    </View>
                  </View>

                  <Pressable
                    onPress={() => removeFromCart(item.id)}
                    style={styles.removeButton}
                    accessibilityRole="button"
                    accessibilityLabel={t('cart.removeItem', {
                      name: item.name,
                    })}
                  >
                    <AntDesign name="close" size={16} color="#9CA3AF" />
                  </Pressable>
                </View>
              ))}
            </View>

            {/* ─── Livraison ─── */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                {/* ✅ truck : sémantique livraison (au lieu de map-pin) */}
                <Feather name="truck" size={16} color="green" />
                <Text style={styles.sectionTitle}>
                  {t('cart.deliverySectionTitle')}
                </Text>
              </View>
              <View style={styles.deliveryCard}>
                <View style={styles.deliveryIconWrapper}>
                  {/* ✅ map-pin : sémantique adresse (au lieu de motorcycle) */}
                  <Feather name="map-pin" size={18} color="green" />
                </View>
                <View style={styles.deliveryInfo}>
                  <Text style={styles.deliveryLabel}>
                    {t('cart.deliveryLabel')}
                  </Text>
                  <Text style={styles.deliveryValue} numberOfLines={1}>
                    {address
                      ? t('cart.deliveryAtHome')
                      : t('cart.deliveryUnknown')}
                  </Text>
                </View>
                <Text style={styles.deliveryFee}>
                  {DELIVERY_FEE}{' '}
                  <Text style={styles.currency}>{t('cart.currency')}</Text>
                </Text>
              </View>
            </View>

            {/* ─── Récapitulatif ─── */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                {/* ✅ receipt : sémantique facture (au lieu de file-text) */}
                <Feather name="receipt" size={16} color="green" />
                <Text style={styles.sectionTitle}>
                  {t('cart.summarySectionTitle')}
                </Text>
              </View>

              <View style={styles.summaryCard}>
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
                <View style={styles.summaryDivider} />
                <View style={styles.totalRow}>
                  <Text style={styles.totalKeyBold}>{t('cart.total')}</Text>
                  <Text style={styles.totalValueBold}>
                    {total.toFixed(0)}{' '}
                    <Text style={styles.currencyBold}>
                      {t('cart.currency')}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>

            {/* ─── Vider le panier ─── */}
            <Pressable
              style={({ pressed }) => [
                styles.clearCartButton,
                pressed && styles.buttonPressed,
                loading && styles.buttonDisabled,
              ]}
              disabled={loading}
              onPress={handleClear}
              accessibilityRole="button"
            >
              {/* ✅ Feather trash-2 : plus net, famille unifiée avec Feather */}
              <Feather name="trash-2" size={16} color="#EF4444" />
              <Text style={styles.clearCartText}>{t('cart.clearCart')}</Text>
            </Pressable>
          </>
        )}
      </ScrollView>

      {/* ─── Footer sticky ─── */}
      {!isCartEmpty && (
        <View
          style={[
            styles.footer,
            { paddingBottom: Math.max(insets.bottom, 12) },
          ]}
        >
          <View style={styles.footerTotal}>
            <Text style={styles.footerTotalLabel}>{t('cart.total')}</Text>
            <Text style={styles.footerTotalValue}>
              {total.toFixed(0)}{' '}
              <Text style={styles.footerTotalCurrency}>
                {t('cart.currency')}
              </Text>
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.orderButton,
              pressed && styles.buttonPressed,
              loading && styles.buttonDisabled,
            ]}
            disabled={loading}
            onPress={handleOrder}
            accessibilityRole="button"
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <AntDesign name="check" size={18} color="#FFFFFF" />
            )}
            <Text style={styles.orderButtonText}>
              {loading ? t('cart.processing') : t('cart.orderButton')}
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

export default Cart;

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: 'green',
  },

  /* ─── Header ─── */
  header: {
    width: '100%',
    minHeight: 56,
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  headerTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  itemBadge: {
    minWidth: 44,
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  /* ─── Contenu ─── */
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#F9FAFB',
    padding: 12,
    paddingBottom: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  /* ─── État vide ─── */
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
    gap: 10,
  },
  emptyIconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  emptyButton: {
    minHeight: 48,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },

  /* ─── Sections ─── */
  section: { marginBottom: 16 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  /* ─── Carte article ─── */
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  itemImageWrapper: {
    width: 70,
    height: 70,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  itemImage: { width: '100%', height: '100%' },
  itemDetails: { flex: 1 },
  itemName: {
    fontWeight: '700',
    fontSize: 15,
    color: '#111827',
  },
  optionRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 2,
  },
  optionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  optionValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  itemBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 8,
  },
  itemPrice: {
    fontWeight: '700',
    fontSize: 16,
    color: 'green',
    flexShrink: 1,
  },
  currency: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnPrimary: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    minWidth: 22,
    textAlign: 'center',
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },

  /* ─── Carte livraison ─── */
  deliveryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 10,
  },
  deliveryIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryInfo: { flex: 1 },
  deliveryLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  deliveryValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },
  deliveryFee: {
    fontSize: 14,
    fontWeight: '700',
    color: 'green',
  },

  /* ─── Carte récapitulatif ─── */
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalKey: { color: '#6B7280', fontSize: 14 },
  totalValue: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
  totalKeyBold: {
    fontWeight: '700',
    color: '#111827',
    fontSize: 16,
  },
  totalValueBold: {
    fontWeight: '700',
    color: 'green',
    fontSize: 18,
  },
  currencyBold: {
    fontSize: 12,
    fontWeight: '600',
    color: 'green',
  },

  /* ─── Bouton vider ─── */
  clearCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    minHeight: 44,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
    marginTop: 4,
    alignSelf: 'center',
  },
  clearCartText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 13,
  },

  /* ─── Footer sticky ─── */
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  footerTotal: { flex: 1 },
  footerTotalLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  footerTotalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: 'green',
    marginTop: 2,
  },
  footerTotalCurrency: {
    fontSize: 12,
    fontWeight: '600',
  },
  orderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'green',
    minHeight: 50,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  buttonPressed: { opacity: 0.85 },
  buttonDisabled: { opacity: 0.6 },
});