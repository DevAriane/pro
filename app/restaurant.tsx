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
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { Link, useLocalSearchParams, router } from "expo-router";
import CheckBox from "@react-native-community/checkbox";
import { StatusBar } from "expo-status-bar";
import Utilisateur from "./utilisateur";
import Livreur from "./livreur";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuth } from "@/contexts/AuthContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouteInfo, useSearchParams } from "expo-router/build/hooks";

function Rest() {
  // const router=useRouter();
  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item) : null;
  const { profile, menus, images, id, address, ratings } = item;
  const { name, description, openingHours } = profile;
  const { street, city } = address;
  const { logo, cover } = images;
  const { averageRating } = ratings;
  const { friday, monday, saturday, thursday, tuesday, wednesday } =
    openingHours;
  const { close, open } = friday;
const [loading,setLoading]=useState(false);
  console.log("menus", menus);

  const Direction = (x) => {
    setLoading(true);
    router.push({
      pathname: "/fd",
      params: { item: JSON.stringify({ ...x, restaurantId: id }) },
    });
    setTimeout(()=>{
      setLoading(false);
    },3000);
    
  };
  console.log('loading:',loading);
  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.containt}>
        <View style={styles.hidden}>
          <Link href="/(tabs)">
            {" "}
            <AntDesign name="left" size={24} color="white" />
          </Link>
          <View
            style={{
              marginLeft: 20,
              height: 45,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              backgroundColor: "white",
              borderColor: "transparent",
              borderRadius: 10,
              width: 300,
            }}
          >
            <AntDesign name="search1" size={20} color="lightgray" />
            <Text>{name}</Text>
            <AntDesign name="close" size={20} color="lightgray" />
          </View>
        </View>
        <View style={{ marginVertical: "8%" }}>
          <View
            style={{
              display: "flex",
              alignItems: "flex-start",
              margin: 5,
              backgroundColor: "white",
              marginVertical: 20,
              padding: 5,
              borderColor: "transparent",
              borderRadius: 20,
            }}
          >
            <View>
              <Text style={{ fontSize: 20 }}>{name}</Text>
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
                margin: 5,
              }}
            >
              <FontAwesome5 name="map-marker-alt" size={15} color="green" />
              <Text>{description}</Text>
            </View>
            <View style={{ margin: 5 }}>
              {" "}
              <Image
                source={cover}
                style={{ width: 300, height: 200 }}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
              }}
            >
              
              <View>
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    flexDirection: "row",
                    margin: 5,
                  }}
                >
                  <AntDesign name="clockcircle" size={15} color="green" />
                  <Text>
                    Ouvert de {open} à {close}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  flexDirection: "row",
                }}
              >
                <FontAwesome name="xing" size={15} color="blue" />
                <Text style={{ color: "blue" }}>Visit restaurant</Text>
              </View>
              <View></View>
            </View>
          </View>

          {menus.map((x) => {
            return (
              <View
                style={{
                  backgroundColor: "white",
                  alignItems: "center",
                  borderColor: "transparent",
                  borderWidth: 1,
                  borderRadius: 5,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  margin: 5,
                }}
              >
                <Image
                  source={{ uri: x.imageUrl }}
                  style={{
                    width: 50,
                    height: 50,
                    borderColor: "transparent",
                    borderWidth: 1,
                    borderRadius: 2,
                  }}
                  resizeMode="cover"
                />

                <View>
                  <Text style={{ fontSize: 16, padding: 2 }}>{x.name}</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <FontAwesome5
                      name="map-marker-alt"
                      size={15}
                      color="green"
                    />
                    <Text style={{ color: "gray", padding: 2 }}>
                      {" "}
                      {city} {street}{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome name="star" size={15} color="yellow" />
                    <Text style={{ color: "gray", padding: 2 }}>
                      {averageRating}
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity onPress={() =>
                  
                    Direction(x)} disabled={loading}>
                    <Text
                      style={{
                        color: "white",
                        borderWidth: 1,
                        borderRadius: 5,
                        backgroundColor: "green",
                        borderColor: "transparent",
                        width: 70,
                        padding: 5,
                        textAlign: "center",
                      }}
                    >
                         {loading && (
                                        <ActivityIndicator
                                          size="small"
                                          color="white"
                                          style={styles.indicator}
                                        />
                                      )}
                      Book
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          {/* <View> <Text style={styles.text}> Booking</Text></View>    */}
        </View>
      </View>
    </SafeAreaView>
  );
}
export default Rest;
const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    fontSize: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    height: 40,
    width: 300,
    padding: 5,
    marginHorizontal: "auto",
    margin: 5,
  },
  vet: {
    justifyContent: "space-around",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  area: {
    flex: 1,
  },
  containt: {
    flex: 1,

    backgroundColor: "whitesmoke",
  },
  vie: {
    marginVertical: "auto",
    marginHorizontal: "auto",
  },
  hidden: {
    top: 0,
    marginTop: 20,
    position: "fixed",
    height: 120,
    backgroundColor: "green",
    display: "flex",
    flexDirection: "row",
    color: "white",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  indicator: { marginLeft: 10 },
  text: {
    height: 40,
    width: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
    color: "white",
    backgroundColor: "green",
    padding: 5,
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: "auto",
    margin: 5,
    fontWeight: 500,
  },
  sign: {
    height: 40,
    width: 300,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
    color: "green",
    backgroundColor: "white",
    padding: 5,
    textAlign: "center",
    marginHorizontal: "auto",
    margin: 5,
  },
  ali: {
    height: 40,
    width: 300,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "white",
    padding: 5,
    textAlign: "center",
    marginHorizontal: "auto",
    margin: 5,
    justifyContent: "center",
    marginVertical: 10,
  },
});
