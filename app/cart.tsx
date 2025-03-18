import { Image,StyleSheet,Platform,Text,TouchableOpacity,View,TextInput,ScrollView,Button,Alert,ActivityIndicator, Pressable} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useId, useState } from "react";
import { Link, useLocalSearchParams, router } from "expo-router";
import { useRouter } from "expo-router";
import { useOrders } from "@/contexts/OrderContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRestaurants } from "@/contexts/RestaurantContext";
import { RadioButton } from "react-native-paper";
import { getCurrentAddress } from "@/utils/location";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Slider from '@react-native-community/slider';
import { useCart } from "@/contexts/CartContext";
function Cart() {
 
  const [loading, setLoading] = useState(false);
const {items}=useCart();
console.log("items cart",items);
  const router = useRouter();

 

  

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.hidden}>
                    <Pressable onPress={()=>{router.back()}}>
                        <AntDesign name="left" size={24} color="white" />
                    </Pressable>
                    <View>
                        <Text style={{ marginLeft: 120, color: 'white', fontSize: 24 }}>Cart</Text>
                    </View>
                </View>
      <View style={styles.containt}>
    
        {/* <View>
          <Image
            source={{ uri: imageUrl || "https://example.com/default-image.jpg" }}
            style={{ width: 100, height: 100 }}
          />
          <Text>{name}</Text>
          <Text>Quantitées commandées: {quantite}</Text>
          <Text>Prix de ces articles: {prix}$</Text>
          <AntDesign name="closecircle" size={20} color="red" />
        </View>
        <TouchableOpacity disabled={loading} onPress={() => Alert.alert("Booked!")}>
          <Text style={[styles.button, loading && { backgroundColor: "lightgray" }]}>
            {loading ? "Loading..." : "Book"}
          </Text>
        </TouchableOpacity> */}
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
    backgroundColor: "white",
  },
  button: {
    color: "white",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "green",
    borderColor: "transparent",
    width: 70,
    padding: 5,
    textAlign: "center",
  },
  textDefault: {
    fontSize: 16,
    color: "#333",
  },
});
