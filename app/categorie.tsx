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
import { Link, router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

type Menu = {
  id?: string;
  name: string;
  imageUrl?: string;
  cover?: string;
};

type Restaurant = {
  id: string;
  profile?: { name?: string; description?: string };
  images?: { cover?: string; logo?: string };
  address?: { street?: string; city?: string };
  ratings?: { averageRating?: number };
  menus?: Menu[];
};

function Category() {
  const params = useLocalSearchParams();
  const { t } = useTranslation();

  let item: Restaurant | null = null;
  try {
    item = params.item ? JSON.parse(params.item as string) : null;
  } catch {
    item = null;
  }

  if (!item) {
    return (
      <SafeAreaView style={styles.area}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>{t('category.invalidData')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const name = item.profile?.name ?? '';
  const description = item.profile?.description ?? '';
  const cover = item.images?.cover;
  const street = item.address?.street ?? '';
  const city = item.address?.city ?? '';
  const averageRating = item.ratings?.averageRating;
  const menus = item.menus ?? [];
  const locationText = [city, street].filter(Boolean).join(', ');

  const goToMenu = (menu: Menu) => {
    router.push({
      pathname: '/fd',
      params: {
        item: JSON.stringify({ ...menu, restaurantId: item!.id, cov: cover }),
      },
    });
  };

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="#10B981" style="light" />

      <View style={styles.header}>
        <Link href="/(tabs)" style={styles.iconButton}>
          <AntDesign name="left" size={24} color="#111827" />
        </Link>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {name}
        </Text>
        <Link href="/fd" style={styles.iconButton}>
          <AntDesign name="ellipsis1" size={24} color="#111827" />
        </Link>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {cover ? (
            <Image
              source={{ uri: cover }}
              style={styles.cover}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.cover, styles.coverPlaceholder]} />
          )}

          <Text style={styles.title} numberOfLines={2}>
            {name}
          </Text>
          {description ? (
            <Text style={styles.description}>{description}</Text>
          ) : null}

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <AntDesign name="staro" size={16} color="#10B981" />
              <Text style={styles.metaText}>
                {averageRating != null
                  ? String(averageRating)
                  : t('category.newRestaurant')}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={16}
                color="#10B981"
              />
              <Text style={styles.metaText}>
                {t('category.freeDelivery')}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Feather name="clock" size={16} color="#10B981" />
              <Text style={styles.metaText}>{t('category.deliveryTime')}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>{t('category.menusTitle')}</Text>

          {menus.length === 0 ? (
            <Text style={styles.emptySection}>{t('category.noMenus')}</Text>
          ) : (
            menus.map((menu, index) => {
              const menuImage = menu.imageUrl ?? menu.cover ?? cover;
              return (
                <View key={menu.id ?? String(index)} style={styles.menuCard}>
                  <View style={styles.menuImageWrapper}>
                    {menuImage ? (
                      <Image
                        source={{ uri: menuImage }}
                        style={styles.menuImage}
                        resizeMode="cover"
                      />
                    ) : null}
                  </View>

                  <View style={styles.menuInfo}>
                    <Text style={styles.menuName} numberOfLines={1}>
                      {menu.name}
                    </Text>
                    {locationText ? (
                      <View style={styles.menuMetaRow}>
                        <FontAwesome5
                          name="map-marker-alt"
                          size={12}
                          color="#10B981"
                        />
                        <Text style={styles.menuMetaText} numberOfLines={1}>
                          {locationText}
                        </Text>
                      </View>
                    ) : null}
                    {averageRating != null ? (
                      <View style={styles.menuMetaRow}>
                        <FontAwesome name="star" size={12} color="#F59E0B" />
                        <Text style={styles.menuMetaText}>
                          {averageRating}
                        </Text>
                      </View>
                    ) : null}
                  </View>

                  <Pressable
                    onPress={() => goToMenu(menu)}
                    style={({ pressed }) => [
                      styles.bookButton,
                      pressed && styles.bookButtonPressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={t('category.book', {
                      name: menu.name,
                    })}
                  >
                    <Text style={styles.bookButtonText}>
                      {t('category.book')}
                    </Text>
                  </Pressable>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Category;

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    width: '100%',
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginHorizontal: 8,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  content: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  cover: {
    width: '100%',
    height: 170,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },
  coverPlaceholder: {
    backgroundColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 12,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 6,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 14,
    rowGap: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: '#6B7280',
    fontSize: 13,
    marginLeft: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#111827',
    textAlign: 'center',
    marginVertical: 12,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 6,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  menuImageWrapper: {
    width: 56,
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  menuImage: {
    width: '100%',
    height: '100%',
  },
  menuInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  menuName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  menuMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  menuMetaText: {
    color: '#6B7280',
    fontSize: 12,
    flexShrink: 1,
  },
  bookButton: {
    minHeight: 44,
    minWidth: 88,
    borderRadius: 10,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  bookButtonPressed: {
    opacity: 0.85,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  emptySection: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingVertical: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
});