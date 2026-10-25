import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import Foundation from '@expo/vector-icons/Foundation';

import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';
import MyMapComponent from './map';

type DeliveryAddress = string | { street?: string; city?: string };

type OrderItem = {
  id?: string;
  itemId?: string;
  name?: string;
  price?: number;
  unitPrice?: number;
  montant?: number;
  quantity?: number;
  nbre?: number;
};

type ParsedOrder = {
  id: string;
  items: OrderItem[] | OrderItem;
  pricing?: {
    subtotal?: number;
    deliveryFree?: number;
    tax?: number;
    net?: number;
  };
  status?: string;
  phone?: string;
  delivery?: { address?: DeliveryAddress };
};

type InfoRowProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
};

function InfoRow({ icon, title, subtitle }: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>{icon}</View>
      <View style={styles.infoTextWrapper}>
        <Text style={styles.infoTitle} numberOfLines={2}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.infoSubtitle} numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

type BillRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function BillRow({ icon, label, value }: BillRowProps) {
  return (
    <View style={styles.billRow}>
      <View style={styles.billLabelWrapper}>
        {icon}
        <Text style={styles.billLabel}>{label}</Text>
      </View>
      <Text style={styles.billValue}>{value}</Text>
    </View>
  );
}

function formatAddress(address: DeliveryAddress | undefined): string | null {
  if (!address) return null;
  if (typeof address === 'string') return address;
  return (
    [address.street, address.city].filter(Boolean).join(', ') || null
  );
}

