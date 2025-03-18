import {Image,StyleSheet,Platform,Text,TouchableOpacity,View, TextInput,ScrollView, Button,StatusBar,SafeAreaView, ActivityIndicator} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuth } from "@/contexts/AuthContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useLocalSearchParams, router } from "expo-router";
import { useRouteInfo, useSearchParams } from "expo-router/build/hooks";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
function Menu({menu,cover,city,street,averageRating,id,active}){
    console.log('active',active);
    const [filterRestaurant,setFilterRestaurant]=useState(menu);
    const [loading,setLoading]=useState(false);
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

 useEffect(()=>{
if(active){
  const rest=menu.filter((i)=>i.restaurantCategoryId==active);
  console.log("rest menu:",rest);
  setFilterRestaurant(rest);
}

  },[active])

    return(  <SafeAreaView style={styles.area}>
          <StatusBar backgroundColor='green' style='light' />
          <ScrollView style={styles.containt} showsVerticalScrollIndicator={false}>
              {filterRestaurant.map((x) => {
  return (
    <View
      key={x.id} // Utilisation d'une clé unique pour chaque élément
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
        padding: 10, // Ajout de padding pour un meilleur espacement interne
      }}
    >
      <Image
        source={{ uri:x.imageUrl }}
        style={{
          width: 50,
          height: 50,
          borderColor: "transparent",
          borderWidth: 1,
          borderRadius: 15,
        }}
        resizeMode="cover"
      />

      <View style={{ flex: 1, marginLeft: 10 }}> {/* Ajustement pour aligner le contenu correctement */}
        <Text style={{ fontSize: 16, padding: 2 }}>{x.name}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="map-marker-alt" size={15} color="green" />
          <Text style={{ color: "gray", padding: 2 }}>
            {city} {street}
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
          <Text style={{ color: "gray", padding: 2 }}>{averageRating}</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={() => Direction(x)} disabled={loading}>
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
})}</ScrollView>
</SafeAreaView>

    );
}
export default Menu;
const styles=StyleSheet.create({ area: {
  flex: 1,

},
containt: {

  flex: 1,
  backgroundColor: 'whitesmoke',
  margin:10,
},});