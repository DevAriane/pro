import {
  Image,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Button,
  Alert,
} from "react-native";
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
// import RangeSlider, { Slider } from 'react-native-range-slider-expo';
function Fd() {
  let somme;
  // récupération des props envoyés
  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item) : null;

  const {
    imageUrl,
    nutritionInfo,
    price,
    customizationOptions,
    id,
    isAvailable,
    isPopular,
    description,
    name,
    restaurantId,
  } = item;
  const { calories, protein, carbohydrates } = nutritionInfo;

  console.log("imageUrl", imageUrl);

  console.log("customizationOption", customizationOptions);

  //calcul du prix et des quantités
  const [m, setM] = useState(null);

  const [loading, setLoading] = useState(false);

  const [count, setCount] = useState(0);
  const add = () => {
    setCount(count + 1);
  };
  const subst = () => {
    setCount(count - 1);
  };

  useEffect(() => {
    console.log("prix", price);
    console.log("count", count);
    console.log("m", m);
    let b = price * count;
    setM(b);
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

  const handleOrder = useCallback(async () => {
    try {
      setLoading(true);

      // Check if delivery address is missing

      const address = await getCurrentAddress();

      console.log('yoyoooooooooooooooooooooooooo', address);

      if (!address) {
        Alert.alert(
          "Location Required",
          "We need your location to set the delivery address"
        );
        return;
      }

      // Update order data with retrieved address
      // orderData = {
      //   ...orderData,
      //   delivery: {
      //     ...orderData.delivery,
      //     address: address,
      //   },
      // };

      const orderData = {
        restaurantId: restaurantId,
        items: {
          itemId: id,
          name: name,
          quantity: count,
          price: price,
        },
        pricing: {
          subtotal: m,
          deliveryFree: 10,
          tax: 5,
          net: m + 10 + 5,
        },
        payement: {
          method: "cash",
          status: "completed",
        },
        delivery: {
          address: { ...address },
          instructions: "Please ring doorbell",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Proceed with order creation
      await createOrder(orderData);
      // Navigate to confirmation screen
      router.push({ pathname: "/(tabs)/reservations" });
    } catch (error) {
      console.log('error',error)
      Alert.alert("Error", "Failed to place order");
    } finally {
      setLoading(false);
    }
  }, []);

  // fonction qui permet de mettre le premier élément d'une radio button par defaut
  const setOptions = () => {
    const defautOptions = {};
    customizationOptions.forEach((element: any) => {
      defautOptions[element.name] = element.options[0].name;
    });

    console.log("defaultOptions : ", defautOptions);

    return defautOptions;
  };

  const [click, setClick] = useState(setOptions());

  const handleRadioPress = (groupName, optionName, priceModifier) => {
    setClick((prevState) => ({
      ...prevState,
      [groupName]: optionName,
    }));

    setM((s) => s + priceModifier);
    console.log("ms", m);
  };
  console.log("click", click);

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.containt}>
        <View
          style={{
            position: "fixed",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: 100,
            backgroundColor: "green",
          }}
        >
          <Link href="/(tabs)">
            {" "}
            <AntDesign name="left" size={24} color="white" />
          </Link>
          <Text
            style={{ color: "white", fontSize: 20, marginHorizontal: "auto" }}
          >
            Food Details
          </Text>
        </View>
        <ScrollView>
          <View>
            <Image
              source={imageUrl}
              style={{ width: 400, height: 200 }}
              resizeMode="cover"
            />
          </View>
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
            <Text>Calories: {calories}</Text>
            <Text>Protein: {protein}</Text>
            <Text>Carbohydrates: {carbohydrates}</Text>
            <Text>Is Available: {isAvailable.toString()}</Text>{" "}
            <Text>Is Popular: {isPopular.toString()}</Text>
            {customizationOptions.map((x, index) => (
              <View key={index}>
                {" "}
                <Text>{x.name}</Text>
                {x.options.map((a, i) => (
                  <View key={i} style={styles.radio}>
                    <RadioButton
                      key={i}
                      value={a.name}
                      status={
                        click[x.name] === a.name ? "checked" : "unchecked"
                      }
                      onPress={() =>
                        handleRadioPress(x.name, a.name, a.priceModifier)
                      }
                      style={styles.radioButton}
                    />
                    <Text>{a.name}</Text>
                  </View>
                ))}{" "}
              </View>
            ))}
          </View>

          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View>
                <Text>Spicy</Text>
              </View>
              <View>
                <Text>Quantity</Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "whitesmoke",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                margin: 8,
                height: 50,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View>
                  {/* <RangeSlider 
                    min={5} max={25}
                         fromValueOnChange={value => setFromValue(value)}
                         toValueOnChange={value => setToValue(value)}
                         initialFromValue={11}
                    />
                    <Text>from value:  {fromValue}</Text>
                    <Text>to value:  {toValue}</Text>
               </View>
               <View>
                    <Slider min={0} max={40} step={4}
                         valueOnChange={value => setValue(value)}
                         initialValue={12}
                         knobColor='red'
                         valueLabelsBackgroundColor='black'
                         inRangeBarColor='purple'
                         outOfRangeBarColor='orange'
                    /> */}
                  {/* <Text>value:  {value}</Text> */}
                </View>
                <View>
                  {" "}
                  <Text style={{ color: "green" }}>Mild</Text>
                </View>
                <View>
                  <Text style={{ color: "red", marginLeft: 30 }}>Hot</Text>
                </View>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
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
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              justifyContent: "space-around",
              margin: 8,
            }}
          >
            <View>
              <Text
                style={{
                  color: "green",
                  borderColor: "green",
                  borderWidth: 1,
                  borderRadius: 5,
                  backgroundColor: "white",
                  width: 80,
                  padding: 5,
                  height: 50,
                  textAlign: "center",
                  fontWeight: "800",
                }}
              >
                ${m}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  handleOrder();
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
                    width: 200,
                    padding: 5,
                    height: 50,
                    textAlign: "center",
                    fontWeight: "800",
                    marginVertical: 2,
                  }}
                >
                  Add to cart{" "}
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
  radio: { display: "flex", flexDirection: "row", alignItems: "center" },
  radioButton: { transform: [{ scale: 0.8 }] },
  area: {
    flex: 1,
  },
  containt: {
    flex: 1,
    justifyContent: "space-between",

    backgroundColor: "white",
  },
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
