import { useEffect, useMemo, useState } from 'react';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { doc, onSnapshot } from 'firebase/firestore';
import MapView, { Marker } from 'react-native-maps';
import { io, Socket } from 'socket.io-client';
import * as Location from 'expo-location';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

import { firestore } from '@/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';

type Coordinates = { latitude: number; longitude: number };

type OrderItem = {
  id?: string;
  name: string;
  price?: number;
  montant?: number;
  unitPrice?: number;
  nbre: number;
  imageUrl?: string;
};

type Order = {
  id: string;
  deliveryPartnerId?: string;
  phone?: string;
  status: { current: string; timeline?: unknown[] };
  items: OrderItem[];
  delivery: {
    address: {
      coordinates: Coordinates;
      street?: string;
      city?: string;
      state?: string;
    };
  };
  pricing: {
    subtotal: number;
    deliveryFee?: number;
    deliveryFree?: number;
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
    labelKey: 'partnerOrder.statusPending',
  },
  ASSIGNED: {
    bg: '#DBEAFE',
    color: '#1D4ED8',
    labelKey: 'partnerOrder.statusAssigned',
  },
  PICKEDUP: {
    bg: '#E0E7FF',
    color: '#4F46E5',
    labelKey: 'partnerOrder.statusPickedUp',
  },
  PICKED_UP: {
    bg: '#E0E7FF',
    color: '#4F46E5',
    labelKey: 'partnerOrder.statusPickedUp',
  },
  DELIVERED: {
    bg: '#DCFCE7',
    color: '#16A34A',
    labelKey: 'partnerOrder.statusDelivered',
  },
  CANCELLED: {
    bg: '#FEE2E2',
    color: '#DC2626',
    labelKey: 'partnerOrder.statusCancelled',
  },
};

function getStatusConfig(status: string | undefined) {
  const key = (status ?? '').toUpperCase();
  return (
    STATUS_CONFIG[key] ?? {
      bg: '#F3F4F6',
      color: '#6B7280',
      labelKey: 'partnerOrder.statusUnknown',
    }
  );
}

