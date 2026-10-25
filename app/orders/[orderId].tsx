import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import MapView, { Marker } from 'react-native-maps';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

import { firestore } from '@/firebase';
import { useTracking } from '@/contexts/TrackingContext';

type Coordinates = { latitude: number; longitude: number };

type OrderItem = {
  id?: string;
  name: string;
  description?: string;
  price: number;
  nbre: number;
  imageUrl?: string;
};

type Order = {
  id: string;
  delivery: { address: { coordinates: Coordinates } };
  restaurantId: string;
  status: { current: string };
  items: OrderItem[];
  pricing: {
    subtotal: number;
    deliveryFree?: number;
    deliveryFee?: number;
    net: number;
  };
};

const AVG_SPEED_KMH = 30;

const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const toRad = (angle: number) => (angle * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

const STATUS_CONFIG: Record<
  string,
  { bg: string; color: string; labelKey: string }
> = {
  PENDING: {
    bg: '#FEF3C7',
    color: '#D97706',
    labelKey: 'orderDetail.statusPending',
  },
  ASSIGNED: {
    bg: '#DBEAFE',
    color: '#1D4ED8',
    labelKey: 'orderDetail.statusAssigned',
  },
  PICKEDUP: {
    bg: '#E0E7FF',
    color: '#4F46E5',
    labelKey: 'orderDetail.statusPickedUp',
  },
  PICKED_UP: {
    bg: '#E0E7FF',
    color: '#4F46E5',
    labelKey: 'orderDetail.statusPickedUp',
  },
  DELIVERED: {
    bg: '#DCFCE7',
    color: '#16A34A',
    labelKey: 'orderDetail.statusDelivered',
  },
  CANCELLED: {
    bg: '#FEE2E2',
    color: '#DC2626',
    labelKey: 'orderDetail.statusCancelled',
  },
};

function getStatusConfig(status: string | undefined) {
  const key = (status ?? '').toUpperCase();
  return (
    STATUS_CONFIG[key] ?? {
      bg: '#F3F4F6',
      color: '#6B7280',
      labelKey: 'orderDetail.statusUnknown',
    }
  );
}

export default function OrderDetailScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const orderId = params.orderId as string;
  const { socket, isConnected } = useTracking();

  const [order, setOrder] = useState<Order | null>(null);
  const [restaurantCoords, setRestaurantCoords] =
    useState<Coordinates | null>(null);
  const [partnerLocation, setPartnerLocation] = useState<Coordinates | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // ─── Firestore : subscription commande ───
  useEffect(() => {
    if (!orderId) return;
    const orderRef = doc(firestore, 'orders', orderId);
    const unsubscribe = onSnapshot(
      orderRef,
      (snap) => {
        if (snap.exists()) {
          setOrder({ ...snap.data(), id: snap.id } as Order);
        } else {
          setError(t('orderDetail.errorNotFound'));
        }
        setLoading(false);
      },
      (err) => {
        console.error('Firestore error:', err);
        setError(t('orderDetail.errorFetchOrder'));
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [orderId, t]);

  // ─── Firestore : restaurant ───
  useEffect(() => {
    if (!order?.restaurantId) return;
    const fetchRestaurantCoords = async () => {
      try {
        const ref = doc(firestore, 'restaurants', order.restaurantId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setRestaurantCoords(snap.data().address.coordinates);
        } else {
          setError(t('orderDetail.errorRestaurantNotFound'));
        }
      } catch (err) {
        console.error('Error fetching restaurant:', err);
        setError(t('orderDetail.errorFetchRestaurant'));
      }
    };
    fetchRestaurantCoords();
  }, [order?.restaurantId, t]);

  // ─── Socket temps réel ───
  useEffect(() => {
    if (!socket || !isConnected || !order) return;
    socket.emit('join_order', order.id);
    const handleLocationUpdate = (data: {
      orderId: string;
      location: Coordinates;
    }) => {
      if (data?.orderId === order.id) setPartnerLocation(data.location);
    };
    const handleError = (err: unknown) => {
      console.error('Socket error:', err);
    };
    socket.on('location_updated', handleLocationUpdate);
    socket.on('error', handleError);
    return () => {
      socket.off('location_updated', handleLocationUpdate);
      socket.off('error', handleError);
    };
  }, [socket, isConnected, order]);

  // ─── Calcul ETA ───
  const estimatedTime = useMemo<number | null>(() => {
    if (!order?.delivery?.address?.coordinates) return null;
    const delivery = order.delivery.address.coordinates;
    const origin = partnerLocation ?? restaurantCoords;
    if (!origin) return null;
    const distance = haversineDistance(
      origin.latitude,
      origin.longitude,
      delivery.latitude,
      delivery.longitude
    );
    const minutes = Math.round((distance / AVG_SPEED_KMH) * 60);
    return Math.max(1, minutes);
  }, [order, restaurantCoords, partnerLocation]);

  // ─── Header (réutilisé partout) ───
  const renderHeader = (
    title: string,
    subtitle?: string,
    onBack?: () => void
  ) => (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.headerContent}>
        <Pressable
          style={styles.backButton}
          onPress={onBack ?? (() => router.back())}
          accessibilityRole="button"
          accessibilityLabel={t('orderDetail.back')}
        >
          <AntDesign name="left" size={22} color="#FFFFFF" />
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        <View style={styles.headerSpacer} />
      </View>
    </View>
  );

  // ─── Loading ───
  if (loading) {
    return (
      <View style={styles.area}>
        <StatusBar style="light" />
        {renderHeader(t('orderDetail.headerTitle'))}
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="green" />
        </View>
      </View>
    );
  }

  // ─── Erreur ou données absentes ───
  if (error || !order) {
    return (
      <View style={styles.area}>
        <StatusBar style="light" />
        {renderHeader(t('orderDetail.headerTitle'))}
        <View style={styles.centerContainer}>
          <Feather name="alert-circle" size={48} color="#9CA3AF" />
          <Text style={styles.errorText}>
            {error || t('orderDetail.errorNoData')}
          </Text>
        </View>
      </View>
    );
  }

  const status = getStatusConfig(order.status.current);
  const deliveryFee =
    order.pricing.deliveryFree ?? order.pricing.deliveryFee ?? 0;

  return (
    <View style={styles.area}>
      <StatusBar style="light" />

      {/* ─── Header avec couverture de la status bar ─── */}
      {renderHeader(
        t('orderDetail.headerTitle'),
        estimatedTime
          ? t('orderDetail.deliveryIn', { count: estimatedTime })
          : t('orderDetail.deliveryCalculating')
      )}

      {/* ─── Contenu sous le header ─── */}
      <View style={styles.container}>
        {/* Carte */}
        {order.delivery?.address?.coordinates && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: order.delivery.address.coordinates.latitude,
              longitude: order.delivery.address.coordinates.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            showsUserLocation
            showsCompass
            showsPointsOfInterest={false}
          >
            {restaurantCoords && (
              <Marker
                coordinate={restaurantCoords}
                title={t('orderDetail.markerRestaurant')}
                pinColor="green"
              />
            )}
            {partnerLocation && (
              <Marker
                coordinate={partnerLocation}
                title={t('orderDetail.markerDriver')}
                pinColor="purple"
              />
            )}
            <Marker
              coordinate={order.delivery.address.coordinates}
              title={t('orderDetail.markerAddress')}
              pinColor="red"
            />
          </MapView>
        )}

        {/* Contenu scrollable */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 24 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Statut */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>
              {t('orderDetail.currentStatus')}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
              <Text style={[styles.statusText, { color: status.color }]}>
                {t(status.labelKey)}
              </Text>
            </View>
          </View>
        

          {/* Articles */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="shopping-bag" size={16} color="green" />
              <Text style={styles.sectionTitle}>
                {t('orderDetail.itemsSectionTitle')}
              </Text>
            </View>

            {order.items.map((item, index) => (
              <View
                key={item.id ?? `${item.name}-${index}`}
                style={styles.itemCard}
              >
                <View style={styles.itemImageWrapper}>
                  {item.imageUrl ? (
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.itemImage}
                      resizeMode="cover"
                    />
                  ) : null}
                </View>

                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  {item.description ? (
                    <Text style={styles.itemDescription} numberOfLines={2}>
                      {item.description}
                    </Text>
                  ) : null}
                </View>

                <View style={styles.itemPricing}>
                  <Text style={styles.itemPrice}>
                    {Number(item.price ?? 0).toFixed(0)}{' '}
                    <Text style={styles.currency}>
                      {t('orderDetail.currency')}
                    </Text>
                  </Text>
                  <Text style={styles.itemQty}>
                    {t('orderDetail.quantity', { count: item.nbre })}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Facture */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="receipt" size={16} color="green" />
              <Text style={styles.sectionTitle}>
                {t('orderDetail.billTitle')}
              </Text>
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryKey}>
                  {t('orderDetail.subtotal')}
                </Text>
                <Text style={styles.summaryValue}>
                  {Number(order.pricing.subtotal ?? 0).toFixed(0)}{' '}
                  <Text style={styles.currency}>
                    {t('orderDetail.currency')}
                  </Text>
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryKey}>
                  {t('orderDetail.deliveryFee')}
                </Text>
                <Text style={styles.summaryValue}>
                  {Number(deliveryFee).toFixed(0)}{' '}
                  <Text style={styles.currency}>
                    {t('orderDetail.currency')}
                  </Text>
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryKeyBold}>
                  {t('orderDetail.total')}
                </Text>
                <Text style={styles.summaryValueBold}>
                  {Number(order.pricing.net ?? 0).toFixed(0)}{' '}
                  <Text style={styles.currencyBold}>
                    {t('orderDetail.currency')}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: 'green',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
    backgroundColor: '#F9FAFB',
  },
  errorText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },

  /* ─── Header ─── */
  header: {
    width: '100%',
    backgroundColor: 'green',
  },
  headerContent: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
    textAlign: 'center',
  },
  headerSpacer: { width: 44 },

  /* ─── Carte ─── */
  map: {
    width: '100%',
    height: 240,
    backgroundColor: '#E5E7EB',
  },

  /* ─── Contenu ─── */
  scroll: { flex: 1, backgroundColor: '#F9FAFB' },
  scrollContent: { padding: 12, gap: 16 },

  /* ─── Statut ─── */
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flexShrink: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  /* ─── Sections ─── */
  section: { gap: 8 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 4,
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
    gap: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  itemImageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  itemImage: { width: '100%', height: '100%' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '700', color: '#111827' },
  itemDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  itemPricing: { alignItems: 'flex-end', minWidth: 80 },
  itemPrice: { fontSize: 14, fontWeight: '700', color: 'green' },
  itemQty: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  currency: { fontSize: 11, fontWeight: '600', color: '#6B7280' },

  /* ─── Facture ─── */
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryKey: { fontSize: 14, color: '#6B7280' },
  summaryValue: { fontSize: 14, fontWeight: '600', color: '#111827' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 4 },
  summaryKeyBold: { fontSize: 16, fontWeight: '700', color: '#111827' },
  summaryValueBold: { fontSize: 18, fontWeight: '700', color: 'green' },
  currencyBold: { fontSize: 12, fontWeight: '600', color: 'green' },
});