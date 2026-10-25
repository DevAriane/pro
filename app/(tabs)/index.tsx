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
import { useTranslation } from "react-i18next";

import { useCart } from "@/contexts/CartContext";
import { useRestaurants } from "@/contexts/RestaurantContext";
import { useAuth } from "@/contexts/AuthContext";
import All from "../all";

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { items } = useCart();
  const { user } = useAuth();
  const { categories } = useRestaurants();

  const [activeTab, setActiveTab] = useState<any>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const onCartPress = () => {
    if (items && items.length > 0) {
      router.push("/cart");
    } else {
      Alert.alert(
        t("cart.emptyTitle", { defaultValue: "Panier vide" }),
        t("cart.emptyMessage", { defaultValue: "Vous n'avez aucun plat dans votre panier" })
      );
    }
  };

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.containt}>
        {/* Header */}
        <View style={styles.header}>
          <AntDesign name="bars" size={24} color="#FFFFFF" />
          <Text style={styles.headerTitle}>
            {t("tabs.home", { defaultValue: "Accueil" })}
          </Text>
          <TouchableOpacity style={styles.cartButton} onPress={onCartPress}>
            <View style={styles.cartIconContainer}>
              <Feather name="shopping-bag" size={20} color="#FFFFFF" />
              {items && items.length > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{items.length}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Greeting */}
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>
              {t("home.greeting", { 
                name: user?.name || t("home.guest", { defaultValue: "invité" }), 
                defaultValue: `Hey ${user?.name || 'invité'}, bonjour !!!` 
              })}
            </Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <AntDesign name="search1" size={20} color="gray" />
            <TextInput
              placeholder={t("home.searchPlaceholder", { defaultValue: "Chercher les restaurants" })}
              placeholderTextColor="gray"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <AntDesign name="closesquare" size={20} color="gray" />
              </TouchableOpacity>
            )}
          </View>

          {/* Categories Horizontal Slider */}
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>
              {t("home.allCategories", { defaultValue: "Toutes les catégories" })}
            </Text>
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
                    {t("home.all", { defaultValue: "Tout" })}
                  </Text>
                </TouchableOpacity>

                {categories?.map((category) => {
                  const isSelected = activeTab === category;
                  return (
                    <TouchableOpacity
                      key={category.name}
                      onPress={() => setActiveTab(category)}
                      style={[styles.tabButton, isSelected && styles.activeTab]}
                    >
                      <Image
                        source={{ uri: category.img }}
                        style={styles.categoryImage}
                        resizeMode="cover"
                      />
                      <Text style={[styles.tabText, isSelected && styles.activeTabText]}>
                        {category.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          {/* Explore Section */}
          <View style={styles.exploreContainer}>
            <Text style={styles.exploreText}>
              {t("home.exploreRestaurants", { defaultValue: "Explorez les restaurants" })}
            </Text>
          </View>

          {/* Restaurant Listing Sub-Component */}
          <All category={activeTab} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  containt: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "green",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  cartButton: {
    padding: 4,
  },
  cartIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#333333",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeContainer: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FF6B00",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  greetingContainer: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  greetingText: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: "#1F2937",
  },
  categoryContainer: {
    paddingHorizontal: 16,
    gap: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  categoriesWrapper: {
    flexDirection: "row",
    paddingBottom: 8,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeTab: {
    backgroundColor: "green",
    borderColor: "green",
  },
  tabText: {
    color: "#6B7280",
    fontWeight: "600",
    fontSize: 14,
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  categoryImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  exploreContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  exploreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
});