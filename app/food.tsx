import {
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
import FontAwesome from '@expo/vector-icons/FontAwesome';

type FoodParams = {
  id?: string;
  image?: string;
  titre?: string;
  menu?: string;
  prix?: string;
  commentaire?: string;
  price?: string;
};

export default function Food() {
  const { t } = useTranslation();
  const params = useLocalSearchParams<FoodParams>();
  const [count, setCount] = useState(1);

  const prixNumber = Number(params.prix ?? 0);
  const priceNumber = Number(params.price ?? 0);

  const total = useMemo(() => prixNumber * count, [prixNumber, count]);

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel={t('food.back')}
          >
            <AntDesign name="left" size={22} color="#FFFFFF" />
          </Pressable>
          <Text style={styles.headerTitle}>{t('food.headerTitle')}</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {params.image ? (
              <Image
                source={{ uri: params.image }}
                style={styles.cover}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.cover, styles.coverPlaceholder]} />
            )}

            <Text style={styles.title}>{params.titre ?? ''}</Text>

            <View style={styles.ratingRow}>
              {[0, 1, 2, 3].map((i) => (
                <FontAwesome key={i} name="star" size={14} color="#F59E0B" />
              ))}
              <FontAwesome name="star-half-full" size={14} color="#F59E0B" />
              <Text style={styles.ratingText}>{t('food.ratingText')}</Text>
            </View>

            <Text style={styles.priceLine}>
              {t('food.price', {
                price: prixNumber.toFixed(0),
                currency: t('food.currency'),
              })}
            </Text>
            <Text style={styles.priceSub}>
              {t('food.priceEquivalent', {
                value: priceNumber.toFixed(0),
                currency: t('food.currency'),
              })}
            </Text>

            {params.commentaire ? (
              <Text style={styles.description}>{params.commentaire}</Text>
            ) : null}

            <View style={styles.quantityCard}>
              <Text style={styles.quantityLabel}>
                {t('food.quantityLabel')}
              </Text>
              <View style={styles.quantityControls}>
                <Pressable
                  style={styles.qtyBtn}
                  onPress={() => setCount((p) => Math.max(1, p - 1))}
                  accessibilityLabel={t('food.decrease')}
                >
                  <Text style={styles.qtyBtnText}>-</Text>
                </Pressable>
                <Text style={styles.qtyValue}>{count}</Text>
                <Pressable
                  style={[styles.qtyBtn, styles.qtyBtnPrimary]}
                  onPress={() => setCount((p) => p + 1)}
                  accessibilityLabel={t('food.increase')}
                >
                  <Text style={[styles.qtyBtnText, styles.qtyBtnTextPrimary]}>
                    +
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.total}>
                {total.toFixed(0)}{' '}
                <Text style={styles.currency}>{t('food.currency')}</Text>
              </Text>
              <Pressable
                style={styles.primaryButton}
                onPress={() =>
                  router.push({
                    pathname: '/cart',
                    params: { ...params, count: String(count), m: String(total) },
                  })
                }
                accessibilityRole="button"
              >
                <Text style={styles.primaryButtonText}>
                  {t('food.addToCart')}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { flex: 1 },
  header: {
    width: '100%',
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    paddingHorizontal: 8,
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
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSpacer: { width: 44 },
  scrollContent: { paddingVertical: 16, paddingHorizontal: 16 },
  content: { width: '100%', maxWidth: 500, alignSelf: 'center' },
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
  },
  coverPlaceholder: { backgroundColor: '#E5E7EB' },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 6,
  },
  ratingText: { marginLeft: 8, color: '#6B7280', fontSize: 13 },
  priceLine: {
    fontSize: 18,
    fontWeight: '700',
    color: 'green',
    marginTop: 12,
  },
  priceSub: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginTop: 12,
  },
  quantityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  quantityLabel: { fontSize: 15, fontWeight: '700', color: '#111827' },
  quantityControls: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  qtyBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnPrimary: { backgroundColor: 'green', borderColor: 'green' },
  qtyBtnText: { fontSize: 20, fontWeight: '700', color: 'green' },
  qtyBtnTextPrimary: { color: '#FFFFFF' },
  qtyValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    minWidth: 24,
    textAlign: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  total: { fontSize: 20, fontWeight: '700', color: 'green' },
  currency: { fontSize: 13, fontWeight: '500' },
  primaryButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});