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
import { users } from "@/data/seedData";

function Cart() {
  const [loading, setLoading] = useState(false);
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart,restaurantCartId } = useCart();
  const router = useRouter();
  const { createOrder } = useOrders();
  const [total, setTotal] = useState(0);
  const [adress,setAdress]=useState(null);
  console.log("adress",adress);
  console.log("items cart", items);
const {user}=useAuth()
  let totalPrice = items.reduce((acc, value) => { return acc + value.unitPrice * value.nbre }, 0);
  let free = 20;
  useEffect(() => {
    setTotal(totalPrice + free);
  }, [totalPrice])
  useEffect(()=>{
    const getAddress=async()=>{
      const address = await getCurrentAddress();
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      setAdress(address);
    }
   
   getAddress();
  },[]);
  const handleOrder = async () => {
    setLoading(true);
    try {
      // Check if delivery address is missing
      if (!adress) {
        Alert.alert(
          "Location Required",
          "We need your location to set the delivery address"
        );
        return;
      }

      const orderData = {

        restaurantId: restaurantCartId,
        items:items,
      

        pricing: {
          subtotal:totalPrice,
          deliveryFree:free,
          net:total,
        },
        payement: {
          method: "cash",
          status: "completed",
        },
        delivery: {
          address: adress ,
          instructions: "Please ring doorbell",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };


      // Proceed with order creation
      await createOrder(orderData);
      // Navigate to confirmation screen
      clearCart();
      

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
        <Pressable onPress={() => router.back()} style={{ margin: 10 }}>
          <AntDesign name="left" size={24} color="white" />
        </Pressable>
        <View>
          <Text style={{ marginLeft: 115, color: 'white', fontSize: 20,fontWeight:'bold' }}>Carte</Text>
        </View>
      </View>

      <View style={styles.containt}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%", flex: 1, }}>
          {items.map((x, i) => {



            return (

              <View

                style={styles.items}
              >
                <View style={{ width: 60, height: 60, borderRadius: 10, overflow: "hidden" }}>
                  <Image
                    source={{ uri: x.imageUrl }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "bold" }}>{x.name}</Text>
                  {x?.options && <Text style={{ fontWeight: "bold", fontSize: 12, color: "gray" }}>{x.groupe} :<Text style={{ color: "black" }}>{x.option}</Text></Text>}
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>${x.unitPrice.toFixed(2) * x.nbre}</Text>


                </View>
                <View>
                  {/* Croix rouge en haut */}
                  <Pressable
                    onPress={() => removeFromCart(x.id)}
                    style={{
                      display: "flex",
                      padding: 5,
                      alignItems: "flex-end",
                      marginBottom: 10, // Espacement entre les sections
                    }}
                  >
                    <AntDesign name="closecircle" size={20} color="red" />
                  </Pressable>

                  {/* Section des quantités à modifier */}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      width: 70,
                      marginTop: 10,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        updateQuantity(x.id, x.nbre - 1);
                      }}
                    >
                      <AntDesign name="minuscircleo" size={20} color="green" />
                    </Pressable>

                    <Text>{x.nbre}</Text>

                    <Pressable
                      onPress={() => {
                        updateQuantity(x.id, x.nbre + 1);
                      }}
                    >
                      <AntDesign name="pluscircle" size={20} color="green" />
                    </Pressable>
                  </View>
                </View>
              </View>


            );
          })}

          <View style={{ backgroundColor: "white", marginTop: 40 }}>
            <View style={{ margin: 10 }}>
              <Text style={{ margin: 4, fontWeight: "bold" }}>Montant à payer</Text>
              {/* <View style={{ borderWidth: 1, borderRadius: 10, borderColor: "transparent", padding: 10, margin: 5, backgroundColor: "gray" }}><Text>{}</Text></View> */}
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: 4 }}><Text style={{ fontWeight: "bold",  color: "gray" }}>Subtotal</Text><Text style={{ fontWeight: "bold",  }}>${totalPrice.toFixed(2)}</Text></View>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: 4 }}><Text style={{ fontWeight: "bold", fontSize: 12, color: "gray" }}>Frais de livraison</Text><Text style={{ fontWeight: "bold", }}>${free}</Text></View>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: 4 }}> <Text style={{ fontWeight: "bold", fontSize: 12, color: "gray" }}>Total</Text><Text style={{ fontWeight: "bold", }}>${total.toFixed(2)}</Text></View>
            </View>
          </View>

          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignContent: 'center' }}>
            <TouchableOpacity style={styles.fod} disabled={loading} onPress={() => { clearCart(), router.push('/(tabs)') }}>
              <Text style={{ color: "green", fontWeight: "bold", textAlign: "center", }}>
                <MaterialCommunityIcons name="delete-forever" size={20} color="green" />
                Vider la carte
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.food} disabled={loading} onPress={() => { getCartTotal(), handleOrder() }} >
              <AntDesign name="plus" size={20} color="white" />
              <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
                {loading && (<ActivityIndicator
                  size="small"
                  color="white"
                  style={styles.indicator}
                />)}
                Réserver
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View>

        </View>
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
    justifyContent: "space-between",
    margin: 5,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "green",
    padding: 10,
    gap: 10,
    width: "100%",
    overflow: "hidden",

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