export default function PartnerOrderScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const { updateOrder, fetchOrdersDelivery, orders } = useOrders();
  const { user } = useAuth();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [partnerLocation, setPartnerLocation] = useState<Coordinates | null>(
    null
  );
  const [updating, setUpdating] = useState(false);

  // ─── Permission localisation ───
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        t('partnerOrder.permissionTitle'),
        t('partnerOrder.permissionMessage')
      );
      return false;
    }
    return true;
  };

  // ─── Changement de statut avec confirmation ───
  const changeStatus = async (
    nextStatus: 'ASSIGNED' | 'PICKEDUP' | 'DELIVERED'
  ) => {
    setUpdating(true);
    try {
      const updates: Record<string, unknown> = {
        status: {
          current: nextStatus,
          timeline: [
            ...(order?.status?.timeline ?? []),
            {
              status: nextStatus,
              timestamp: new Date(),
              note: `Status changed to ${nextStatus}`,
            },
          ],
        },
      };
      if (nextStatus === 'ASSIGNED') {
        updates.deliveryPartnerId = user?.uid;
      }
      await updateOrder(orderId, updates);
    } catch (err) {
      console.error('[PartnerOrder] update failed', err);
      Alert.alert(t('partnerOrder.errorTitle'), t('partnerOrder.updateFailed'));
    } finally {
      setUpdating(false);
    }
  };

  const confirmStatusChange = (
    nextStatus: 'ASSIGNED' | 'PICKEDUP' | 'DELIVERED',
    titleKey: string
  ) => {
    Alert.alert(t(titleKey), t('partnerOrder.confirmStatusMessage'), [
      { text: t('partnerOrder.cancel'), style: 'cancel' },
      {
        text: t('partnerOrder.confirm'),
        onPress: () => changeStatus(nextStatus),
      },
    ]);
  };

  const handleAcceptOrder = async () => {
    if (!(await requestLocationPermission())) return;
    confirmStatusChange('ASSIGNED', 'partnerOrder.confirmAcceptTitle');
  };

  const handlePickUpOrder = () =>
    confirmStatusChange('PICKEDUP', 'partnerOrder.confirmPickUpTitle');

  const handleDeliverOrder = () =>
    confirmStatusChange('DELIVERED', 'partnerOrder.confirmDeliverTitle');

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
          setError(t('partnerOrder.errorNotFound'));
        }
        setLoading(false);
      },
      (err) => {
        console.error('[PartnerOrder] Firestore error', err);
        setError(t('partnerOrder.errorFetchOrder'));
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [orderId, t]);

  // ─── Socket temps réel ───
  useEffect(() => {
    if (!orderId || !user) return;

    let newSocket: Socket | null = null;
    try {
      newSocket = io(process.env.EXPO_PUBLIC_SOCKET_SERVER_URL as string, {
        auth: { token: user.accessToken, userId: user.uid },
      });

      newSocket.on('connect', () => {
        newSocket?.emit('join_order', orderId);
      });

      newSocket.on('location_update', (data: { coordinates: Coordinates }) => {
        setPartnerLocation(data.coordinates);
      });
    } catch (err) {
      console.error('[PartnerOrder] socket init failed', err);
    }

    return () => {
      newSocket?.disconnect();
    };
  }, [orderId, user]);

  // ─── ETA calcul propre ───
  const estimatedTime = useMemo<number | null>(() => {
    if (!order?.delivery?.address?.coordinates) return null;
    const delivery = order.delivery.address.coordinates;
    const origin = partnerLocation;
    if (!origin) return null;
    const distance = haversineDistance(
      origin.latitude,
      origin.longitude,
      delivery.latitude,
      delivery.longitude
    );
    const minutes = Math.round((distance / AVG_SPEED_KMH) * 60);
    return Math.max(1, minutes);
  }, [order, partnerLocation]);

  // ─── ✅ Agrège tous les buckets de commandes en un seul tableau ───
  // `orders` est un objet { Comming, Encours, Delivered, Cancelled },
  // pas un tableau. Ce helper renvoie un tableau plat.
  const getAllOrders = (): { status?: { current?: string }; deliveryPartnerId?: string }[] => {
    if (Array.isArray(orders)) return orders;
    const buckets = orders as
      | {
          Comming?: unknown[];
          Encours?: unknown[];
          Delivered?: unknown[];
          Cancelled?: unknown[];
        }
      | null
      | undefined;
    if (!buckets) return [];
    return [
      ...((buckets.Comming ?? []) as { status?: { current?: string }; deliveryPartnerId?: string }[]),
      ...((buckets.Encours ?? []) as { status?: { current?: string }; deliveryPartnerId?: string }[]),
      ...((buckets.Delivered ?? []) as { status?: { current?: string }; deliveryPartnerId?: string }[]),
      ...((buckets.Cancelled ?? []) as { status?: { current?: string }; deliveryPartnerId?: string }[]),
    ];
  };

  // ─── ✅ Limite : une seule commande PICKEDUP à la fois ───
  const limitOrders = async () => {
    if (!user) return;

    const active = getAllOrders().filter(
      (o) =>
        o.status?.current === 'PICKEDUP' &&
        o.deliveryPartnerId === user.uid
    );

    if (active.length > 0) {
      Alert.alert(
        t('partnerOrder.limitReachedTitle'),
        t('partnerOrder.limitReachedMessage'),
        [
          {
            text: t('partnerOrder.ok'),
            onPress: () => router.push('/livreuurProfil'),
          },
        ]
      );
      return;
    }

    await handleAcceptOrder();
  };

  // ─── ✅ Un seul fetchOrdersDelivery (avant il était appelé 2×) ───
  const goBack = () => {
    fetchOrdersDelivery();
    router.push('/livreuurProfil');
  };

  // ─── Actions disponibles selon le statut ───
  const isAssignedPartner = order?.deliveryPartnerId === user?.uid;
  const canAccept = !isAssignedPartner && order?.status?.current === 'PENDING';
  const canPickUp = isAssignedPartner && order?.status?.current === 'ASSIGNED';
  const canDeliver = isAssignedPartner && order?.status?.current === 'PICKEDUP';
  const hasAction = canAccept || canPickUp || canDeliver;

  // ─── Loading ───
  if (loading) {
    return (
      <View style={styles.area}>
        <StatusBar style="light" />
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <View style={styles.headerContent}>
            <Pressable
              style={styles.backButton}
              onPress={goBack}
              accessibilityRole="button"
              accessibilityLabel={t('partnerOrder.back')}
            >
              <AntDesign name="left" size={22} color="#FFFFFF" />
            </Pressable>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {t('partnerOrder.headerTitle')}
              </Text>
            </View>
            <View style={styles.headerSpacer} />
          </View>
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="green" />
        </View>
      </View>
    );
  }

  // ─── Erreur ───
  if (error || !order) {
    return (
      <View style={styles.area}>
        <StatusBar style="light" />
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <View style={styles.headerContent}>
            <Pressable
              style={styles.backButton}
              onPress={goBack}
              accessibilityRole="button"
              accessibilityLabel={t('partnerOrder.back')}
            >
              <AntDesign name="left" size={22} color="#FFFFFF" />
            </Pressable>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {t('partnerOrder.headerTitle')}
              </Text>
            </View>
            <View style={styles.headerSpacer} />
          </View>
        </View>
        <View style={styles.centerContainer}>
          <Feather name="alert-circle" size={48} color="#9CA3AF" />
          <Text style={styles.errorText}>
            {error || t('partnerOrder.errorNotFound')}
          </Text>
        </View>
      </View>
    );
  }

  const status = getStatusConfig(order.status.current);
  const deliveryFee =
    order.pricing.deliveryFee ?? order.pricing.deliveryFree ?? 0;
  const coords = order.delivery.address.coordinates;

  const actionButton = canAccept
    ? {
        label: t('partnerOrder.acceptOrder'),
        onPress: limitOrders,
        icon: 'check-circle' as const,
      }
    : canPickUp
    ? {
        label: t('partnerOrder.pickedUpOrder'),
        onPress: handlePickUpOrder,
        icon: 'package' as const,
      }
    : canDeliver
    ? {
        label: t('partnerOrder.deliveredOrder'),
        onPress: handleDeliverOrder,
        icon: 'map-pin' as const,
      }
    : null;

  return (
    <View style={styles.area}>
      <StatusBar style="light" />

      {/* ─── Header ─── */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <Pressable
            style={styles.backButton}
            onPress={goBack}
            accessibilityRole="button"
            accessibilityLabel={t('partnerOrder.back')}
          >
            <AntDesign name="left" size={22} color="#FFFFFF" />
          </Pressable>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {t('partnerOrder.headerTitle')}
            </Text>
            {estimatedTime ? (
              <Text style={styles.subtitle} numberOfLines={1}>
                {t('partnerOrder.deliveryIn', { count: estimatedTime })}
              </Text>
            ) : null}
          </View>
          <View style={styles.headerSpacer} />
        </View>
      </View>

      {/* ─── Contenu ─── */}
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: (hasAction ? 100 : 24) + insets.bottom },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Carte */}
          {coords ? (
            <View style={styles.mapWrapper}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
                showsUserLocation
                showsCompass
                showsPointsOfInterest={false}
              >
                <Marker
                  coordinate={coords}
                  title={t('partnerOrder.markerAddress')}
                  pinColor="red"
                />
                {partnerLocation ? (
                  <Marker
                    coordinate={partnerLocation}
                    title={t('partnerOrder.markerDriver')}
                    pinColor="purple"
                  />
                ) : null}
              </MapView>
            </View>
          ) : null}

          {/* Statut */}
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>
              {t('partnerOrder.currentStatus')}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
              <Text style={[styles.statusText, { color: status.color }]}>
                {t(status.labelKey)}
              </Text>
            </View>
          </View>

          {/* Adresse */}
          <View style={styles.infoCard}>
            <View style={styles.infoIconWrapper}>
              <Feather name="map-pin" size={18} color="green" />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>
                {t('partnerOrder.addressLabel')}
              </Text>
              <Text style={styles.infoValue} numberOfLines={2}>
                {[
                  order.delivery.address.street,
                  order.delivery.address.city,
                  order.delivery.address.state,
                ]
                  .filter(Boolean)
                  .join(', ') || t('partnerOrder.addressUnknown')}
              </Text>
            </View>
          </View>

          {/* Téléphone */}
          <View style={styles.infoCard}>
            <View style={styles.infoIconWrapper}>
              <Feather name="phone" size={18} color="green" />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>
                {t('partnerOrder.phoneLabel')}
              </Text>
              <Text style={styles.infoValue} numberOfLines={1}>
                {order.phone ?? t('partnerOrder.phoneUnknown')}
              </Text>
            </View>
          </View>

          {/* Articles */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="shopping-bag" size={16} color="green" />
              <Text style={styles.sectionTitle}>
                {t('partnerOrder.itemsSectionTitle')}
              </Text>
              <Text style={styles.sectionSubtitle} numberOfLines={1}>
                #{orderId}
              </Text>
            </View>

            {order.items.map((item, index) => {
              const unit = Number(
                item.unitPrice ?? item.price ?? item.montant ?? 0
              );
              const total = unit * item.nbre;
              return (
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
                    <Text style={styles.itemQty}>
                      {t('partnerOrder.quantity', { count: item.nbre })}
                    </Text>
                  </View>
                  <Text style={styles.itemPrice}>
                    {total.toFixed(0)}{' '}
                    <Text style={styles.currency}>
                      {t('partnerOrder.currency')}
                    </Text>
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Facture */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="receipt" size={16} color="green" />
              <Text style={styles.sectionTitle}>
                {t('partnerOrder.billTitle')}
              </Text>
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryKey}>
                  {t('partnerOrder.subtotal')}
                </Text>
                <Text style={styles.summaryValue}>
                  {Number(order.pricing.subtotal ?? 0).toFixed(0)}{' '}
                  <Text style={styles.currency}>
                    {t('partnerOrder.currency')}
                  </Text>
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryKey}>
                  {t('partnerOrder.deliveryFee')}
                </Text>
                <Text style={styles.summaryValue}>
                  {Number(deliveryFee).toFixed(0)}{' '}
                  <Text style={styles.currency}>
                    {t('partnerOrder.currency')}
                  </Text>
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryKeyBold}>
                  {t('partnerOrder.total')}
                </Text>
                <Text style={styles.summaryValueBold}>
                  {Number(order.pricing.net ?? 0).toFixed(0)}{' '}
                  <Text style={styles.currencyBold}>
                    {t('partnerOrder.currency')}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* ─── Footer action ─── */}
        {actionButton ? (
          <View
            style={[
              styles.footer,
              { paddingBottom: Math.max(insets.bottom, 12) },
            ]}
          >
            <Pressable
              onPress={actionButton.onPress}
              disabled={updating}
              style={({ pressed }) => [
                styles.actionButton,
                pressed && styles.actionButtonPressed,
                updating && styles.actionButtonDisabled,
              ]}
              accessibilityRole="button"
              accessibilityLabel={actionButton.label}
            >
              {updating ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Feather name={actionButton.icon} size={20} color="#FFFFFF" />
              )}
              <Text style={styles.actionButtonText}>
                {updating ? t('partnerOrder.updating') : actionButton.label}
              </Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* ─── Root ─── */
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
    fontSize: 15,
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

  /* ─── Contenu ─── */
  scrollContent: {
    padding: 12,
    gap: 10,
  },

  /* ─── Map ─── */
  mapWrapper: {
    width: '100%',
    height: 220,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },
  map: {
    width: '100%',
    height: '100%',
  },

  /* ─── Statut ─── */
  statusRow: {
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

  /* ─── Cartes info ─── */
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
    gap: 12,
  },
  infoIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: { flex: 1 },
  infoLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },

  /* ─── Sections ─── */
  section: { gap: 8, marginTop: 6 },
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
    flex: 1,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },

  /* ─── Item card ─── */
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 10,
    gap: 10,
  },
  itemImageWrapper: {
    width: 56,
    height: 56,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  itemImage: { width: '100%', height: '100%' },
  itemInfo: { flex: 1 },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  itemQty: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: 'green',
  },
  currency: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
  },

  /* ─── Facture ─── */
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 14,
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryKey: { fontSize: 14, color: '#6B7280' },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
  summaryKeyBold: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  summaryValueBold: {
    fontSize: 18,
    fontWeight: '700',
    color: 'green',
  },
  currencyBold: {
    fontSize: 12,
    fontWeight: '600',
    color: 'green',
  },

  /* ─── Footer action ─── */
  footer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'green',
    minHeight: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  actionButtonPressed: { opacity: 0.85 },
  actionButtonDisabled: { opacity: 0.6 },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});