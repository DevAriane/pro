import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

import { useCart } from '@/contexts/CartContext';
import { useRestaurants } from '@/contexts/RestaurantContext';
import { useAuth } from '@/contexts/AuthContext';
import All from '../all';

type Category = { id: string; name: string; img?: string } | string;

export default function HomeScreen() {
  const { t } = useTranslation();
  const { items } = useCart();
  const { user } = useAuth();
  const { categories } = useRestaurants();

  const [activeTab, setActiveTab] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = items?.length ?? 0;

  const onCartPress = () => {
    if (cartCount > 0) {
      router.push('/cart');
    } else {
      Alert.alert(t('cart.emptyTitle'), t('cart.emptyMessage'));
    }
  };

  return (
    <SafeAreaView style={styles.area} edges={['bottom']}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel={t('home.menu')}
          >
            <AntDesign name="bars" size={24} color="#FFFFFF" />
          </Pressable>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {t('tabs.home')}
          </Text>
          <Pressable
            style={styles.iconButton}
            onPress={onCartPress}
            accessibilityRole="button"
            accessibilityLabel={t('cart.open', { count: cartCount })}
          >
            <Feather name="shopping-bag" size={20} color="#FFFFFF" />
            {cartCount > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            ) : null}
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText} numberOfLines={2}>
              {t('home.greeting', {
                name: user?.name ?? t('home.guest'),
              })}
            </Text>
          </View>

          <View style={styles.searchBar}>
            <AntDesign name="search" size={20} color="#9CA3AF" />
            <TextInput
              placeholder={t('home.searchPlaceholder')}
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
            />
            {searchQuery.length > 0 ? (
              <Pressable
                onPress={() => setSearchQuery('')}
                accessibilityRole="button"
                accessibilityLabel={t('home.clearSearch')}
              >
                <AntDesign name="closesquare" size={20} color="#9CA3AF" />
              </Pressable>
            ) : null}
          </View>

          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>
              {t('home.allCategories')}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesRow}
            >
              <Pressable
                onPress={() => setActiveTab('All')}
                style={[
                  styles.tabButton,
                  activeTab === 'All' && styles.tabButtonActive,
                ]}
                accessibilityRole="tab"
                accessibilityState={{ selected: activeTab === 'All' }}
              >
                <Image
                  source={require('../../assets/images/img62.jpg')}
                  style={styles.categoryImage}
                  resizeMode="cover"
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'All' && styles.tabTextActive,
                  ]}
                  numberOfLines={1}
                >
                  {t('home.all')}
                </Text>
              </Pressable>

              {(categories ?? []).map((category, index) => {
                const key =
                  typeof category === 'string'
                    ? category
                    : category.id ?? category.name ?? String(index);
                const label =
                  typeof category === 'string' ? category : category.name;
                const image =
                  typeof category === 'string' ? undefined : category.img;
                const isSelected =
                  activeTab === category ||
                  (typeof activeTab !== 'string' &&
                    typeof category !== 'string' &&
                    activeTab?.id === category.id);

                return (
                  <Pressable
                    key={key}
                    onPress={() => setActiveTab(category)}
                    style={[
                      styles.tabButton,
                      isSelected && styles.tabButtonActive,
                    ]}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: isSelected }}
                  >
                    {image ? (
                      <Image
                        source={{ uri: image }}
                        style={styles.categoryImage}
                        resizeMode="cover"
                      />
                    ) : null}
                    <Text
                      style={[
                        styles.tabText,
                        isSelected && styles.tabTextActive,
                      ]}
                      numberOfLines={1}
                    >
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.exploreContainer}>
            <Text style={styles.exploreText}>
              {t('home.exploreRestaurants')}
            </Text>
          </View>

          {/* ✅ searchQuery est bien transmis à All */}
          <All category={activeTab} searchQuery={searchQuery} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1 },
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    width: '100%',
    minHeight: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'green',
    paddingHorizontal: 12,
    paddingVertical: 25,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF6B00',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  scrollContent: { paddingBottom: 24 },
  greetingContainer: { paddingHorizontal: 16, marginTop: 12 },
  greetingText: { fontSize: 16, color: '#111827', fontWeight: '600' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    minHeight: 48,
    marginVertical: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: '#111827',
    paddingVertical: 0,
  },
  categoryContainer: { paddingHorizontal: 16, gap: 10 },
  categoryTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  categoriesRow: { flexDirection: 'row', gap: 10, paddingVertical: 8 },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tabButtonActive: { backgroundColor: 'green', borderColor: 'green' },
  tabText: { color: '#6B7280', fontWeight: '600', fontSize: 14 },
  tabTextActive: { color: '#FFFFFF' },
  categoryImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
    backgroundColor: '#F3F4F6',
  },
  exploreContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  exploreText: { fontSize: 18, fontWeight: '700', color: '#111827' },
});