export default function DetailDelivery() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  const { assignDeliveryPartner } = useOrders();
  const params = useLocalSearchParams();
  const [accepting, setAccepting] = useState(false);

  let order: ParsedOrder | null = null;
  try {
    order = params.item ? (JSON.parse(params.item as string) as ParsedOrder) : null;
  } catch {
    order = null;
  }

  if (!order || !order.id) {
    return (
      <SafeAreaView style={styles.area}>
        <View style={styles.invalidState}>
          <Text style={styles.invalidText}>{t('deliveryDetail.invalidData')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const itemsList: OrderItem[] = Array.isArray(order.items)
    ? order.items
    : order.items
      ? [order.items]
      : [];

  const subtotal = Number(order.pricing?.subtotal ?? 0);
  const deliveryFee = Number(order.pricing?.deliveryFree ?? 0);
  const tax = Number(order.pricing?.tax ?? 0);
  const net = Number(order.pricing?.net ?? 0);
  const address = formatAddress(order.delivery?.address);
  const currency = t('deliveryDetail.currency');

  const handleAccept = async () => {
    if (accepting) return;
    setAccepting(true);
    try {
      await assignDeliveryPartner(order!.id, user?.uid);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Failed to accept order:', error);
      Alert.alert(t('deliveryDetail.acceptErrorTitle'), t('deliveryDetail.acceptError'));
    } finally {
      setAccepting(false);
    }
  };

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Link href="/(tabs)" style={styles.backButton}>
            <AntDesign name="left" size={22} color="#FFFFFF" />
          </Link>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {t('deliveryDetail.startOrder')}
            </Text>
            <Text style={styles.headerSubtitle} numberOfLines={1}>
              {t('deliveryDetail.deliveryIn', { minutes: 10 })}
            </Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.mapCard}>
              <MyMapComponent />
            </View>

            <View style={styles.card}>
              <InfoRow
                icon={
                  <MaterialIcons name="delivery-dining" size={24} color="#10B981" />
                }
                title={t('deliveryDetail.yourDeliveryDetails')}
                subtitle={t('deliveryDetail.detailsCurrentOrder')}
              />
            </View>

            <View style={styles.card}>
              <InfoRow
                icon={<Feather name="map-pin" size={22} color="#10B981" />}
                title={t('deliveryDetail.deliveryAtHome')}
                subtitle={address ?? t('deliveryDetail.unknownAddress')}
              />
              <View style={styles.divider} />
              <InfoRow
                icon={<Foundation name="telephone" size={22} color="#10B981" />}
                title={order.phone ?? t('deliveryDetail.noPhone')}
                subtitle={t('deliveryDetail.receiverContact')}
              />
            </View>

            <View style={styles.card}>
              <InfoRow
                icon={
                  <Ionicons name="bag-handle-outline" size={22} color="#10B981" />
                }
                title={t('deliveryDetail.orderSummary')}
                subtitle={t('deliveryDetail.orderId', { id: order.id })}
              />
            </View>

            <View style={styles.card}>
              {itemsList.map((line, index) => {
                const unitPrice = Number(
                  line.unitPrice ?? line.price ?? line.montant ?? 0
                );
                const quantity = Number(line.nbre ?? line.quantity ?? 1);
                return (
                  <View key={line.id ?? line.itemId ?? String(index)} style={styles.lineItem}>
                    <View style={styles.lineItemDetails}>
                      <Text style={styles.lineItemName} numberOfLines={1}>
                        {line.name ?? t('deliveryDetail.unnamedItem')}
                      </Text>
                      {order?.status ? (
                        <Text style={styles.lineItemStatus} numberOfLines={1}>
                          {order.status}
                        </Text>
                      ) : null}
                    </View>
                    <View style={styles.lineItemPricing}>
                      <Text style={styles.lineItemPrice}>
                        {t('deliveryDetail.unitPrice', {
                          price: unitPrice.toFixed(0),
                          currency,
                        })}
                      </Text>
                      <Text style={styles.lineItemQuantity}>
                        {t('deliveryDetail.quantityLabel', { quantity })}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <View style={styles.card}>
              <Text style={styles.billTitle}>{t('deliveryDetail.billDetails')}</Text>
              <BillRow
                icon={<FontAwesome name="list-alt" size={18} color="#6B7280" />}
                label={t('deliveryDetail.itemsTotal')}
                value={`${subtotal.toFixed(0)} ${currency}`}
              />
              <BillRow
                icon={
                  <MaterialIcons name="delivery-dining" size={18} color="#6B7280" />
                }
                label={t('deliveryDetail.deliveryCharge')}
                value={`${deliveryFee.toFixed(0)} ${currency}`}
              />
              <BillRow
                icon={<FontAwesome name="list-alt" size={18} color="#6B7280" />}
                label={t('deliveryDetail.handlingCharge')}
                value={`${tax.toFixed(0)} ${currency}`}
              />
              <BillRow
                icon={<Ionicons name="rainy-sharp" size={18} color="#6B7280" />}
                label={t('deliveryDetail.surgeCharge')}
                value={`${tax.toFixed(0)} ${currency}`}
              />
              <View style={styles.divider} />
              <View style={styles.grandTotalRow}>
                <Text style={styles.grandTotalLabel}>
                  {t('deliveryDetail.grandTotal')}
                </Text>
                <Text style={styles.grandTotalValue}>
                  {net.toFixed(0)} {currency}
                </Text>
              </View>
            </View>

            <Pressable
              onPress={handleAccept}
              disabled={accepting}
              style={({ pressed }) => [
                styles.acceptButton,
                pressed && styles.acceptButtonPressed,
                accepting && styles.acceptButtonDisabled,
              ]}
              accessibilityRole="button"
              accessibilityLabel={t('deliveryDetail.acceptOrder')}
            >
              {accepting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Feather name="check-circle" size={20} color="#FFFFFF" />
              )}
              <Text style={styles.acceptButtonText}>
                {accepting
                  ? t('deliveryDetail.acceptingOrder')
                  : t('deliveryDetail.acceptOrder')}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.95,
  },
  headerSpacer: {
    width: 44,
  },
  scrollContent: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    paddingBottom: 32,
  },
  content: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    gap: 10,
  },
  mapCard: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  infoIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoTextWrapper: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  infoSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  lineItemDetails: {
    flex: 1,
  },
  lineItemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  lineItemStatus: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
    marginTop: 2,
  },
  lineItemPricing: {
    alignItems: 'flex-end',
    minWidth: 96,
  },
  lineItemPrice: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '600',
  },
  lineItemQuantity: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  billTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  billLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  billLabel: {
    fontSize: 13,
    color: '#6B7280',
    flexShrink: 1,
  },
  billValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'right',
    minWidth: 80,
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  grandTotalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  grandTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
  },
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 50,
    borderRadius: 12,
    backgroundColor: '#10B981',
    marginTop: 6,
  },
  acceptButtonPressed: {
    opacity: 0.85,
  },
  acceptButtonDisabled: {
    opacity: 0.6,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  invalidState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  invalidText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
});