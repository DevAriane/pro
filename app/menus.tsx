import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StatusBar,
  SafeAreaView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

// Définition des types
interface CustomizationOption {
  // Ajoute ici les propriétés spécifiques aux options de personnalisation si elles sont connues
  [key: string]: any;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  menuCategoryId: string;
  restaurantCategoryId: string;
  customizationOptions?: CustomizationOption[];
}

interface MenuProps {
  menu: MenuItem[];
  cover: string;
  restaurantName: string;
  city: string;
  street: string;
  id: number;
  active: string;
}

const Menu: React.FC<MenuProps> = ({ menu, cover, restaurantName, city, street, id, active }) => {
  const router = useRouter();
  const [filterRestaurant, setFilterRestaurant] = useState<MenuItem[]>(menu);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOrder = (item: MenuItem) => {
    setLoading(true);
    router.push({
      pathname: "/fd",
      params: { item: JSON.stringify({ ...item, restaurantName: restaurantName, restaurantId: id, cov: cover }) },
    });
    setTimeout(() => setLoading(false), 3000);
  };

  useEffect(() => {
    if (active) {
      const filtered = menu.filter((i) => i.restaurantCategoryId === active);
      setFilterRestaurant(filtered);
    }
  }, [active, menu]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="green" barStyle="light-content" />
      <FlatList
        data={filterRestaurant}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Image */}
            <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />

            {/* Infos */}
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{item.name}</Text>

              <Text style={styles.restaurantName} numberOfLines={2}>{item.description}</Text>
              {/* <Text style={styles.restaurantName}>{city} - {street}</Text> */}

              {/* Prix & Bouton */}
              <View style={styles.bottomRow}>
                <Text style={styles.price}>${item.price}</Text>
                <TouchableOpacity style={styles.button} onPress={() => handleOrder(item)} disabled={loading}>
                  <AntDesign name="plus" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>En cours de préparation !!!</Text>}
      />
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    paddingHorizontal: 10,
  },
  row: {
    gap: 15,
    justifyContent: "space-between", // Espace entre les colonnes
   // paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    paddingBottom: 10,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 90,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
    //marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  restaurantName: {
    fontSize: 14,
    color: "gray",
    marginVertical: 4,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    backgroundColor: "orange",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});








// import {Image,StyleSheet,Platform,Text,TouchableOpacity,View, TextInput,ScrollView, Button,StatusBar,SafeAreaView, ActivityIndicator} from "react-native";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import { useEffect, useState } from "react";
// import { useRouter } from "expo-router";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { useAuth } from "@/contexts/AuthContext";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import { Link, useLocalSearchParams, router } from "expo-router";
// import { useRouteInfo, useSearchParams } from "expo-router/build/hooks";
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// function Menu({menu,cover,city,street,averageRating,id,active}){
//     console.log('active',active);
//     const [filterRestaurant,setFilterRestaurant]=useState(menu);
//     const [loading,setLoading]=useState(false);
//     const Direction = (x) => {
//         setLoading(true);
//         router.push({
//           pathname: "/fd",
//           params: { item: JSON.stringify({ ...x, restaurantId: id ,cov:cover}) },
//         });
//         setTimeout(()=>{
//           setLoading(false);
//         },3000);
        
//       };

//  useEffect(()=>{
// if(active){
//   const rest=menu.filter((i)=>i.restaurantCategoryId==active);
//   console.log("rest menu:",rest);
//   setFilterRestaurant(rest);
// }

//   },[active])

//     return(  <SafeAreaView style={styles.area}>
//           <StatusBar backgroundColor='green' style='light' />
//           <ScrollView style={styles.containt} showsVerticalScrollIndicator={false}>
//               {filterRestaurant && filterRestaurant.map((x) => {
//   return (
//     <View
//       key={x.id} // Utilisation d'une clé unique pour chaque élément
//       style={{
//         backgroundColor: "white",
//         alignItems: "center",
//         borderColor: "transparent",
//         borderWidth: 1,
//         borderRadius: 5,
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "space-around",
//         margin: 5,
//         padding: 10, // Ajout de padding pour un meilleur espacement interne
//       }}
//     >
//       <Image
//         source={{ uri:x.imageUrl }}
//         style={{
//           width: 50,
//           height: 50,
//           borderColor: "transparent",
//           borderWidth: 1,
//           borderRadius: 15,
//         }}
//         resizeMode="cover"
//       />

//       <View style={{ flex: 1, marginLeft: 10 }}> {/* Ajustement pour aligner le contenu correctement */}
//         <Text style={{ fontSize: 16, padding: 2 ,fontWeight:'bold'}}>{x.name}</Text>
//         <View
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//           }}
//         >
//           <FontAwesome5 name="map-marker-alt" size={15} color="green" />
//           <Text style={{ color: "gray", padding: 2 }}>
//             {city} {street}
//           </Text>
//         </View>
//         <View
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//           }}
//         >
//           <FontAwesome name="star" size={15} color="yellow" />
//           <Text style={{ color: "gray", padding: 2 }}>{averageRating}</Text>
//         </View>
//       </View>

//       <View>
//         <TouchableOpacity onPress={() => Direction(x)} disabled={loading}>
//           <Text
//             style={{
//               color: "white",
//               borderWidth: 1,
//               borderRadius: 5,
//               backgroundColor: "green",
//               borderColor: "transparent",
//              fontWeight:'bold',
//               padding: 5,
//               textAlign: "center",
//             }}
//           >
//             Commander
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// })}
// {filterRestaurant.length==0  && <Text style={{fontSize:20,fontWeight:"bold",textAlign:"center"}}>En cours de préparation!!!</Text>}
// </ScrollView>
// </SafeAreaView>

//     );
// }
// export default Menu;
// const styles=StyleSheet.create({ area: {
//   flex: 1,

// },
// containt: {

//   flex: 1,
//   backgroundColor: 'whitesmoke',
//   margin:10,
// },});