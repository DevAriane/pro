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
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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

  const renderCard = ({ item }: { item: MenuItem }) => {
    const unavailable = item.isAvailable === false;

    return (
      <Pressable
        onPress={() => !unavailable && handleOrder(item)}
        disabled={unavailable}
        style={({ pressed }) => [
          styles.cardWrapper,
          pressed && !unavailable && styles.cardWrapperPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={t('menu.addItem', { name: item.name })}
        accessibilityState={{ disabled: unavailable }}
      >
        <View style={[styles.card, unavailable && styles.cardUnavailable]}>
          <View style={styles.imageWrapper}>
            {item.imageUrl ? (
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.image, styles.imagePlaceholder]} />
            )}
            {unavailable ? (
              <View style={styles.unavailableOverlay}>
                <Text style={styles.unavailableText}>
                  {t('menu.unavailable')}
                </Text>
              </View>
            ) : null}
          </View>

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
              <View style={styles.priceWrapper}>
                <Text style={styles.price}>
                  {Number(item.price ?? 0).toFixed(0)}
                </Text>
                <Text style={styles.currency}>{t('menu.currency')}</Text>
              </View>

              <View
                style={[
                  styles.button,
                  unavailable && styles.buttonDisabled,
                ]}
              >
                <AntDesign
                  name={unavailable ? 'close' : 'plus'}
                  size={18}
                  color="#FFFFFF"
                />
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

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
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialCommunityIcons
              name="silverware-fork-knife"
              size={48}
              color="#9CA3AF"
            />
            <Text style={styles.emptyTitle}>{t('menu.empty')}</Text>
            <Text style={styles.emptySubtitle}>{t('menu.emptySubtitle')}</Text>
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
    paddingBottom: 24,
    flexGrow: 1,
  },
  row: { gap: 12 },
  cardWrapper: { flex: 1, maxWidth: '50%', marginBottom: 12 },
  cardWrapperPressed: { opacity: 0.92, transform: [{ scale: 0.98 }] },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardUnavailable: { opacity: 0.65 },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 110,
    backgroundColor: '#E5E7EB',
  },
  image: { width: '100%', height: '100%' },
  imagePlaceholder: { backgroundColor: '#E5E7EB' },
  unavailableOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(17, 24, 39, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unavailableText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoContainer: { padding: 12, gap: 4 },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 18,
  },
  description: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
    minHeight: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 8,
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
    flexShrink: 1,
  },
  price: { fontSize: 16, fontWeight: '700', color: 'green' },
  currency: { fontSize: 11, fontWeight: '600', color: '#6B7280' },
  button: {
    backgroundColor: 'green',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: { backgroundColor: '#9CA3AF' },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginTop: 8,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
});