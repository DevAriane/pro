import {
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
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { RadioButton } from 'react-native-paper';

import { useCart } from '@/contexts/CartContext';

type CustomizationOption = { name: string; priceModifier?: number };
type CustomizationGroup = { name: string; options: CustomizationOption[] };

type FoodItem = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
  restaurantName?: string;
  restaurantId: string;
  customizationOptions?: CustomizationGroup[];
};

type SelectedOptions = Record<string, CustomizationOption>;

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a == null || b == null)
    return false;
  const ka = Object.keys(a as object);
  const kb = Object.keys(b as object);
  if (ka.length !== kb.length) return false;
  return ka.every((k) =>
    deepEqual(
      (a as Record<string, unknown>)[k],
      (b as Record<string, unknown>)[k]
    )
  );
}

export default function Fd() {
  const { t } = useTranslation();
  const params = useLocalSearchParams();

  let item: FoodItem | null = null;
  try {
    item = params.item
      ? (JSON.parse(params.item as string) as FoodItem)
      : null;
  } catch {
    item = null;
  }

  const { addToCart, restaurantCartId, clearCart, items, updateQuantity } =
    useCart();
  const [count, setCount] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(
    () => {
      const defaults: SelectedOptions = {};
      item?.customizationOptions?.forEach((group) => {
        if (group.options?.[0]) defaults[group.name] = group.options[0];
      });
      return defaults;
    }
  );

  const unitPrice = useMemo(() => {
    if (!item) return 0;
    const extra = Object.values(selectedOptions).reduce(
      (acc, opt) => acc + Number(opt.priceModifier ?? 0),
      0
    );
    return Number(item.price ?? 0) + extra;
  }, [item, selectedOptions]);

  const total = unitPrice * count;

  if (!item) {
    return (
      <SafeAreaView style={styles.area}>
        <View style={styles.invalid}>
          <Text style={styles.invalidText}>
            {t('foodDetail.invalidData')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    const newItem = {
      ...item,
      options: selectedOptions,
      unitPrice,
      nbre: count,
      montant: total,
    };

    if (restaurantCartId && restaurantCartId !== item!.restaurantId) {
      Alert.alert(
        t('foodDetail.cartConflictTitle'),
        t('foodDetail.cartConflictMessage'),
        [
          { text: t('foodDetail.cancel'), style: 'cancel' },
          {
            text: t('foodDetail.clearAndAdd'),
            onPress: () => {
              const cleaned = clearCart();
              if (cleaned) addToCart(newItem, item!.restaurantId);
            },
          },
        ]
      );
      return;
    }

    const existing = items.find((x) => x.id === item!.id);
    if (existing) {
      if (deepEqual(existing.options, newItem.options)) {
        updateQuantity(existing.id, existing.nbre + count);
      } else {
        addToCart(
          { ...newItem, id: `${item!.id}_${Date.now()}` },
          item!.restaurantId
        );
      }
    } else {
      addToCart(newItem, item!.restaurantId);
    }
    setIsAddedToCart(true);
  };

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="" style="light" />
      <View style={styles.container}>
        {item.imageUrl ? (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.cover}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.cover, styles.coverPlaceholder]} />
        )}

        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel={t('foodDetail.back')}
        >
          <AntDesign name="left" size={22} color="#FFFFFF" />
        </Pressable>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={2}>
              {item.name}
            </Text>
            {item.restaurantName ? (
              <Text style={styles.restaurant} numberOfLines={1}>
                {item.restaurantName}
              </Text>
            ) : null}

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <AntDesign name="staro" size={16} color="#10B981" />
                <Text style={styles.metaText}>
                  {t('foodDetail.rating')}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  size={16}
                  color="#10B981"
                />
                <Text style={styles.metaText}>
                  {t('foodDetail.freeDelivery')}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Feather name="clock" size={16} color="#10B981" />
                <Text style={styles.metaText}>
                  {t('foodDetail.deliveryTime')}
                </Text>
              </View>
            </View>

            {item.description ? (
              <Text style={styles.description}>{item.description}</Text>
            ) : null}

            {item.customizationOptions?.map((group) => (
              <View key={group.name} style={styles.optionGroup}>
                <Text style={styles.optionGroupTitle}>{group.name}</Text>
                {group.options.map((opt) => {
                  const selected =
                    selectedOptions[group.name]?.name === opt.name;
                  return (
                    <Pressable
                      key={opt.name}
                      style={styles.optionRow}
                      onPress={() =>
                        setSelectedOptions((prev) => ({
                          ...prev,
                          [group.name]: opt,
                        }))
                      }
                      accessibilityRole="radio"
                      accessibilityState={{ selected }}
                    >
                      <Text style={styles.optionLabel}>{opt.name}</Text>
                      <View style={styles.optionRight}>
                        {opt.priceModifier ? (
                          <Text style={styles.optionPrice}>
                            {t('foodDetail.priceModifier', {
                              value: opt.priceModifier,
                              currency: t('foodDetail.currency'),
                            })}
                          </Text>
                        ) : null}
                        <RadioButton
                          value={opt.name}
                          status={selected ? 'checked' : 'unchecked'}
                          onPress={() =>
                            setSelectedOptions((prev) => ({
                              ...prev,
                              [group.name]: opt,
                            }))
                          }
                          color="#10B981"
                        />
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityLabel}>
                {t('foodDetail.quantityLabel')}
              </Text>
              <Pressable
                style={styles.qtyBtn}
                onPress={() => setCount((p) => Math.max(1, p - 1))}
                accessibilityLabel={t('foodDetail.decrease')}
              >
                <Text style={styles.qtyBtnText}>-</Text>
              </Pressable>
              <Text style={styles.qtyValue}>{count}</Text>
              <Pressable
                style={[styles.qtyBtn, styles.qtyBtnPrimary]}
                onPress={() => setCount((p) => p + 1)}
                accessibilityLabel={t('foodDetail.increase')}
              >
                <Text style={[styles.qtyBtnText, styles.qtyBtnTextPrimary]}>
                  +
                </Text>
              </Pressable>
            </View>
            <Text style={styles.total}>
              {total.toFixed(0)}{' '}
              <Text style={styles.currency}>
                {t('foodDetail.currency')}
              </Text>
            </Text>
          </View>

          <Pressable
            style={styles.primaryButton}
            onPress={handleAddToCart}
            accessibilityRole="button"
          >
            <Text style={styles.primaryButtonText}>
              {t('foodDetail.addToCart')}
            </Text>
          </Pressable>

          {isAddedToCart ? (
            <Pressable
              style={[styles.primaryButton, styles.goToCartButton]}
              onPress={() => router.push('/cart')}
              accessibilityRole="button"
            >
              <Text style={styles.primaryButtonText}>
                {t('foodDetail.goToCart')}
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { flex: 1 },
  cover: {
    width: '100%',
    height: 200,
    backgroundColor: '#E5E7EB',
  },
  coverPlaceholder: { backgroundColor: '#E5E7EB' },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  scrollContent: { paddingBottom: 16 },
  content: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: { fontSize: 22, fontWeight: '700', color: '#111827' },
  restaurant: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
    paddingVertical: 12,
  },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { color: '#6B7280', fontSize: 13 },
  description: { fontSize: 14, color: '#4B5563', lineHeight: 20 },
  optionGroup: { marginTop: 16 },
  optionGroupTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionLabel: { fontSize: 14, color: '#111827', flex: 1 },
  optionRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  optionPrice: { fontSize: 13, color: '#10B981', fontWeight: '600' },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantityLabel: { fontSize: 14, fontWeight: '600', color: '#111827' },
  qtyBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  qtyBtnPrimary: { backgroundColor: '#10B981', borderColor: '#10B981' },
  qtyBtnText: { fontSize: 20, fontWeight: '700', color: '#10B981' },
  qtyBtnTextPrimary: { color: '#FFFFFF' },
  qtyValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    minWidth: 24,
    textAlign: 'center',
  },
  total: { fontSize: 18, fontWeight: '700', color: '#10B981' },
  currency: { fontSize: 13, fontWeight: '500' },
  primaryButton: {
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goToCartButton: { backgroundColor: '#3B82F6' },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  invalid: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  invalidText: { fontSize: 15, color: '#6B7280', textAlign: 'center' },
});