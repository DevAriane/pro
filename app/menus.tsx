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
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isAvailable?: boolean;
  menuCategoryId?: string;
  restaurantCategoryId?: string;
  customizationOptions?: Record<string, unknown>[];
};

type Props = {
  menu: MenuItem[];
  cover?: string;
  restaurantName?: string;
  city?: string;
  street?: string;
  id?: number;
  active?: string;
};

export default function Menu({ menu, cover, restaurantName, id, active }: Props) {
  const { t } = useTranslation();

  const filtered = useMemo<MenuItem[]>(() => {
    if (!active) return menu ?? [];
    return (menu ?? []).filter((m) => m.restaurantCategoryId === active);
  }, [active, menu]);

  const handleOrder = (item: MenuItem) => {
    router.push({
      pathname: '/fd',
      params: {
        item: JSON.stringify({
          ...item,
          restaurantName,
          restaurantId: id,
          cov: cover,
        }),
      },
    });
  };

  const renderCard = ({ item }: { item: MenuItem }) => (
    <View style={styles.cardWrapper}>
      <View style={styles.card}>
        {item.imageUrl ? (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]} />
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>
          {item.description ? (
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
          ) : null}

          <View style={styles.bottomRow}>
            <Text style={styles.price}>
              {Number(item.price ?? 0).toFixed(0)}{' '}
              <Text style={styles.currency}>{t('menu.currency')}</Text>
            </Text>
            <Pressable
              onPress={() => handleOrder(item)}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={t('menu.addItem', { name: item.name })}
            >
              <AntDesign name="plus" size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="green" style="light" />
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={renderCard}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>{t('menu.empty')}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  listContent: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexGrow: 1,
  },
  row: { gap: 15 },
  cardWrapper: { flex: 1, maxWidth: '50%' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  image: {
    width: '100%',
    height: 100,
    backgroundColor: '#E5E7EB',
  },
  imagePlaceholder: { backgroundColor: '#E5E7EB' },
  infoContainer: {
    padding: 10,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  description: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  currency: { fontSize: 12, fontWeight: '500' },
  button: {
    backgroundColor: 'green',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: { opacity: 0.85 },
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