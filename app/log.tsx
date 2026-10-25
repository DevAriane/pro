import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

import Utilisateur from "./utilisateur";
import Livreur from "./livreur";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t } = useTranslation();
  const { loading } = useAuth();
  const [isClient, setIsClient] = useState(true); 

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" barStyle="light-content" />
      
      <View style={styles.header}>
        <Pressable onPress={() => router.push("/option")} style={styles.backButton}>
          <AntDesign name="left" size={22} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>{t('auth.loginTitle')}</Text>
        <View style={{ width: 22 }} /> 
      </View>

      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              isClient ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => setIsClient(true)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                isClient ? styles.activeTabText : styles.inactiveTabText,
              ]}
            >
              {t('auth.clients')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              !isClient ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => setIsClient(false)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                !isClient ? styles.activeTabText : styles.inactiveTabText,
              ]}
            >
              {t('auth.drivers')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          {isClient ? <Utilisateur /> : <Livreur />}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: "green",
  },
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    height: 56,
    backgroundColor: "green",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    margin: 16,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "green",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  inactiveTab: {
    backgroundColor: "transparent",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  activeTabText: {
    color: "white",
  },
  inactiveTabText: {
    color: "#4B5563",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});