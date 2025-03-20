import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, Alert, ActivityIndicator, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useId, useState } from "react";
import { Link, useLocalSearchParams, router } from "expo-router";
import { useRouter } from "expo-router";
import { useOrders } from "@/contexts/OrderContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useRestaurants } from "@/contexts/RestaurantContext";
import { RadioButton } from "react-native-paper";
import { getCurrentAddress } from "@/utils/location";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Slider from '@react-native-community/slider';
// import RangeSlider, { Slider } from 'react-native-range-slider-expo';
function Fd() {
  // récupération des props envoyés
  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item) : null;
  const router = useRouter();
  const { addToCart, restaurantCartId, clearCart, items, updateQuantity } = useCart();
  const { imageUrl, nutritionInfo, price, customizationOptions, id, isAvailable, isPopular, description, name, restaurantId, cov, } = item;
  const [selectedOption, setSelectedOption] = useState();
const [groupname,setGroup]=useState();
const [option,setOption]=useState();

  const [brightness, setBrightness] = useState(1);

  const Direction = (x) => {
    console.log("welcome");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    router.push({ pathname: '/cart', params: { item: JSON.stringify({ x: x, quantite: count, prix: m }) } });
  }
  const handleSliderChange = (value) => {
    setBrightness(value);
  };

  //calcul du prix et des quantités

  const [loading, setLoading] = useState(false);
  const [m, setM] = useState(price);
  const [unitPrice, setUnitPrice] = useState(0);
  const [count, setCount] = useState(1);
  const add = () => {
    setCount(count + 1);
  };
  const subst = () => {
    setCount(count - 1);
  };

  useEffect(() => {
    setM(unitPrice * count);
  }, [count]);

  const { createOrder } = useOrders();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log("Utilisateur authentifié", user);
    } else {
      console.log("Aucun utilisateur authentifié");
    }
  }, [user]);

  // fonction qui permet de mettre le premier élément d'une radio button par defaut
  const setOptions = () => {
    const defautOptions = {};
    if (customizationOptions) {
      customizationOptions.forEach((element: any) => {
        defautOptions[element.name] = element.options[0];
      });

    };

    return defautOptions;
  };

  const [click, setClick] = useState(setOptions());
  useEffect(() => {
    const Optionprise = Object.values(click).reduce((acc, value) => { return acc + value.priceModifier }, 0)
    let newPrice = Optionprise + price;
    setUnitPrice(newPrice);

    setM(newPrice * count)
  }, [click]);


  const handleAddToCart = () => {
    const newItems = { ...item, options: click, unitPrice: unitPrice, nbre: count, montant: m ,groupe:groupname,option:option};
    if (restaurantCartId && restaurantCartId !== restaurantId) {
      Alert.alert(
        "Panier existant",
        "Votre panier contient des plats d’un autre restaurant. Voulez-vous le vider ?",
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Vider et ajouter", onPress: () => {
              const isCleaned = clearCart();
              if (isCleaned) addToCart(newItems, restaurantId);
            }
          }
        ]
      );
    }
    else {
      let existingItem = items.find((x) => x.id == id);

      if (existingItem) {
        const haveSameOption = deepEqual(existingItem.options, newItems.options);
        console.log("existingItem:", existingItem);
        console.log("newItems:", newItems);
        console.log("haveSameOption:", haveSameOption);
        if (haveSameOption) {
          updateQuantity(existingItem.id, count + existingItem.nbre);
        }
        else {
          const newPlat = { ...newItems, id: newItems.id + 'new' }
          addToCart(newPlat, restaurantId);
        }
      }
      else {
        addToCart(newItems, restaurantId);
      }
    }
  }
  function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true; // Cas des valeurs primitives
    if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 == null || obj2 == null) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;

    return keys1.every(key => deepEqual(obj1[key], obj2[key]));
  }

  return (
    <SafeAreaView style={[styles.area, { opacity: brightness }]}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.containt}>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: "30%", borderBottomRightRadius: 20, borderWidth: 1, borderColor: "transparent", }}
          resizeMode="cover"
        />
        <View
          style={{
            display: 'flex',
            position: "absolute",
            zIndex: 1,
            margin: 30,
            alignContent: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            width: '80%'
          }}
        >
          <Pressable onPress={() => { router.back() }}>  <AntDesign name="leftcircleo" size={24} color="white" /></Pressable>
          <AntDesign name="heart" size={24} color="white" />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 15 }}>
            <View
              style={{
                display: "flex",
                justifyContent: "flex-start",
                margin: 10,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {description}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "white",
                  width: 300,
                }}
              >
                <FontAwesome name="star" size={15} color="yellow" />
                <FontAwesome name="star" size={15} color="yellow" />
                <FontAwesome name="star" size={15} color="yellow" />
                <FontAwesome name="star" size={15} color="yellow" />
                <FontAwesome name="star-half-full" size={15} color="yellow" />

                <Text style={{ color: "gray" }}>4,5(89 reviews)</Text>
              </View>
              <View>
                <Text
                  style={{ color: "green", fontWeight: "bold", fontSize: 18 }}
                >
                  ${price}
                </Text>
              </View>
            </View>
            <View style={{ margin: 10 }}>
              <Text>Nutritions Informations</Text>
              {customizationOptions && customizationOptions.map((x, index) => (
                <>
                  <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{x.name}</Text>
                  <View key={index} style={styles.radio}>
                    {" "}

                  {x.options.map((a, i) => {
                     console.log(" click ", click);
                     console.log(" [x.name] ", [x.name]);
                     console.log(" x.name ", x.name);
                      console.log(" click[x.name] ", click[x.name]);
                     console.log(" click[x.name].name ", click[x.name].name );
  
                     useEffect(()=>{
                      setGroup( x.name)
                      setOption(click[x.name].name)
                     },[click])
                    return(
                      <View key={i} >
                        <View style={styles.vi}>
                          <RadioButton
                            key={i}
                            value={a.name}
                            status={
                             
                              click[x.name].name === a.name ? "checked" : "unchecked"
                            }
                            onPress={() =>
                              setClick((prevState) => { return { ...prevState, [x.name]: a } })}
                            style={styles.radioButton}
                          />
                          <Text>{a.name}</Text>
                        </View>
                      </View>
                    )})}{" "}
                  </View>
                </>))}


              <View style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",justifyContent:"space-between"}}>
              <View
                  style={{
                    display: "flex",

                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >

                 
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                      width:160,
                      
                      height: 65,
                    }}
                  >
                     <View>
                    <Text style={{ fontWeight: 'bold',margin:3 }}>Quantity:</Text>
                  </View>
                    <View>
                      {" "}
                      <Text
                        style={{
                          fontSize: 20,
                          color: "green",
                          borderWidth: 1,
                          borderColor: "green",
                          borderRadius: 5,
                          width: 30,
                          height: 30,
                          backgroundColor: "white",
                          textAlign: "center",
                        }}
                        onPress={() => subst()}
                      >
                        -
                      </Text>
                    </View>
                    <View>
                      {" "}
                      <Text style={{ fontWeight: "black" }}>{count}</Text>
                    </View>
                    <View>
                      {" "}
                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                          borderWidth: 1,
                          borderColor: "green",
                          borderRadius: 5,
                          width: 30,
                          height: 30,
                          backgroundColor: "green",
                          textAlign: "center",
                        }}
                        onPress={() => add()}
                      >
                        +
                      </Text>
                    </View>
                  </View>
                </View>
              <View>
                  <Text
                    style={{
                      color: "green",
                      borderColor: "green",
                      borderWidth: 1,
                      borderRadius: 5,
                      backgroundColor: "white",
                      width: 80,
                      paddingTop: 12,
                      height: 50,
                      textAlign: "center",
                      fontWeight: "800",
                      marginVertical: 2,
                    }}
                  >
                    ${m.toFixed(0)}
                  </Text>
                </View>
                

               
              </View>
            </View>


            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                justifyContent: "space-around",
                margin: 8,
                width:"100%"
              }}
            >

              
                <TouchableOpacity
                  onPress={() => {

                    handleAddToCart()
                  }}
                  disabled={loading}
                >
                  {" "}
                  <Text
                    style={{
                      color: "white",
                      borderColor: "transparent",
                      borderWidth: 1,
                      borderRadius: 5,
                      backgroundColor: "green",
                      fontWeight: "800",
                      padding:10,
                    }}
                  >
                    {loading && (<ActivityIndicator
                      size="small"
                      color="white"
                      style={styles.indicator}
                    />)}
                    Add to cart{" "}
                  </Text>
                </TouchableOpacity>
              
                <TouchableOpacity
                  onPress={() => router.push('/cart')}
                >
                  {" "}
                  <Text
                    style={{
                      color: "white",
                      borderColor: "transparent",
                      borderWidth: 1,
                      borderRadius: 5,
                      backgroundColor: "blue",
                      fontWeight: "800",
                    padding:10,
                      display: 'flex',
                     
                    }}
                  >
                     cart{" "}
                  </Text>
                </TouchableOpacity>
            </View>
            
          
          </View>
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

export default Fd;
const styles = StyleSheet.create({
  radio: { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'space-around', margin: 3 },
  vi: { display: "flex", alignItems: "center", padding: 5 },
  rad: { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'space-between' },
  ra: { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'space-between' },
  radioButton: { transform: [{ scale: 0.8 }] },
  area: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  slider: {
    width: 150,
    height: 20,
  },
  containt: {
    flex: 1,
    justifyContent: "space-between",

    backgroundColor: "white",

  },
  indicator: { marginLeft: 10 },
  header: {
    width: "100%",
    position: "fixed",
    height: 90,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "green",
    color: "white",
    alignItems: "center",
  },
  gid: {
    display: "flex",
    flexDirection: "row",
  },
});
