import {Image,StyleSheet,Platform,Text,TouchableOpacity,View, TextInput,ScrollView, Button,SafeAreaView,FlatList, ActivityIndicator} from "react-native";
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
function Resistance({b}){
    return (
        <SafeAreaView style={styles.area}>
          <StatusBar backgroundColor="green" style="light" />
          <View style={styles.containt}>
          
            {b.map((x)=>{return(
                     <View style={{margin:10}}>
                         <View >
               <Text style={styles.plat}>Plats principaux</Text>
             </View>
                     <TouchableOpacity  >
             <Image source={x.img} style={{ width: "100%", height: 150, borderColor: 'transparent', borderWidth: 1, borderRadius: 25 ,margin:5}} resizeMode="cover" />
             </TouchableOpacity> 
               <View  style={{display:'flex',flexDirection:'row',alignContent:'center',justifyContent:"space-around",margin:5}}>
               <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}><AntDesign name="staro" size={20} color="green" /><Text>4.7</Text></View>
               <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}><MaterialCommunityIcons name="truck-delivery-outline" size={20} color="green" /><Text>free</Text></View>
               <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}><Feather name="clock" size={20} color="green" /><Text>20 min</Text></View>
               </View>
             
                    
            
             <View><Text style={{ fontSize: 18,textAlign:"center" ,fontWeight:"bold",fontStyle:"italic",fontFamily:"",color:"gray",margin:5}}>Vos grillades</Text></View>
             <FlatList
  data={x.grillade}
  renderItem={({ item }) => (
    <View
      style={{
        flex: 1,
        aspectRatio: 1, // Maintient un carré pour chaque élément
        margin: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'space-around',
        padding: 5,
      }}
    >
      <Image
        source={item.image}
        style={{
          width: 70,
          height: 70,
          borderRadius: 15,
        }}
        resizeMode="cover"
      />
      <View
        style={{
          alignItems: 'center',
          marginTop: 5,
        }}
      >
        <Text style={{ fontSize: 16, padding: 2 }}>{item.titre}</Text>
        <Text style={{ color: 'gray', padding: 2 }}>Price: ${item.price}</Text>
      </View>
    </View>
  )}
  keyExtractor={(item) => item.key}
  numColumns={2}
  contentContainerStyle={{
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
  }}
/>

<View>
  <Text
    style={{
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold',
      fontStyle: 'italic',
      color: 'gray',
      margin: 5,
    }}
  >
    Vos repas
  </Text>
</View>

<FlatList
  data={x.repas}
  renderItem={({ item }) => (
    <View
      style={{
        flex: 1,
        aspectRatio: 1, // Pour un affichage carré
        margin: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'space-around',
        padding: 5,
      }}
    >
      <Image
        source={item.image}
        style={{
          width: 70,
          height: 70,
          borderRadius: 15,
        }}
        resizeMode="cover"
      />
      <View
        style={{
          alignItems: 'center',
          marginTop: 5,
        }}
      >
        <Text style={{ fontSize: 16, padding: 2 }}>{item.titre}</Text>
        <Text style={{ color: 'gray', padding: 2 }}>Price: ${item.price}</Text>
      </View>
    </View>
  )}
  keyExtractor={(item) => item.key}
  numColumns={2}
  contentContainerStyle={{
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
  }}
/>

  <View><Text style={{ fontSize: 18,textAlign:"center" ,fontWeight:"bold",fontStyle:"italic",fontFamily:"",color:"gray",margin:5}}>Vos accompagnements</Text></View>
  <FlatList
  data={x.accompagnement}
  renderItem={({ item }) => (
    <View
      style={{
        flex: 1,
        aspectRatio: 1, // Pour un affichage carré
        margin: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'space-around',
        padding: 5,
      }}
    >
      <Image
        source={item.image}
        style={{
          width: 70,
          height: 70,
          borderRadius: 15,
        }}
        resizeMode="cover"
      />
      <View
        style={{
          alignItems: 'center',
          marginTop: 5,
        }}
      >
        <Text style={{ fontSize: 16, padding: 2 }}>{item.titre}</Text>
        <Text style={{ color: 'gray', padding: 2 }}>Price: ${item.price}</Text>
      </View>
    </View>
  )}
  keyExtractor={(item) => item.key}
  numColumns={2}
  contentContainerStyle={{
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
  }}
/>


                  
             </View>
            )})}
          
     
            </View>
    
        </SafeAreaView>
      );
}
export default Resistance;

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
  