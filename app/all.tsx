import { useMemo } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useRestaurants } from '@/contexts/RestaurantContext';

type Menu = { menuCategoryId: string };

type Restaurant = {
  id?: string;
  profile: { name: string };
  images: { cover: string };
  address?: { street?: string; city?: string };
  ratings?: { averageRating?: number };
  menus: Menu[];
};

type Category = string | { id: string } | null | undefined;

type Props = { category: Category };

export default function All({ category }: Props) {
  const { t } = useTranslation();
  const { restaurants } = useRestaurants();

  const categoryId =
    typeof category === 'string' ? null : category?.id ?? null;

  const filteredRestaurants = useMemo<Restaurant[]>(() => {
    const list = (restaurants ?? []) as Restaurant[];
    if (!categoryId) return list;
    return list.filter((r) =>
      r.menus?.some((m) => m.menuCategoryId === categoryId)
    );
  }, [categoryId, restaurants]);

  const goToRestaurant = (restaurant: Restaurant) => {
    router.push({
      pathname: '/restaurant',
      params: { item: JSON.stringify(restaurant) },
    });
  };

  const renderItem = ({ item }: { item: Restaurant }) => {
    const location = [item.address?.street, item.address?.city]
      .filter(Boolean)
      .join(', ');

    return (
      <Pressable
        onPress={() => goToRestaurant(item)}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        accessibilityRole="button"
        accessibilityLabel={item.profile?.name}
      >
        <Image
          source={{ uri: item.images?.cover }}
          style={styles.cover}
          resizeMode="cover"
        />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {item.profile?.name}
          </Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <FontAwesome5 name="map-marker-alt" size={14} color="#10B981" />
              <Text style={styles.metaText} numberOfLines={1}>
                {location || t('all.unknownAddress')}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <FontAwesome name="star" size={14} color="#F59E0B" />
              <Text style={styles.metaText}>
                {item.ratings?.averageRating ?? t('all.newRestaurant')}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons
                name="delivery-dining"
                size={20}
                color="#10B981"
              />
              <Text style={styles.metaText}>{t('all.freeDelivery')}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={filteredRestaurants}
      keyExtractor={(item, index) => item.id ?? String(index)}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>{t('all.empty')}</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  card: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.92,
  },
  cover: {
    width: '100%',
    height: 160,
    backgroundColor: '#E5E7EB',
  },
  info: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    flexShrink: 1,
  },
  metaText: {
    color: '#6B7280',
    fontSize: 13,
    marginLeft: 4,
  },
  empty: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
  },
});