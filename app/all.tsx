import {
  Image,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Button,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useOrders } from "@/contexts/OrderContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRestaurants } from "@/contexts/RestaurantContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function All({ category }: { category: any }) {
  const { restaurants, categories } = useRestaurants();
  const [filterRestaurant, setFilterRestaurant] = useState(restaurants);
  const [loading, setLoading] = useState(false);
  const Direction = (x) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    router.push({
      pathname: "/restaurant",
      params: { item: JSON.stringify(x) },
    });
  };
  useEffect(() => {
    if (typeof category == "string") {
      setFilterRestaurant(restaurants);
    } else {
      const rest = restaurants.filter((x) =>
        x.menus.some((i) => i.menuCategoryId == category.id)
      );
      setFilterRestaurant(rest);
    }
  }, [category.id]);

  return (
    <ScrollView>
      <View>
        {filterRestaurant &&
          filterRestaurant.map((x, i) => {
            return (
              <View style={{ margin: 10 }} key={i}>
                <TouchableOpacity onPress={() => Direction(x)}>
                  <Image
                    source={{ uri: x.images.cover }}
                    style={{
                      width: "100%",
                      height: 150,
                      borderColor: "transparent",
                      borderWidth: 1,
                      borderRadius: 25,
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>

                <View>
                  <Text
                    style={{ fontSize: 18, padding: 0, fontWeight: "bold" }}
                  >
                    {x.profile.name}
                  </Text>
                 
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome5
                        name="map-marker-alt"
                        size={15}
                        color="green"
                      />
                      {x.address && (
                        <Text style={{ color: "gray", padding: 2 }}>
                          {x.address?.street},{x.address?.city}{" "}
                        </Text>
                      )}
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome name="star" size={15} color="yellow" />
                      {x?.ratings && (
                        <Text style={{ color: "gray", padding: 2 }}>
                          {x.ratings?.averageRating}
                        </Text>
                      )}
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <MaterialIcons
                        name="delivery-dining"
                        size={24}
                        color="green"
                      />
                      <Text style={{ color: "gray", padding: 2 }}>free</Text>
                    </View>
                  </View>
                </View>

                <View></View>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  containt: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  indicator: { marginLeft: 10 },
  header: {
    width: "100%",
    position: "fixed",
    height: 90,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "green",
    color: "white",
    alignItems: "center",
  },
  special: {
    height: 150,
    padding: 5,
    margin: 5,
    backgroundColor: "green",
    display: "flex",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
  },
  day: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
    backgroundColor: "white",
    padding: 5,
  },
  rest: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: "#f9c2ff",
    alignItems: "center",
  },
});
