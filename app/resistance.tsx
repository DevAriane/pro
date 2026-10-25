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

type Dish = {
  key: string;
  image: ImageSourcePropType;
  titre?: string;
  nom?: string;
  price: number | string;
};

type Shop = {
  img: ImageSourcePropType;
  grillade?: Dish[];
  repas?: Dish[];
  accompagnement?: Dish[];
};

type Props = { b: Shop[] };

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
        {t('resistance.price', { price: dish.price })}
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

export default function Resistance({ b }: Props) {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {b.map((shop, shopIndex) => (
          <View key={shopIndex} style={styles.shopCard}>
            <Text style={styles.shopTitle}>{t('resistance.mainTitle')}</Text>
            <Image source={shop.img} style={styles.cover} resizeMode="cover" />

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <AntDesign name="staro" size={16} color="green" />
                <Text style={styles.metaText}>{t('resistance.rating')}</Text>
              </View>
              <View style={styles.metaItem}>
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  size={16}
                  color="green"
                />
                <Text style={styles.metaText}>{t('resistance.freeDelivery')}</Text>
              </View>
              <View style={styles.metaItem}>
                <Feather name="clock" size={16} color="green" />
                <Text style={styles.metaText}>{t('resistance.deliveryTime')}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>{t('resistance.grilled')}</Text>
            <DishGrid dishes={shop.grillade} emptyLabel={t('resistance.noGrilled')} />

            <Text style={styles.sectionTitle}>{t('resistance.meals')}</Text>
            <DishGrid dishes={shop.repas} emptyLabel={t('resistance.noMeals')} />

            <Text style={styles.sectionTitle}>{t('resistance.sides')}</Text>
            <DishGrid
              dishes={shop.accompagnement}
              emptyLabel={t('resistance.noSides')}
            />
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
    borderWidth: 1,
    borderColor: '#E5E7EB',
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