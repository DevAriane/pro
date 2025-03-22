import {Image,StyleSheet,Platform,Text,TouchableOpacity,View, TextInput,ScrollView, Button,SafeAreaView, ActivityIndicator, Pressable} from "react-native";
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
import Menu from "./menus";
function Rest() {
  const router = useRouter();
  // const router=useRouter();
  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item) : null;
  const { profile, menus, images, id, address, ratings, restaurantCategories } = item;
  console.log('profile',item);
  console.log('id restaurant',id);
  const { name, description, openingHours } = profile;
  const { street, city } = address;
  const { logo, cover } = images;
  const { averageRating } = ratings;
  const { friday, monday, saturday, thursday, tuesday, wednesday } =
    openingHours;
  const { close, open } = friday;
  console.log('restaurantCategories',restaurantCategories);
const [loading,setLoading]=useState(false);
  console.log("menus", menus);
  const [activeTab, setActiveTab] = useState("resto_cat_1");

  console.log('loading:',loading);
  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.containt}>
        <View style={styles.hidden}>
          <Pressable onPress={()=>{router.back()}}>
          <AntDesign name="left" size={24} color="black" />
          </Pressable>
          <Text style={{backgroundColor:'white',borderColor:'transparent',borderRadius:20,padding:10,width:200,textAlign:"center",fontWeight:'bold'}}>{name}</Text>
          <Pressable onPress={()=>router.push('/fd')}  style={styles.ico}> <AntDesign name="ellipsis1" size={24} color="black" /></Pressable>
         
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
  <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}><Feather name="clock" size={20} color="green" /> <Text>20min</Text></View>
  </View>

       
<View >
  <Text style={styles.plat}>Enjaillez vous dans nos différents menus</Text>
</View>
<ScrollView horizontal={true} >
            <View style={{ margin: 10, display: 'flex',justifyContent:"space-around",flexDirection:"row",width:"100%" }}>
            {restaurantCategories.map((x) => (
  <TouchableOpacity
    key={x.name} // Added a key for efficient list rendering
    onPress={() =>{ setActiveTab(x.id); }}
    style={[
      styles.tabButton,
      activeTab === x.id  && styles.activeTab, // Corrected conditional comparison
    ]}
  >
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <View style={{ width: 35, height: 25 ,margin:5}}>
        <Image
          source={{uri:x.img}}
          style={{
            width: "100%",
            height: "100%",
            borderColor: "transparent",
            borderWidth: 1,
            borderRadius: 40,
            shadowColor: "#00ff00", // Shadow color (green)
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 10,
          }}
          resizeMode="cover"
        />
      </View>

      <View>
        <Text
          style={[
            styles.tabText,
            activeTab === x.id && styles.activeTabText, // Corrected conditional comparison
          ]}
        >
          {x.name}
        </Text>

      </View>
    </View>
  </TouchableOpacity>
))}

           
           </View>
          </ScrollView>

</View>
<Menu menu={menus} cover={cover} city={city} street={street} averageRating={averageRating} id={id} active={activeTab}/>

        </View>

    </SafeAreaView>
  );
}
export default Rest;
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
    color:"gray",
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
  }, activeTab: {
    display:"flex",
    justifyContent:"center",
    marginHorizontal:"auto",
    backgroundColor: 'green', // Fond blanc pour l'onglet actif
  },
  tabButton: {
    padding: 5,
    paddingRight:10,
    borderRadius: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  activeTabText: {
    color: 'white',
     // Couleur du texte vert lorsque l'onglet est actif
  },
  tabText: {
    color: 'gray',
    fontWeight: 'bold',

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
