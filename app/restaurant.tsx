import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Menu, { type MenuItem } from './menus';
import { OpeningHours } from '@/components/OpeningHours';

type Category = { id: string; name: string; img?: string };

type Restaurant = {
  id?: number;
  profile?: { name?: string; description?: string; openingHours?: unknown };
  images?: { cover?: string; gallery?: unknown[] };
  address?: { street?: string; city?: string };
  ratings?: { averageRating?: number };
  menus?: MenuItem[];
  restaurantCategories?: Category[];
};

export default function Rest() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();

  let item: Restaurant | null = null;
  try {
    item = params.item ? (JSON.parse(params.item as string) as Restaurant) : null;
  } catch {
    item = null;
  }

  if (!item) {
    return (
      <SafeAreaView style={styles.area} edges={['top', 'bottom']}>
        <View style={styles.invalid}>
          <Text style={styles.invalidText}>{t('rest.invalidData')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const name = item.profile?.name ?? '';
  const description = item.profile?.description ?? '';
  const openingHours = item.profile?.openingHours;
  const cover = item.images?.cover;
  const street = item.address?.street ?? '';
  const city = item.address?.city ?? '';
  const locationText = [street, city].filter(Boolean).join(', ');
  const averageRating = item.ratings?.averageRating;
  const menus = item.menus ?? [];
  const categories = item.restaurantCategories ?? [];

  const [activeTab, setActiveTab] = useState<string>(categories[0]?.id ?? '');

  const ratingText = useMemo(
    () =>
      averageRating != null
        ? averageRating.toFixed(1)
        : t('rest.newRestaurant'),
    [averageRating, t]
  );

  const onMorePress = () => {
    Alert.alert(t('rest.moreTitle'), t('rest.moreMessage'));
  };

  return (
    <SafeAreaView style={styles.area} edges={['top']}>
      <StatusBar backgroundColor="green" style="light" />

      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel={t('rest.back')}
        >
          <AntDesign name="left" size={22} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {name}
        </Text>
      
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 24 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          {cover ? (
            <Image
              source={{ uri: cover }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.heroImage} />
          )}
        </View>

        <View style={styles.container}>
          <View style={styles.titleCard}>
            <Text style={styles.restaurantName} numberOfLines={2}>
              {name}
            </Text>
            {locationText ? (
              <View style={styles.locationRow}>
                <FontAwesome5 name="map-marker-alt" size={12} color="green" />
                <Text style={styles.locationText} numberOfLines={1}>
                  {locationText}
                </Text>
              </View>
            ) : null}
          </View>

          <View style={styles.metaGrid}>
            <View style={styles.metaCard}>
              <AntDesign name="star" size={18} color="#F59E0B" />
              <Text style={styles.metaValue}>{ratingText}</Text>
              <Text style={styles.metaLabel}>{t('rest.ratingLabel')}</Text>
            </View>
            <View style={styles.metaCard}>
              <Feather name="clock" size={18} color="green" />
              <Text style={styles.metaValue}>{t('rest.deliveryTime')}</Text>
              <Text style={styles.metaLabel}>
                {t('rest.deliveryTimeLabel')}
              </Text>
            </View>
            <View style={styles.metaCard}>
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={18}
                color="green"
              />
              <Text style={styles.metaValue}>{t('rest.free')}</Text>
              <Text style={styles.metaLabel}>{t('rest.deliveryLabel')}</Text>
            </View>
          </View>

          {description ? (
            <View style={styles.descriptionCard}>
              <Text style={styles.description}>{description}</Text>
            </View>
          ) : null}

          {openingHours ? (
            <View style={styles.openingHoursWrapper}>
              <OpeningHours openingHours={openingHours} />
            </View>
          ) : null}

          <View style={styles.menuSection}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>
                {t('rest.menuSectionTitle')}
              </Text>
              <Text style={styles.menuCount}>
                {t('rest.menuSectionCount', { count: menus.length })}
              </Text>
            </View>

            {categories.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesRow}
              >
                {categories.map((cat) => {
                  const active = activeTab === cat.id;
                  return (
                    <Pressable
                      key={cat.id}
                      onPress={() => setActiveTab(cat.id)}
                      style={[
                        styles.categoryButton,
                        active && styles.categoryActive,
                      ]}
                      accessibilityRole="tab"
                      accessibilityState={{ selected: active }}
                    >
                      {cat.img ? (
                        <Image
                          source={{ uri: cat.img }}
                          style={styles.categoryImage}
                          resizeMode="cover"
                        />
                      ) : null}
                      <Text
                        style={[
                          styles.categoryText,
                          active && styles.categoryTextActive,
                        ]}
                        numberOfLines={1}
                      >
                        {cat.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            ) : null}
          </View>
        </View>

        <Menu
          menu={menus}
          restaurantName={name}
          city={city}
          street={street}
          id={item.id}
          active={activeTab}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: 'green',
  },
  scroll: {
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
    backgroundColor: 'green',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  headerTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  scrollContent: {
  },
  hero: {
    width: '100%',
    height: 220,
    backgroundColor: '#E5E7EB',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 16,
  },
  titleCard: {
    marginTop: -36,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  restaurantName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  locationText: {
    fontSize: 13,
    color: '#6B7280',
    flexShrink: 1,
  },
  metaGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  metaCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 4,
    minHeight: 90,
  },
  metaValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
    textAlign: 'center',
  },
  metaLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  descriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  openingHoursWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  menuSection: {
    marginTop: 8,
    gap: 12,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  menuCount: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoriesRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 4,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 44,
  },
  categoryActive: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  categoryImage: {
    width: 36,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  invalid: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  invalidText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
});