import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

type OrderItem = {
  id?: string;
  name: string;
  description?: string;
  imageUrl?: string;
  nbre: number;
  montant?: number;
};

type Order = {
  id: string | number;
  items: OrderItem[];
  status?: { current?: string };
  pricing?: { net?: number };
};

type Props = { b: Order[] };

const STATUS_KEY: Record<string, string> = {
  PENDING: 'history.statusPending',
  ASSIGNED: 'history.statusAssigned',
  PICKEDUP: 'history.statusPickedUp',
  DELIVERED: 'history.statusDelivered',
};

export default function History({ b }: Props) {
  const { t } = useTranslation();

  const getStatusLabel = (status?: string) => {
    const key = STATUS_KEY[String(status ?? '').toUpperCase()];
    return t(key ?? 'history.statusAccepted');
  };

  const renderOrder = ({ item: order }: { item: Order }) => {
    const total = Number(order.pricing?.net ?? 0);
    const statusLabel = getStatusLabel(order.status?.current);

    return (
      <View style={styles.card}>
        {order.items.map((item, index) => (
          <View key={item.id ?? String(index)} style={styles.item}>
            <View style={styles.thumb}>
              {item.imageUrl ? (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.thumbImage}
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
              <Text style={styles.itemQuantity}>
                {t('history.quantity', { count: item.nbre })}
              </Text>
              <Text style={styles.itemPrice}>
                {Number(item.montant ?? 0).toFixed(0)}{' '}
                <Text style={styles.currency}>{t('history.currency')}</Text>
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <View style={styles.totalBox}>
            <Text style={styles.totalText}>
              {total.toFixed(0)}{' '}
              <Text style={styles.currency}>{t('history.currency')}</Text>
            </Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{statusLabel}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
      <FlatList
        data={b}
        keyExtractor={(order, index) => String(order.id ?? index)}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>{t('history.empty')}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1, backgroundColor: '#F9FAFB' },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 16,
    flexGrow: 1,
  },
  card: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    padding: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
  },
  thumb: {
    width: 48,
    height: 48,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  thumbImage: { width: '100%', height: '100%' },
  itemInfo: { flex: 1, marginHorizontal: 10 },
  itemName: { fontSize: 14, fontWeight: '700', color: '#111827' },
  itemDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  itemPricing: { alignItems: 'flex-end', minWidth: 72 },
  itemQuantity: { fontSize: 13, fontWeight: '700', color: 'green' },
  itemPrice: { fontSize: 13, fontWeight: '700', color: '#111827', marginTop: 2 },
  currency: { fontSize: 11, fontWeight: '500' },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 8,
  },
  totalBox: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
  },
  totalText: { fontSize: 15, fontWeight: '700', color: '#111827' },
  statusBadge: {
    backgroundColor: 'green',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
  },
  statusText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  emptyText: { color: '#6B7280', fontSize: 15, textAlign: 'center' },
});