import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

type OrderItem = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  nbre: number;
  montant: number;
};

type Order = {
  id: string;
  items: OrderItem[];
  pricing?: { net?: number };
};

type Props = { a: Order[] };

export default function Comming({ a }: Props) {
  const { t } = useTranslation();

  const goToOrderDetails = (order: Order) => {
    router.push(`/orders/${order.id}`);
  };

  const renderOrder = ({ item: order }: { item: Order }) => (
    <View style={styles.orderContainer}>
      {order.items.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <View style={styles.imageWrapper}>
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
            {item.description ? (
              <Text style={styles.itemDescription} numberOfLines={2}>
                {item.description}
              </Text>
            ) : null}
          </View>

          <View style={styles.itemPricing}>
            <Text style={styles.itemQuantity}>
              {t('coming.quantity', { count: item.nbre })}
            </Text>
            <Text style={styles.itemPrice}>
              {Number(item.montant ?? 0).toFixed(0)}{' '}
              <Text style={styles.currency}>{t('coming.currency')}</Text>
            </Text>
          </View>
        </View>
      ))}

      <View style={styles.orderFooter}>
        <View style={styles.totalPrice}>
          <Text style={styles.totalPriceText}>
            {Number(order.pricing?.net ?? 0).toFixed(0)}{' '}
            <Text style={styles.currency}>{t('coming.currency')}</Text>
          </Text>
        </View>
        <Pressable
          onPress={() => goToOrderDetails(order)}
          style={({ pressed }) => [
            styles.checkButton,
            pressed && styles.checkButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={t('coming.viewOrder', { id: order.id })}
        >
          <Text style={styles.checkButtonText}>{t('coming.view')}</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
      <FlatList
        data={a}
        keyExtractor={(order) => String(order.id)}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>{t('coming.empty')}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  listContent: {
    padding: 12,
    paddingBottom: 24,
    gap: 16,
    flexGrow: 1,
  },
  orderContainer: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    backgroundColor: '#E5E7EB',
    padding: 10,
    borderRadius: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    gap: 10,
  },
  imageWrapper: {
    width: 48,
    height: 48,
    borderRadius: 8,
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
  itemDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6B7280',
    marginTop: 2,
  },
  itemPricing: {
    alignItems: 'flex-end',
    minWidth: 64,
  },
  itemQuantity: {
    fontWeight: '700',
    fontSize: 13,
    color: 'green',
  },
  itemPrice: {
    fontWeight: '700',
    fontSize: 14,
    color: '#111827',
    marginTop: 2,
  },
  currency: {
    fontSize: 12,
    fontWeight: '500',
  },
  orderFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  totalPrice: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
  },
  totalPriceText: {
    fontWeight: '700',
    fontSize: 15,
    color: '#111827',
  },
  checkButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    borderRadius: 8,
    minHeight: 44,
    minWidth: 88,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkButtonPressed: {
    opacity: 0.85,
  },
  checkButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
});