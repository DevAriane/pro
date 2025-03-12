import {Image,StyleSheet,Platform,Text,TouchableOpacity,View, TextInput,ScrollView, Button,SafeAreaView, ActivityIndicator} from "react-native";
import { Link, useLocalSearchParams, router } from "expo-router";
import CheckBox from "@react-native-community/checkbox";
import { StatusBar } from "expo-status-bar";
import Utilisateur from "./utilisateur";
import Livreur from "./livreur";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuth } from "@/contexts/AuthContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouteInfo, useSearchParams } from "expo-router/build/hooks";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
function Category() {
  // const router=useRouter();
  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item) : null;
  const { profile, menus, images, id, address, ratings } = item;
  const { name, description, openingHours } = profile;
  const { street, city } = address;
  const { logo, cover } = images;
  const { averageRating } = ratings;
  const { friday, monday, saturday, thursday, tuesday, wednesday } =
    openingHours;
  const { close, open } = friday;
const [loading,setLoading]=useState(false);
  console.log("menus", menus);

  const Direction = (x) => {
    setLoading(true);
    router.push({
      pathname: "/fd",
      params: { item: JSON.stringify({ ...x, restaurantId: id ,cov:cover}) },
    });
    setTimeout(()=>{
      setLoading(false);
    },3000);
    
  };
  console.log('loading:',loading);
  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.containt}>
        <View style={styles.hidden}>
          <Link href="/(tabs)" style={styles.ico}>
          <AntDesign name="left" size={24} color="black" />
          </Link>
          <Text style={{backgroundColor:'white',borderColor:'transparent',borderRadius:20,padding:10,width:200,textAlign:"center"}}>{name}</Text>
          <Link href='/fd' style={styles.ico}> <AntDesign name="ellipsis1" size={24} color="black" /></Link>
         
        </View>
      
        <View style={{margin:10}}>
        <TouchableOpacity  >
<Image source={{ uri: cover }} style={{ width: "100%", height: 150, borderColor: 'transparent', borderWidth: 1, borderRadius: 25 }} resizeMode="cover" />
</TouchableOpacity> 
<View style={{margin:5,padding:5}}><Text style={{fontSize:18}}>{name}</Text></View>  
  <View style={{margin:5,padding:5}}><Text>{description}</Text></View>

  <View  style={{display:'flex',flexDirection:'row',alignContent:'center',justifyContent:"space-around"}}>
  <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}><AntDesign name="staro" size={20} color="green" /><Text>4.7</Text></View>
  <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}><MaterialCommunityIcons name="truck-delivery-outline" size={20} color="green" /><Text>free</Text></View>
  <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}><Feather name="clock" size={20} color="green" /><Text>20 min</Text></View>
  </View>

       
<View >
  <Text style={styles.plat}>Enjaillez vous dans nos différents menus</Text>
</View>
          {menus.map((x) => {
            return (
              <View
                style={{
                  backgroundColor: "white",
                  alignItems: "center",
                  borderColor: "transparent",
                  borderWidth: 1,
                  borderRadius: 5,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  margin: 5,
                }}
              >
                <Image
                 source={{ uri: cover }} 
                  style={{
                    width: 50,
                    height: 50,
                    borderColor: "transparent",
                    borderWidth: 1,
                    borderRadius: 15,
                    
                  }}
                  resizeMode="cover"
                />

                <View>
                  <Text style={{ fontSize: 16, padding: 2 }}>{x.name}</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <FontAwesome5
                      name="map-marker-alt"
                      size={15}
                      color="green"
                    />
                    <Text style={{ color: "gray", padding: 2 }}>
                      {" "}
                      {city} {street}{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome name="star" size={15} color="yellow" />
                    <Text style={{ color: "gray", padding: 2 }}>
                      {averageRating}
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity onPress={() =>
                  
                    Direction(x)} disabled={loading}>
                    <Text
                      style={{
                        color: "white",
                        borderWidth: 1,
                        borderRadius: 5,
                        backgroundColor: "green",
                        borderColor: "transparent",
                        width: 70,
                        padding: 5,
                        textAlign: "center",
                      }}
                    >
                      Book
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

</View>
        </View>

    </SafeAreaView>
  );
}
export default Category
const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    fontSize: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    height: 40,
    width: 300,
    padding: 5,
    marginHorizontal: "auto",
    margin: 5,
  },
  vet: {
    justifyContent: "space-around",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  plat:{
    margin:5,
    fontWeight:700,
    fontSize:18,
    fontStyle:"italic",
  },
  ico:{
    borderWidth:1,
    borderColor:'transparent',
  backgroundColor:'lightgray',
  borderRadius:50,
padding:3,
 
  },
  area: {
    flex: 1,
  },
  containt: {
    flex: 1,

    backgroundColor: "whitesmoke",
  },
  vie: {
    marginVertical: "auto",
    marginHorizontal: "auto",
  },
  hidden: {
    top: 0,
    marginTop: 20,
    position: "fixed",
    height: 100,
    display: "flex",
    flexDirection: "row",
    color: "white",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
  },
  indicator: { marginLeft: 10 },
  text: {
    height: 40,
    width: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
    color: "white",
    backgroundColor: "green",
    padding: 5,
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: "auto",
    margin: 5,
    fontWeight: 500,
  },
  sign: {
    height: 40,
    width: 300,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
    color: "green",
    backgroundColor: "white",
    padding: 5,
    textAlign: "center",
    marginHorizontal: "auto",
    margin: 5,
  },
  ali: {
    height: 40,
    width: 300,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "white",
    padding: 5,
    textAlign: "center",
    marginHorizontal: "auto",
    margin: 5,
    justifyContent: "center",
    marginVertical: 10,
  },
});
