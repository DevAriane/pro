import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useCart } from "@/contexts/CartContext";
import { useRestaurants } from "@/contexts/RestaurantContext";
import All from "../all";

export default function HomeScreen() {
  const router = useRouter();
  const { items } = useCart();
  const [loading, setLoading] = useState(false);
  const { restaurants, categories } = useRestaurants();
  const [activeTab, setActiveTab] = useState("All");

  const Direction = (x) => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
    router.push({ pathname: "/restaurant", params: { item: JSON.stringify(x) } });
  };

  const onCartPress = () => {
    if (items?.length > 0) {
      router.push("/cart");
    } else {
      Alert.alert("Vous avez aucun plat dans votre panier");
    }
  };

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.containt}>
        <View style={styles.header}>
          <AntDesign name="bars" size={24} color="white" />
          <Text style={styles.headerText}>Accueil</Text>
          <TouchableOpacity style={styles.cartButton} onPress={onCartPress}>
            <View style={styles.cartIconContainer}>
              <Feather name="shopping-bag" size={20} color="#fff" />
              {items?.length > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{items.length}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Hey Ariane, Good Afternoon!</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <AntDesign name="search1" size={20} color="gray" />
            <TextInput
              placeholder="Chercher par plat, restaurants"
              placeholderTextColor="gray"
              style={styles.searchInput}
            />
            <AntDesign name="closesquare" size={20} color="gray" />
          </View>

          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>Toutes les catégories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.categoriesWrapper}>
                <TouchableOpacity
                  onPress={() => setActiveTab("All")}
                  style={[styles.tabButton, activeTab === "All" && styles.activeTab]}
                >
                  <Image
                    source={require("../../assets/images/img62.jpg")}
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                  <Text style={[styles.tabText, activeTab === "All" && styles.activeTabText]}>
                    Tout
                  </Text>
                </TouchableOpacity>

                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.name}
                    onPress={() => setActiveTab(category.name)}
                    style={[styles.tabButton, activeTab === category.name && styles.activeTab]}
                  >
                    <Image
                      source={{ uri: category.img }}
                      style={styles.categoryImage}
                      resizeMode="cover"
                    />
                    <Text style={[styles.tabText, activeTab === category.name && styles.activeTabText]}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.exploreContainer}>
            <Text style={styles.exploreText}>Explorez les restaurants</Text>
          </View>

          <All category={activeTab} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  containt: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "whitesmoke",
  },
  header: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "green",
    color: "white",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  cartButton: {
    padding: 4,
  },
  cartIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: -5,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FF6B00",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
  greetingContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  greetingText: {
    fontSize: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 16,
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  categoryContainer: {
    padding: 5,
    gap: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoriesWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingBottom: 5,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeTab: {
    backgroundColor: "green",
  },
  activeTabText: {
    color: "white",
  },
  tabText: {
    color: "gray",
    fontWeight: "bold",
  },
  categoryImage: {
    width: 35,
    height: 25,
    margin: 5,
    borderRadius: 40,
    shadowColor: "#00ff00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  exploreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "transparent",
    padding: 5,
  },
  exploreText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
