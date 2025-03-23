import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { useOrders } from "@/contexts/OrderContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { RadioButton } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";

function Fd() {
  // Récupération des paramètres envoyés
  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item) : null;

  const { addToCart, restaurantCartId, clearCart, items, updateQuantity } =
    useCart();
  const {
    imageUrl,
    price,
    customizationOptions,
    restaurantName,
    id,
    description,
    name,
    restaurantId,
  } = item || {};

  const [selectedOption, setSelectedOption] = useState(null);
  const [groupname, setGroup] = useState("");
  const [option, setOption] = useState("");
  const [brightness, setBrightness] = useState(1);
  const [loading, setLoading] = useState(false);
  const [m, setM] = useState(price);
  const [unitPrice, setUnitPrice] = useState(price);
  const [count, setCount] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Initialisation des options par défaut
  const setOptions = () => {
    const defaultOptions: Record<string, any> = {};
    if (customizationOptions) {
      customizationOptions.forEach((element: any) => {
        defaultOptions[element.name] = element.options[0];
      });
    }
    return defaultOptions;
  };

  const [click, setClick] = useState(setOptions);

  useEffect(() => {
    const optionPrice = Object.values(click).reduce(
      (acc, value) => acc + (value?.priceModifier || 0),
      0
    );
    const newPrice = optionPrice + price;
    setUnitPrice(newPrice);
    setM(newPrice * count);
  }, [click, count]);

  useEffect(() => {
    if (item) setM(unitPrice * count);
  }, [count, unitPrice]);

  const { user } = useAuth();

  const add = () => setCount((prev) => prev + 1);
  const subtract = () => setCount((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    const newItems = {
      ...item,
      options: click,
      unitPrice,
      nbre: count,
      montant: m,
      groupe: groupname,
      option,
    };

    if (restaurantCartId && restaurantCartId !== restaurantId) {
      Alert.alert(
        "Panier existant",
        "Votre panier contient des plats d’un autre restaurant. Voulez-vous le vider ?",
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Vider et ajouter",
            onPress: () => {
              const isCleaned = clearCart();
              if (isCleaned) addToCart(newItems, restaurantId);
            },
          },
        ]
      );
    } else {
      let existingItem = items.find((x) => x.id == id);
      if (existingItem) {
        const haveSameOption = deepEqual(
          existingItem.options,
          newItems.options
        );
        if (haveSameOption) {
          updateQuantity(existingItem.id, count + existingItem.nbre);
        } else {
          const newPlat = { ...newItems, id: newItems.id + "_new" };
          addToCart(newPlat, restaurantId);
        }
      } else {
        addToCart(newItems, restaurantId);
      }

      setIsAddedToCart(true);
    }
  };

  function deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;
    if (
      typeof obj1 !== "object" ||
      typeof obj2 !== "object" ||
      obj1 == null ||
      obj2 == null
    ) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;

    return keys1.every((key) => deepEqual(obj1[key], obj2[key]));
  }

  return (
    <SafeAreaView style={[styles.area, { opacity: brightness }]}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.container}>
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: "100%", height: 200, borderBottomRightRadius: 20 }}
            resizeMode="cover"
          />
        )}
        <Pressable
          onPress={() => router.back()}
          style={{ position: "absolute", top: 30, left: 20 }}
        >
          <AntDesign name="leftcircleo" size={24} color="white" />
        </Pressable>

        <ScrollView>
          <View style={{ padding: 15 }}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={{ fontSize: 14}}>
              {restaurantName}
            </Text>

            <View
            style={{
              paddingVertical: 15,
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "start",
              gap: 50
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <AntDesign name="staro" size={20} color="green" />
              <Text>4.7</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={20}
                color="green"
              />
              <Text>free</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Feather name="clock" size={20} color="green" />{" "}
              <Text>20min</Text>
            </View>
          </View>

          <Text style={{ fontSize: 18, color: "gray", lineHeight: 25 }}>
              {description}
            </Text>

            {customizationOptions?.map((x, index) => (
              <View key={index} style={{ marginVertical: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  {x.name} :{" "}
                </Text>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {x.options.map((a, i) => (
                    <View key={i} style={styles.radio}>
                         <Text>{a.name}</Text>
                      <View style={{flexDirection:"row",alignItems:"center"}}>
                      <Text>{a.priceModifier !== 0 && `${a.priceModifier}$`}</Text>
                      <RadioButton
                        value={a.name}
                        status={
                          click[x.name]?.name === a.name
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() => {
                          setClick((prevState) => ({
                            ...prevState,
                            [x.name]: a,
                          }));
                          setGroup(x.name);
                          setOption(a.name);
                        }}
                      />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}

          </View>
        </ScrollView>

        <View style={{ padding: 15 }}>
        
        <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={styles.quantityContainer}>
                <Text style={{ fontWeight: "bold" }}>Quantité :</Text>
                <TouchableOpacity onPress={subtract}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={{ paddingHorizontal: 10 }}>{count}</Text>
                <TouchableOpacity onPress={add}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  color: "green",
                  borderColor: "green",
                  borderWidth: 1,
                  borderRadius: 5,
                  backgroundColor: "white",
                  width: 80,
                  paddingTop: 12,
                  height: 40,
                  textAlign: "center",
                  fontWeight: "800",
                  marginVertical: 2,
                }}
              >
                ${m.toFixed(2)}
              </Text>
            </View>

            <View style={{ marginVertical: 10, gap:10 }}>
              <TouchableOpacity
                onPress={handleAddToCart}
                style={styles.addToCartButton}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Ajouter au panier
                </Text>
              </TouchableOpacity>

              {isAddedToCart && (
                <TouchableOpacity
                  onPress={() => router.push("/cart")}
                  style={[styles.addToCartButton, { backgroundColor: "blue" }]}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Aller au panier
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1 },
  container: { flex: 1 },
  radio: {paddingLeft: 20, flexDirection: "row", alignItems: "center", justifyContent:"space-between" },
  quantityContainer: { flexDirection: "row", alignItems: "center" },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: "green",
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 5,
    backgroundColor: "white",
    textAlign: "center",
  },
  addToCartButton: {
    backgroundColor: "green",
    padding: 10,
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
});

export default Fd;