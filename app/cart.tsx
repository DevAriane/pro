import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  Pressable,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useOrders } from "@/contexts/OrderContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getCurrentAddress } from "@/utils/location";

function Cart() {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null); // Fixed typo: 'adress' -> 'address'
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    restaurantCartId,
  } = useCart();
  const router = useRouter();
  const { createOrder } = useOrders();
  const { user } = useAuth();

  // Calculate total price dynamically
  const totalPrice = items.reduce((acc, item) => acc + item.unitPrice * item.nbre, 0);
  const deliveryFee = 20; // Configurable delivery fee
  const total = totalPrice + deliveryFee;

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true);
        const fetchedAddress = await getCurrentAddress();
        setAddress(fetchedAddress);
      } catch (error) {
        console.error("Failed to fetch address:", error);
        Alert.alert("Error", "Unable to fetch your location.");
      } finally {
        setLoading(false);
      }
    };
    fetchAddress();
  }, []);

  const handleOrder = async () => {
    setLoading(true);
    try {
      if (!address) {
        Alert.alert(
          "Location Required",
          "We need your location to set the delivery address"
        );
        return;
      }

      const orderData = {
        restaurantId: restaurantCartId,
        items: items,
        pricing: {
          subtotal: totalPrice,
          deliveryFee: deliveryFee,
          net: total,
        },
        payment: {
          method: "cash",
          status: "completed",
        },
        delivery: {
          address: address,
          instructions: "Please ring doorbell",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await createOrder(orderData);
      clearCart();

    } catch (error) {
      console.error("Error placing order:", error);
      Alert.alert("Error", "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
       <View style={styles.hidden}>
        <Pressable onPress={() => router.back()} style={{ margin: 10 }}>
          <AntDesign name="left" size={24} color="white" />
        </Pressable>
        <View>
          <Text
            style={{
              marginLeft: 115,
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Panier
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                {Object.entries(item?.options || {}).map(([group, option]) => (
                  <Text style={styles.optionText} key={group}>
                    {group}: <Text style={styles.optionValue}>{option.name}</Text>
                  </Text>
                ))}
                <Text style={styles.itemPrice}>
                  ${(item.unitPrice * item.nbre).toFixed(2)}
                </Text>
              </View>
              <View style={styles.actions}>
                <Pressable
                  onPress={() => removeFromCart(item.id)}
                  accessibilityLabel={`Remove ${item.name}`}
                  style={styles.removeButton}
                >
                  <AntDesign name="closecircle" size={20} color="red" />
                </Pressable>
                <View style={styles.quantityControls}>
                  <Pressable onPress={() => updateQuantity(item.id, item.nbre - 1)}>
                    <AntDesign name="minuscircleo" size={20} color="green" />
                  </Pressable>
                  <Text style={styles.quantity}>{item.nbre}</Text>
                  <Pressable onPress={() => updateQuantity(item.id, item.nbre + 1)}>
                    <AntDesign name="pluscircle" size={20} color="green" />
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Montant à payer</Text>
            <View style={styles.totalRow}>
              <Text style={styles.totalKey}>Subtotal</Text>
              <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalKey}>Frais de livraison</Text>
              <Text style={styles.totalValue}>${deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalKey}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.clearCartButton}
              disabled={loading}
              onPress={() => {
                clearCart();
                router.push("/(tabs)");
              }}
            >
              <MaterialCommunityIcons
                name="delete-forever"
                size={20}
                color="green"
              />
              <Text style={styles.clearCartText}>Vider le panier</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.orderButton}
              disabled={loading}
              onPress={handleOrder}
            >
              {loading && (
                <ActivityIndicator size="small" color="white" style={styles.indicator} />
              )}
              <AntDesign name="plus" size={20} color="white" />
              <Text style={styles.orderButtonText}>Réserver</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Cart;

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    height: 50,
    backgroundColor: "green",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
   // top: 0,
    zIndex: 1,
  },

    hidden: {
    width: "100%",
   
    height: 50,
    backgroundColor: "green",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    marginLeft: 115,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "whitesmoke",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "green",
    padding: 10,
    gap: 10,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontWeight: "bold",
  },
  optionText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "gray",
  },
  optionValue: {
    color: "black",
  },
  itemPrice: {
    fontWeight: "bold",
    fontSize: 16,
  },
  actions: {
    alignItems: "flex-end",
  },
  removeButton: {
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 70,
    marginTop: 10,
  },
  quantity: {
    fontWeight: "bold",
  },
  totalSection: {
    backgroundColor: "white",
    marginTop: 40,
    padding: 10,
  },
  totalLabel: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  totalKey: {
    fontWeight: "bold",
    color: "gray",
  },
  totalValue: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  clearCartButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "green",
    backgroundColor: "white",
    padding: 10,
  },
  clearCartText: {
    color: "green",
    fontWeight: "bold",
    marginLeft: 5,
  },
  orderButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "transparent",
    backgroundColor: "green",
    padding: 10,
  },
  orderButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
  indicator: {
    marginRight: 10,
  },
});