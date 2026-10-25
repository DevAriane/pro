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
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
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
  const params = useLocalSearchParams();

  let item: Restaurant | null = null;
  try {
    item = params.item ? (JSON.parse(params.item as string) as Restaurant) : null;
  } catch {
    item = null;
  }

  if (!item) {
    return (
      <SafeAreaView style={styles.area}>
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
  const averageRating = item.ratings?.averageRating;
  const menus = item.menus ?? [];
  const categories = item.restaurantCategories ?? [];

  const [activeTab, setActiveTab] = useState<string>(
    categories[0]?.id ?? ''
  );

  const ratingText = useMemo(
    () => (averageRating != null ? averageRating.toFixed(1) : t('rest.newRestaurant')),
    [averageRating, t]
  );

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />

      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel={t('rest.back')}
        >
          <AntDesign name="left" size={22} color="#111827" />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {name}
        </Text>
        <Pressable
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel={t('rest.more')}
        >
          <AntDesign name="ellipsis1" size={22} color="#111827" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {cover ? (
            <Image source={{ uri: cover }} style={styles.coverImage} resizeMode="cover" />
          ) : (
            <View style={[styles.coverImage, styles.coverPlaceholder]} />
          )}

          {description ? (
            <Text style={styles.description} numberOfLines={3}>
              {description}
            </Text>
          ) : null}

          <View style={styles.ratingRow}>
            <View style={styles.ratingItem}>
              <AntDesign name="staro" size={16} color="green" />
              <Text style={styles.ratingText}>{ratingText}</Text>
            </View>
            <View style={styles.ratingItem}>
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={16}
                color="green"
              />
              <Text style={styles.ratingText}>{t('rest.freeDelivery')}</Text>
            </View>
            <View style={styles.ratingItem}>
              <Feather name="clock" size={16} color="green" />
              <Text style={styles.ratingText}>{t('rest.deliveryTime')}</Text>
            </View>
          </View>

          {openingHours ? <OpeningHours openingHours={openingHours} /> : null}

          {categories.length > 0 && (
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
                    style={[styles.categoryButton, active && styles.categoryActive]}
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
          )}
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
  area: { flex: 1, backgroundColor: '#F9FAFB' },
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
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerTitle: {
    flex: 1,
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  scrollContent: { paddingBottom: 24 },
  content: { paddingHorizontal: 16, paddingTop: 16 },
  coverImage: {
    width: '100%',
    height: 170,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },
  coverPlaceholder: { backgroundColor: '#E5E7EB' },
  description: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 12,
    lineHeight: 20,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    flexWrap: 'wrap',
    rowGap: 6,
  },
  ratingItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  ratingText: { color: '#6B7280', fontSize: 13 },
  categoriesRow: {
    paddingVertical: 12,
    gap: 10,
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
    width: 40,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
  },
  categoryTextActive: { color: 'white' },
  invalid: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  invalidText: { fontSize: 15, color: '#6B7280', textAlign: 'center' },
});