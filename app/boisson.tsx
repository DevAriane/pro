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

type Drink = {
  key: string;
  image: ImageSourcePropType;
  titre: string;
  price: number | string;
};

type Shop = {
  img: ImageSourcePropType;
  nonalcool: Drink[];
  alcool: Drink[];
};

type Props = { d: Shop[] };

function DrinkCard({ drink }: { drink: Drink }) {
  const { t } = useTranslation();
  return (
    <View style={styles.drinkCard}>
      <Image
        source={drink.image}
        style={styles.drinkImage}
        resizeMode="cover"
      />
      <Text style={styles.drinkTitle} numberOfLines={1}>
        {drink.titre}
      </Text>
      <Text style={styles.drinkPrice}>
        {t('boisson.price', { price: drink.price })}
      </Text>
    </View>
  );
}

function DrinksGrid({ drinks }: { drinks: Drink[] }) {
  const { t } = useTranslation();

  if (!drinks || drinks.length === 0) {
    return (
      <Text style={styles.emptySection}>{t('boisson.noItems')}</Text>
    );
  }

  return (
    <View style={styles.grid}>
      {drinks.map((drink) => (
        <DrinkCard key={drink.key} drink={drink} />
      ))}
    </View>
  );
}

export default function Boisson({ d }: Props) {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {d.map((shop, shopIndex) => (
          <View key={shopIndex} style={styles.shopCard}>
            <Text style={styles.shopTitle}>{t('boisson.mainTitle')}</Text>

            <Image
              source={shop.img}
              style={styles.cover}
              resizeMode="cover"
            />

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <AntDesign name="staro" size={16} color="green" />
                <Text style={styles.metaText}>{t('boisson.rating')}</Text>
              </View>
              <View style={styles.metaItem}>
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  size={16}
                  color="green"
                />
                <Text style={styles.metaText}>
                  {t('boisson.freeDelivery')}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Feather name="clock" size={16} color="green" />
                <Text style={styles.metaText}>
                  {t('boisson.deliveryTime')}
                </Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>
              {t('boisson.nonAlcoholic')}
            </Text>
            <DrinksGrid drinks={shop.nonalcool} />

            <Text style={styles.sectionTitle}>
              {t('boisson.alcoholic')}
            </Text>
            <DrinksGrid drinks={shop.alcool} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 16,
  },
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
  drinkCard: {
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
  drinkImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  drinkTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginTop: 6,
    textAlign: 'center',
  },
  drinkPrice: {
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