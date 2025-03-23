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
  StatusBar,
  Button,
  Pressable,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, router, useLocalSearchParams } from "expo-router";
import { io } from "socket.io-client";
import * as Location from "expo-location";
import Available from "./available";
import Delivery from "./delivery";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrderContext";
import ENC from "./encours";
import { useTracking } from "@/contexts/TrackingContext";

function LivreurProfil() {
  const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;
  // const socket = io("https://serveur-production-7b71.up.railway.app:5000"); // Replace with your server URL

  const { orders } = useOrders();
  const { user } = useAuth();
  const { socket, isConnected } = useTracking();

  const [activeTab, setActiveTab] = useState("Available");

  useEffect(() => {
    if (isConnected && socket) {
      console.log("🎉 Écoute des mises à jour des commandes...");
      socket.on("order_update", (data) => {
        console.log("📦 Nouvelle mise à jour de commande :", data);
      });
    }

    return () => {
      if (socket) socket.off("order_update");
    };
  }, [socket, isConnected]);

  return (
    <SafeAreaView style={styles.area}>
    <StatusBar backgroundColor="green" barStyle="light-content" />
    <View style={styles.containt}>
      {/* Header with padding for status bar */}
      <View style={[styles.header, { paddingTop: statusBarHeight }]}>
        <View
          style={{
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "transparent",
          }}
        >
          <Pressable onPress={() => router.push("/liv")}>
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
          </Pressable>
        </View>
        <View>
          <Text style={{ color: "white", fontSize: 20 }}>
            Salut <Text style={{ fontWeight: "bold" }}>{user.nom} </Text>!
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>{user.email}</Text>
        </View>
        <AntDesign name="right" size={24} color="white" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tab Container */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab("Available")}
            style={[
              styles.tabButton,
              activeTab === "Available" && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Available" && styles.activeTabText,
              ]}
            >
              Disponible
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("Encours")}
            style={[
              styles.tabButton,
              activeTab === "Encours" && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Encours" && styles.activeTabText,
              ]}
            >
              Encours
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("Delivered")}
            style={[
              styles.tabButton,
              activeTab === "Delivered" && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Delivered" && styles.activeTabText,
              ]}
            >
              Livré
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === "Available" && (
          <Available reservationVenant={orders.Comming} />
        )}
        {activeTab === "Encours" && <ENC encours={orders.Encours} />}
        {activeTab === "Delivered" && (
          <Delivery delivered={orders.Delivered} />
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
    backgroundColor: "whitesmoke",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "green",
    paddingHorizontal: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  tabButton: {
    padding: 10,
    borderRadius: 5,
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
});
