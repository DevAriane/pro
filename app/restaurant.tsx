import {
  Image,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Menu from "./menus";
import { OpeningHours } from "@/components/OpeningHours"; // Ensure this component is correctly implemented

function Rest() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item) : null;

  if (!item) {
    return <Text>Loading...</Text>; // Handle case where item is not available
  }

  const { profile, menus, images, id, address, ratings, restaurantCategories } = item;
  const { name, description, openingHours } = profile;
  const { street, city } = address;
  const { logo, cover } = images;
  const { averageRating } = ratings;
  const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = openingHours;

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("resto_cat_1");

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
        <View style={styles.containt}>
          <View style={styles.hidden}>
            <Pressable onPress={() => router.back()}>
              <AntDesign name="left" size={24} color="black" />
            </Pressable>
            <Text style={styles.headerText}>{name}</Text>
            <Pressable onPress={() => router.push("/fd")} style={styles.ico}>
              <AntDesign name="ellipsis1" size={24} color="black" />
            </Pressable>
          </View>

          <View style={{ margin: 10 }}>
            <TouchableOpacity>
              <Image
                source={{ uri: cover }}
                style={styles.coverImage}
                resizeMode="cover"
              />
            </TouchableOpacity>

            {/* <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>{name}</Text>
            </View> */}
            <Text numberOfLines={2}>{description}</Text>

            <View style={styles.ratingContainer}>
              <View style={styles.ratingItem}>
                <AntDesign name="staro" size={20} color="green" />
                <Text>4.7</Text>
              </View>
              <View style={styles.ratingItem}>
                <MaterialCommunityIcons name="truck-delivery-outline" size={20} color="green" />
                <Text>free</Text>
              </View>
              <View style={styles.ratingItem}>
                <Feather name="clock" size={20} color="green" />
                <Text>20min</Text>
              </View>
            </View>

            {/* Opening hours component */}
            <OpeningHours openingHours={openingHours} />

          

            {/* <Text style={styles.plat}>Enjaillez-vous avec nos différents menus</Text> */}

            <ScrollView horizontal={true}>
              <View style={styles.categoriesContainer}>
                {restaurantCategories.map((category) => (
                  <TouchableOpacity
                    key={category.name}
                    onPress={() => setActiveTab(category.id)}
                    style={[styles.tabButton, activeTab === category.id && styles.activeTab]}
                  >
                    <View style={styles.categoryItem}>
                      <View style={styles.categoryImageContainer}>
                        <Image
                          source={{ uri: category.img }}
                          style={styles.categoryImage}
                          resizeMode="cover"
                        />
                      </View>
                      <Text style={[styles.tabText, activeTab === category.id && styles.activeTabText]}>
                        {category.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <Menu
            menu={menus}
            cover={cover}
            restaurantName={name}
            city={city}
            street={street}
            averageRating={averageRating}
            id={id}
            active={activeTab}
          />
        </View>
    </SafeAreaView>
  );
}

export default Rest;

const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  containt: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  hidden: {
   // top: 0,
    marginTop: 50,
   // position: "fixed",
    display: "flex",
    flexDirection: "row",
    color: "white",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
  },
  headerText: {
    fontSize: 18,
    backgroundColor: "white",
    borderColor: "transparent",
    borderRadius: 20,
    padding: 10,
    width: 200,
    textAlign: "center",
    fontWeight: "bold",
  },
  ico: {
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "lightgray",
    borderRadius: 50,
    padding: 3,
  },
  coverImage: {
    width: "100%",
    height: 150,
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 25,
  },
  ratingContainer: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  ratingItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  plat: {
    margin: 5,
    fontWeight: 700,
    fontSize: 18,
    fontStyle: "italic",
    color: "gray",
  },
  categoriesContainer: {
   paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  tabButton: {
    padding: 5,
    paddingRight: 10,
    borderRadius: 20,
    color: "white",
    fontWeight: "bold",
   marginBottom: 10,
  },
  activeTab: {
    backgroundColor: "green",
  },
  activeTabText: {
    color: "white",
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  categoryImageContainer: {
    width: 35,
    height: 25,
    margin: 5,
  },
  categoryImage: {
    width: "100%",
    height: "100%",
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 40,
    shadowColor: "#00ff00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  tabText: {
    color: "gray",
    fontWeight: "bold",
  },
});