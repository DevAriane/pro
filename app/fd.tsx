import { Image,StyleSheet,Platform,Text,TouchableOpacity,View,TextInput,ScrollView,Button,Alert,ActivityIndicator} from "react-native";
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
// import RangeSlider, { Slider } from 'react-native-range-slider-expo';
function Fd() {
  // récupération des props envoyés
  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item) : null;

  const {imageUrl,nutritionInfo,price,customizationOptions,id,isAvailable,isPopular,description,name,restaurantId,cov} = item;
  const { calories, protein, carbohydrates } = nutritionInfo;

  
    const [brightness, setBrightness] = useState(1);
  
    const handleSliderChange = (value) => {
      setBrightness(value);
    };

  //calcul du prix et des quantités
 
  const [loading, setLoading] = useState(false);
  const [m, setM] = useState(0);
  const [count, setCount] = useState(0);
  const add = () => {
    setCount(count + 1);
  };
  const subst = () => {
    setCount(count - 1);
  };

  useEffect(() => {
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


  const handleOrder = async () => {
    setLoading(true);
    try {
      // Check if delivery address is missing

      const address = await getCurrentAddress();
      setTimeout(()=>{
        setLoading(false);
      },3000);

     

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
          img:cov,
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
      console.log('error', error)
      Alert.alert("Error", "Failed to place order");
    } finally {
     
    }
  }

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
    <SafeAreaView style={[styles.area, {opacity: brightness}] }>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.containt}>
  <Image
    source={{ uri: cov }} 
    style={{ width:"100%", height:"30%" ,borderRadius:20,borderWidth:1,borderColor:"transparent",}}
    resizeMode="cover"
  />
  <View
  style={{
    display:'flex',
    position:"absolute",
    zIndex:1,
    margin:30,
    alignContent:"center",
    flexDirection:"row",
    justifyContent:"space-between",
    width:'80%'
  }}
  >  
<Link href="/restaurant">  <AntDesign name="leftcircleo" size={24} color="white" /></Link>
  <SimpleLineIcons name="heart" size={24} color="white" />
   </View>
<ScrollView showsVerticalScrollIndicator={false}>
<View  style={{padding:15}}>
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
              <>
              <Text style={{fontWeight:'bold',fontSize:18}}>{x.name}</Text>
              <View key={index} style={styles.radio}>
                {" "}
                
                {x.options.map((a, i) => (
                  <View key={i} >
                    <View style={styles.vi}>
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
                  </View>
                ))}{" "}
              </View>
              </>))}
              
          </View>

          <View style={styles.ra}>
            <View
              style={{
                display: "flex",
               
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View>
                <Text style={{fontWeight:'bold'}}>Spicy</Text>
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
                 
                  alignItems: "center",
                }}
              >
         

                <View >
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={brightness}
        onValueChange={handleSliderChange}
      />
    </View>
    <View style={styles.rad}>
                <View>
                  <Text style={{ color: "green" }}>Mild</Text>
                </View>
                <View>
                  <Text style={{ color: "red", marginLeft: 30 }}>Hot</Text>
                </View>
                </View>
              </View>

          
            </View>
            </View>
            <View
              style={{
                display: "flex",
              
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
             
              <View>
                <Text style={{fontWeight:'bold'}}>Quantity</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width:100,
                  height:65,
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
                  paddingTop:12,
                  height: 50,
                  textAlign: "center",
                  fontWeight: "800",
                  marginVertical: 2,
                }}
              >
                ${m.toFixed(0)}
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
                    paddingTop: 12,
                    height: 50,
                    textAlign: "center",
                    fontWeight: "800",
                    marginVertical: 'auto',
                    display:'flex',
                    alignItems:"center",
                    alignContent:'center',
                  }}
                >
                  Add to cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
        </ScrollView>
       
      </View>
    </SafeAreaView>
  );
}

export default Fd;
const styles = StyleSheet.create({
  radio: { display: "flex", flexDirection: "row", alignItems: "center",justifyContent:'space-around' ,margin:3},
  vi:{display: "flex",  alignItems: "center",padding:5},
  rad:{display: "flex", flexDirection: "row", alignItems: "center",justifyContent:'space-between' },
  ra:{display: "flex", flexDirection: "row", alignItems: "center",justifyContent:'space-between'},
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
