import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

export type Dish = {
  key: string;
  image: ImageSourcePropType;
  titre?: string;
  nom?: string;
  price: number | string;
};

type Shop = {
  img: ImageSourcePropType;
  gateau?: Dish[];
  fruits?: Dish[];
  amuse?: Dish[];
};

type Props = { c: Shop[] };

function DishCard({ dish }: { dish: Dish }) {
  const { t } = useTranslation();
  const label = dish.titre ?? dish.nom ?? '';
  return (
    <View style={styles.dishCard}>
      <Image source={dish.image} style={styles.dishImage} resizeMode="cover" />
      <Text style={styles.dishTitle} numberOfLines={1}>
        {label}
      </Text>
      <Text style={styles.dishPrice}>
        {t('dessert.price', { price: dish.price })}
      </Text>
    </View>
  );
}

function DishGrid({ dishes, emptyLabel }: { dishes?: Dish[]; emptyLabel: string }) {
  if (!dishes || dishes.length === 0) {
    return <Text style={styles.emptySection}>{emptyLabel}</Text>;
  }
  return (
    <View style={styles.grid}>
      {dishes.map((dish) => (
        <DishCard key={dish.key} dish={dish} />
      ))}
    </View>
  );
}

export default function Dessert({ c }: Props) {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="" style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {c.map((shop, shopIndex) => (
          <View key={shopIndex} style={styles.shopCard}>
            <Text style={styles.shopTitle}>{t('dessert.mainTitle')}</Text>
            <Image source={shop.img} style={styles.cover} resizeMode="cover" />

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <AntDesign name="staro" size={16} color="#10B981" />
                <Text style={styles.metaText}>{t('dessert.rating')}</Text>
              </View>
              <View style={styles.metaItem}>
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  size={16}
                  color="#10B981"
                />
                <Text style={styles.metaText}>{t('dessert.freeDelivery')}</Text>
              </View>
              <View style={styles.metaItem}>
                <Feather name="clock" size={16} color="#10B981" />
                <Text style={styles.metaText}>{t('dessert.deliveryTime')}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>{t('dessert.cakes')}</Text>
            <DishGrid dishes={shop.gateau} emptyLabel={t('dessert.noCakes')} />

            <Text style={styles.sectionTitle}>{t('dessert.fruitsSection')}</Text>
            <DishGrid dishes={shop.fruits} emptyLabel={t('dessert.noFruits')} />

            <Text style={styles.sectionTitle}>{t('dessert.snacks')}</Text>
            <DishGrid dishes={shop.amuse} emptyLabel={t('dessert.noSnacks')} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1, backgroundColor: '#F9FAFB' },
  scrollContent: { paddingHorizontal: 12, paddingVertical: 16, gap: 16 },
  shopCard: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    marginBottom: 16,
  },
  shopTitle: {
    marginVertical: 6,
    fontWeight: '700',
    fontSize: 18,
    fontStyle: 'italic',
    color: '#111827',
  },
  cover: {
    width: '100%',
    height: 160,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
    flexWrap: 'wrap',
    rowGap: 6,
  },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: '#6B7280', fontSize: 13, marginLeft: 2 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#6B7280',
    textAlign: 'center',
    marginVertical: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  dishCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  dishImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  dishTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginTop: 6,
    textAlign: 'center',
  },
  dishPrice: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
    textAlign: 'center',
  },
  emptySection: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingVertical: 10,
  },
});