import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useState } from "react";
import { useOrders } from "@/contexts/OrderContext";
import { useAuth } from "@/contexts/AuthContext";

interface CommingProps {
  a: any[];
}

export default function Comming({ a }: CommingProps) {
  const { user } = useAuth();
  const { updateOrder } = useOrders();
  const [order, setOrder] = useState<any | null>(null);

  const cancel = async (x: any) => {
    if (x.status.current === "PENDING" || x.status.current === "ASSIGNED") {
      const updates = {
        userId: user.uid,
        status: {
          current: "CANCELLED",
          timeline: [
            ...x.status.timeline,
            {
              status: "CANCELLED",
              timestamp: new Date(),
              note: "User cancel",
            },
          ],
        },
      };
      await updateOrder(x.id, updates);
    } else {
      Alert.alert("Votre commande est en cours de traitement.");
    }
  };

  const goToOrderDetails = (x: any) => {
    router.push(`/orders/${x.id}`);
  };

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {a.map((order) => (
          <View key={order.id} style={styles.orderContainer}>
            {order.items.map((item) => (
              <View key={item.id} style={styles.itemContainer}>
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: item.imageUrl }} style={styles.image} />
                </View>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDescription} numberOfLines={3}>
                    {item.description}
                  </Text>
                </View>
                <View style={styles.itemPricing}>
                  <Text style={styles.itemQuantity}>x{item.nbre}</Text>
                  <Text style={styles.itemPrice}>${item.montant.toFixed(0)}</Text>
                </View>
              </View>
            ))}
            <View style={styles.orderFooter}>
              <View style={styles.totalPrice}>
                <Text style={styles.totalPriceText}>${order.pricing.net.toFixed(0)}</Text>
              </View>
              <TouchableOpacity onPress={() => goToOrderDetails(order)} style={styles.checkButton}>
                <Text style={styles.checkButtonText}>Voir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    padding: 10,
  },
  orderContainer: {
    marginBottom: 20,
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  imageWrapper: {
    width: 40,
    height: 40,
    borderRadius: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 12,
    fontWeight: "bold",
    color: "gray",
  },
  itemPricing: {
    alignItems: "flex-end",
  },
  itemQuantity: {
    fontWeight: "bold",
  },
  itemPrice: {
    fontWeight: "bold",
  },
  orderFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  totalPrice: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  totalPriceText: {
    fontWeight: "bold",
  },
  checkButton: {
    backgroundColor: "green",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 3,
  },
  checkButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});