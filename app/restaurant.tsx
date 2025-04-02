import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  Dimensions
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Menu from "./menus";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { OpeningHours } from "@/components/OpeningHours"; // Assurez-vous que ce composant est correct

function Rest() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item) : null;

  if (!item) {
    return <Text>Loading...</Text>;
  }

  const { profile, menus, images, id, address, ratings, restaurantCategories } = item;
  const { name, description, openingHours } = profile;
  const { street, city } = address;
  const { gallery,cover } = images;
  const { averageRating } = ratings;

  const [activeTab, setActiveTab] = useState("resto_cat_1");
  // const screenWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <AntDesign name="left" size={24} color="black" />
          </Pressable>
          <Text style={styles.headerText}>{name}</Text>
          <Pressable style={styles.icon}>
            <AntDesign name="ellipsis1" size={24} color="black" />
          </Pressable>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Carousel */}
          {/* <Carousel
            data={gallery}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.carouselImage} />
              </View>
            )}
            width={screenWidth}
            height={150}
            autoPlay
            autoPlayInterval={2000}
            loop
            Pagination={({ paginationProps }) => <Pagination {...paginationProps} />}
          /> */}

<TouchableOpacity>
              <Image
                source={{ uri: cover }}
                style={styles.coverImage}
                resizeMode="cover"
              />
            </TouchableOpacity>

          {/* Description */}
          <Text numberOfLines={2}>{description}</Text>

          {/* Ratings */}
          <View style={styles.ratingContainer}>
            <View style={styles.ratingItem}>
              <AntDesign name="staro" size={20} color="green" />
              <Text>{averageRating.toFixed(1)}</Text>
            </View>
            <View style={styles.ratingItem}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={20} color="green" />
              <Text>Free</Text>
            </View>
            <View style={styles.ratingItem}>
              <Feather name="clock" size={20} color="green" />
              <Text>20min</Text>
            </View>
          </View>

          {/* Opening Hours */}
          <OpeningHours openingHours={openingHours} />

          {/* Restaurant Categories */}
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

        {/* Menu Component */}
        <Menu
          menu={menus}
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
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  header: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    padding: 5,
    backgroundColor: "lightgray",
    borderRadius: 50,
  },
  content: {
    margin: 10,
  },
  coverImage: {
    width: "100%",
    height: 150,
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 25,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImage: {
    width: "100%",
    height: 150,
    borderRadius: 25,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5,
  },
  ratingItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  categoriesContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  tabButton: {
    marginRight: 10,
    padding: 5,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "green",
  },
  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },
  categoryItem: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems: "center",
  },
  categoryImage: {
    width: 50,
    height: 40,
    borderRadius: 20,
  },
  tabText:{
color:"gray",
margin:5,
fontWeight:'bold'
  },
});
