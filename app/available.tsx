import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

type OrderItem = {
  id?: string;
  name: string;
  description?: string;
  imageUrl?: string;
  nbre: number;
};

type Reservation = {
  id: string | number;
  items: OrderItem[];
};

type Props = {
  reservationVenant: Reservation[];
};

export default function Available({ reservationVenant }: Props) {
  const { t } = useTranslation();

  const goToDelivery = (id: string | number) => {
    router.push(`/delivery/${id}`);
  };

  const renderOrder = ({ item: reservation }: { item: Reservation }) => (
    <Pressable
      onPress={() => goToDelivery(reservation.id)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      accessibilityRole="button"
      accessibilityLabel={t('available.openOrderLabel')}
    >
      {reservation.items.map((item, index) => (
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
          <Text style={styles.quantity}>
            {t('available.quantity', { count: item.nbre })}
          </Text>
        </View>
      ))}
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.area}>
      <FlatList
        data={reservationVenant}
        keyExtractor={(item, index) => String(item.id ?? index)}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>{t('available.empty')}</Text>
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
    paddingHorizontal: 15,
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
  cardPressed: {
    opacity: 0.92,
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
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  itemInfo: {
    flex: 1,
    marginHorizontal: 10,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  itemDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6B7280',
    marginTop: 2,
  },
  quantity: {
    fontSize: 14,
    fontWeight: '700',
    color: 'green',
    minWidth: 32,
    textAlign: 'right',
  },
  empty: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
  },
});