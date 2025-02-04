import {
  Image,
  StyleSheet,
  Platform,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import Foundation from "@expo/vector-icons/Foundation";
import { Link, useLocalSearchParams } from "expo-router";
import { io } from "socket.io-client";
import * as Location from "expo-location";
import Available from "./available";
import Delivery from "./delivery";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrderContext";

function LivreurProfil() {
  const socket = io("http://localhost:5000"); // Replace with your server URL

  const { orders, fetchOrdersDelivery, assignDeliveryPartner, updateOrder } =
    useOrders();
  const { user } = useAuth();
 
  //    const affectOrder = (OrderId:string) => {
  //    assignDeliveryPartner(OrderId, user.uid);
  //    orders.filter((order)=>order.id !== OrderId);
  // };

  // useEffect((()=>{

  //   fetchOrdersDelivery();

  //   console.log('bonjour');

  //   if (affiche===true){
  //     setColor(true);
  //     console.log('bonjour1')
  //   }
  //   else if(affiche===false){
  //     setColor(false);
  //     console.log('bonjour2')
  //   }
  //  }),[affiche]);

  const [affiche, setAffiche] = useState(true);
  const [color, setColor] = useState(true);
 

  //  const filteredOrders = orders.filter(order => order. deliveryPartnerId === null);
  //  console.log('filteredOrders',filteredOrders);

  const orderId = "ORDER_123"; // Get from props/state
  const partnerId = "PARTNER_456"; // Get from auth

  // useEffect(() => {
  //   let watchId;

  //   const startTracking = async () => {
  //     const hasPermission = await Location.requestForegroundPermissionsAsync();
  //     if (!hasPermission) return;

  //     watchId = await Location.watchPositionAsync(
  //       {
  //         accuracy: Location.Accuracy.High,
  //         distanceInterval: 100, // Meters
  //         timeInterval: 10000, // Milliseconds
  //       },
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         socket.emit("location_update", {
  //           orderId,
  //           partnerId,
  //           location: { latitude, longitude },
  //         });
  //       }
  //     );
  //   };

  //   startTracking();

  //   return () => {
  //     if (watchId) Location.removeWatch(watchId);
  //   };
  // }, [partnerId]); // Add dependencies

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.containt}>
        <View style={styles.header}>
          <View
            style={{
              borderRadius: "50%",
              borderWidth: 1,
              borderColor: "transparent",
            }}
          >
            <Image
              source={require("../assets/images/telecharge.jpeg")}
              style={{
                width: 50,
                height: 50,
                borderWidth: 1,
                borderColor: "transparent",
                borderRadius: 30,
              }}
            />
          </View>
          <View>
            <Text style={{ color: "white", fontSize: 20 }}>Hello {user.nom} !</Text>
            <Text style={{ color: "white", fontSize: 16 }}>
              {user.email}
            </Text>
          </View>
          <AntDesign name="right" size={24} color="white" />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <View
              style={[
                styles.text,
                { backgroundColor: color ? "green" : "gray" },
              ]}
            >
              <Text
                onPress={() => {
                  setAffiche(true);
                }}
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: 500,
                  backgroundColor: color ? "green" : "gray",
                }}
              >
                Available
              </Text>
            </View>
            <View
              style={[
                styles.text,
                { backgroundColor: !color ? "green" : "gray" },
              ]}
            >
              <Text
                onPress={() => {
                  setAffiche(false);
                }}
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: 500,
                  backgroundColor: !color ? "green" : "gray",
                }}
              >
                Delived
              </Text>
            </View>
          </View>

          {affiche ? (
            <Available reservationVenant={orders.Comming} />
          ) : (
            <Delivery />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
export default LivreurProfil;
const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  containt: {
    flex: 1,
    justifyContent: "space-between",
    borderRadius: 50,
    // borderWidth:1,
    // borderColor:'transparent',
    backgroundColor: "whitesmoke",
  },
  header: {
    width: "100%",
    position: "fixed",
    height: 120,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "green",
    color: "white",
    alignItems: "center",
  },
  vie: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  c: {
    margin: 5,
    backgroundColor: "white",
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 15,
  },
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
  },
});
