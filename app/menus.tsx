import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StatusBar,
  
  Dimensions,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

// Définition des types
interface CustomizationOption {
  [key: string]: any;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  menuCategoryId: string;
  restaurantCategoryId: string;
  customizationOptions?: CustomizationOption[];
}

interface MenuProps {
  menu: MenuItem[];
  cover: string;
  restaurantName: string;
  city: string;
  street: string;
  id: number;
  active: string;
}

const Menu: React.FC<MenuProps> = ({ menu, cover, restaurantName, city, street, id, active }) => {
  const router = useRouter();
  const [filterRestaurant, setFilterRestaurant] = useState<MenuItem[]>(menu);
  const [loading, setLoading] = useState<boolean>(false);

  // Calculate card width dynamically
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 30 - 15) / 2; // 30px for horizontal padding, 15px for gap

  const handleOrder = (item: MenuItem) => {
    setLoading(true);
    router.push({
      pathname: "/fd",
      params: { item: JSON.stringify({ ...item, restaurantName: restaurantName, restaurantId: id, cov: cover }) },
    });
    setTimeout(() => setLoading(false), 3000);
  };

  useEffect(() => {
    if (active) {
      const filtered = menu.filter((i) => i.restaurantCategoryId === active);
      setFilterRestaurant(filtered);
    }
  }, [active, menu]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="green" barStyle="light-content" />
      <FlatList
        data={filterRestaurant}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.card, { width: cardWidth }]}>
            {/* Image */}
            <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />

            {/* Infos */}
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{item.name}</Text>

              <Text style={styles.restaurantName} numberOfLines={1}>
                {item.description}
              </Text>
              {/* <Text style={styles.restaurantName}>{city} - {street}</Text> */}

              {/* Prix & Bouton */}
              <View style={styles.bottomRow}>
                <Text style={styles.price}>{item.price} <Text style={{fontSize:14}}>FCFA</Text></Text>
                <TouchableOpacity style={styles.button} onPress={() => handleOrder(item)} disabled={loading}>
                  <AntDesign name="plus" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>En cours de préparation !!!</Text>}
      />
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    paddingHorizontal: 15, // Adjusted padding
  },
  row: {
    gap: 15,
    justifyContent: "space-between", // Espace entre les colonnes
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingBottom: 10,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 90,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  restaurantName: {
    fontSize: 14,
    color: "gray",
    marginVertical: 1,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    backgroundColor: "orange",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});