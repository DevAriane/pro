import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, Alert, ActivityIndicator, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useOrders } from "@/contexts/OrderContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useRestaurants } from "@/contexts/RestaurantContext";
import { RadioButton } from "react-native-paper";
import { getCurrentAddress } from "@/utils/location";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

function Cart() {
  const [loading, setLoading] = useState(false);
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const { createOrder } = useOrders();
  console.log("items cart", items);
 
  const handleOrder = async () => {
    setLoading(true);
    try {
      // Check if delivery address is missing

      const address = await getCurrentAddress();
      setTimeout(() => {
        setLoading(false);
      }, 3000);



      if (!address) {
        Alert.alert(
          "Location Required",
          "We need your location to set the delivery address"
        );
        return;
      }




      // Proceed with order creation
      await createOrder(items);
      // Navigate to confirmation screen
      clearCart();
      router.push({ pathname: "/(tabs)/reservations" });

    } catch (error) {
      console.log('error', error)
      Alert.alert("Error", "Failed to place order");
    } finally {

    }
  }

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.hidden}>
        <Pressable onPress={() => router.back()} style={{margin:10}}>
          <AntDesign name="left" size={24} color="white" />
        </Pressable>
        <View>
          <Text style={{marginLeft:115, color: 'white', fontSize: 24 }}>Cart</Text>
        </View>
      </View>

      <View style={styles.containt}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {items.map((x, i) => {
          console.log(" x.options ", x.options);
           console.log(" [x.name] ", [x.name]);
          console.log(" x.name ", x.name);
          console.log("Object.keys(x.options)",Object.keys(x.options));
          console.log("Object.values(x.options)",Object.values(x.options));
          console.log("Object.values(x.options).name",Object.values(x.options).find(item => item == "Petite"));
            return (
              <View key={x.id} style={styles.items}>
                <View style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden' }}>
                  <Image
                    source={{ uri: x.imageUrl }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                </View>
                <View >
                  <Text style={{ fontWeight: "bold" }}>{x.name}</Text>
                  <Text style={{ fontWeight: "bold" }}>x{x.nbre}</Text>
                  <Text style={{ fontWeight: "bold" }}>${x.unitPrice.toFixed(0) * x.nbre}</Text>
                {x?.options && <Text style={{ fontWeight: "bold" }}>{x.groupe} : {x.option}</Text>}

                </View>
                <View style={{display:"flex",flexDirection:"column",alignItems:'flex-end',justifyContent:"space-around",height:90}} >
                <Pressable onPress={() => removeFromCart(x.id)}>
                  <AntDesign name="closecircle" size={20} color="red" />
                </Pressable>
                <View style={{ display: "flex", flexDirection: "row", margin: 10, justifyContent: "space-around", width: 70 }}>
                    <Pressable
                      onPress={() => {
                        updateQuantity(x.id, x.nbre-1); // Update quantity in the cart context
                      }}
                    >
                      <AntDesign name="minuscircleo" size={20} color="green" />
                    </Pressable>

                    <Text>{x.nbre}</Text>

                    <Pressable
                      onPress={() => {
                       
                        updateQuantity(x.id, x.nbre+1); // Update quantity in the cart context
                      }}
                    >
                      <AntDesign name="pluscircle" size={20} color="green" />
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignContent: 'center' }}>
            <TouchableOpacity style={styles.fod} disabled={loading} onPress={() =>{ clearCart() , router.push('/(tabs)')}}>
              <Text style={{ color: "green", fontWeight: "bold", textAlign: "center", }}>
                <MaterialCommunityIcons name="delete-forever" size={20} color="green" />
                Clear cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.food} disabled={loading} onPress={() => { getCartTotal(), handleOrder() }} >
              <AntDesign name="plus" size={20} color="white" />
              <Text style={{ color: "white", fontWeight: "bold", textAlign: "center"}}>
                  {loading && (<ActivityIndicator
                                      size="small"
                                      color="white"
                                      style={styles.indicator}
                                    />)}
                Add food
              </Text>
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
  hidden: {
    width: '100%',
    top: 0,
    position: 'fixed',
    height: 50,
    backgroundColor: 'green',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containt: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "whitesmoke",
  },
  button: {
    color: "white",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "green",
    borderColor: "transparent",
    padding: 5,
    textAlign: "center",
  },
  textDefault: {
    fontSize: 16,
    color: "#333",
  },
  items: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  indicator: { marginLeft: 10 },
  food: {
    display: 'flex',
    flexDirection: "row",
    alignItems: "center",
    color: "white",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "green",
    borderColor: "white",
    padding: 10,
    margin: 10,
    width: 120,
    justifyContent: "space-around",
  },
  fod: {
    display: 'flex',
    flexDirection: "row",
    alignItems: "center",
    color: "white",
    borderWidth: 1,
    borderRadius: 5,

    backgroundColor: "white",
    borderColor: "green",
    padding: 10,
    margin: 10,
    width: 120,
    justifyContent: "space-around",
  }
});
