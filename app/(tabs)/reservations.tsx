import React, { useState } from "react";
import {
  Pressable,
  
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import Comming from "../comming";
import History from "../history";
import Cancelled from "../cancelled";
import Draft from "../draft";
import { useOrders } from "@/contexts/OrderContext";

function App() {
  const params = useLocalSearchParams();
  const { orders, loading } = useOrders();
  console.log("Orders reservation:", orders.Comming);

  const [activeTab, setActiveTab] = useState("Comming");

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.containt}>
        {/* En-tête */}
        <View style={styles.header}>
          <Pressable onPress={() => router.push("/(tabs)")} style={styles.backButton}>
            <AntDesign name="left" size={24} color="white" />
          </Pressable>
          <Text style={styles.headerTitle}>Réservations</Text>
        </View>

        {/* Onglets */}
        <View style={styles.tabContainer}>
          {[
            { label: "A venir", value: "Comming" },
            { label: "Historique", value: "History" },
            { label: "Supprimé", value: "Cancelled" },
            { label: "Commentaire", value: "Draft" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.value}
              onPress={() => setActiveTab(tab.value)}
              style={[
                styles.tabButton,
                activeTab === tab.value && styles.activeTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.value && styles.activeTabText,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contenu des onglets */}
        {activeTab === "Comming" && <Comming a={orders.Comming} />}
        {activeTab === "History" && <History b={orders.Delivered} />}
        {activeTab === "Cancelled" && <Cancelled c={orders.Cancelled} />}
        {activeTab === "Draft" && <Draft />}
      </View>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  containt: {
    flex: 1,
  },
  header: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: "green",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    elevation: 4,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 100, // Décale le contenu sous l'en-tête
    paddingVertical: 12,
    backgroundColor: "white",
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: "green",
    borderRadius: 5,
  },
  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },
  tabText: {
    color: "gray",
    fontWeight: "bold",
  },
});