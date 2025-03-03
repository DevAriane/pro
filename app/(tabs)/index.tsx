import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, ActivityIndicator } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Link, router } from 'expo-router';
import { restaurants } from '@/data/seedData';
import { useRestaurants } from '@/contexts/RestaurantContext';
import { useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function HomeScreen() {


  const arr = [
    { id: 1, image: require('../../assets/images/img1.jpg'), titre: "OKOK SALE ", menu: "Waffle with Berries", prix: 6.50, commentaire: 'Connu sous le nom d"OKOK le plat traditionnel d"origine du peuple  Bassa"a du Littoral ', price: 2000 },
    { id: 2, image: require('../../assets/images/img2.jpg'), titre: "KOKI", menu: "Vanilla Bean Crème Brulée", prix: 7.00, commentaire: 'Connu sous le nom de KOKI le plat traditionnel d"origine du peuple  Bamiléké ', price: 1500 },
    { id: 3, image: require('../../assets/images/img3.jpg'), titre: "KONDRE", menu: "Macaron Mix of Five", prix: 8.00, commentaire: 'Connu sous le nom de KONDRE le plat traditionnel d"origine du peuple Bamiléké ', price: 2000 },
    { id: 4, image: require('../../assets/images/img4.jpg'), titre: "MBONGO TCHOBI", menu: "Classic Tiramisu", prix: 5.50, commentaire: 'Connu sous le nom de MBONGO TCHOBI le plat traditionnel d"origine du peuple  Bassa"a du Littoral ', price: 1500 },
    { id: 5, image: require('../../assets/images/img5.jpg'), titre: "RAPE", menu: "Pistachio Baklavva", prix: 4.00, commentaire: 'Connu sous le nom de KWAKOUKOU le plat traditionnel d"origine du peuple  Bafang ', price: 1500 },
    { id: 6, image: require('../../assets/images/img6.jpg'), titre: "TARO", menu: "Lemon Meringue ", prix: 5.00, commentaire: 'Connu sous le nom de TARO le plat traditionnel d"origine du peuple  Mbouda ', price: 2000 },
    { id: 7, image: require('../../assets/images/img7.jpg'), titre: "SANGHA", menu: "Red Velvet Cake", prix: 4.50, commentaire: 'Connu sous le nom de SANGHA le plat traditionnel d"origine du peuple  Yaoundé ', price: 1000 },
    { id: 8, image: require('../../assets/images/img8.jpg'), titre: "OKOK SUCRE", menu: "Salted Caramel Brownie", prix: 5.50, commentaire: 'Connu sous le nom d"OKOK le plat traditionnel d"origine du peuple  Bassa"a du Littoral ', price: 1500 },
    { id: 9, image: require('../../assets/images/img9.jpg'), titre: "GRILLADE", menu: "Vanilla Panna Cotta", prix: 6.50, commentaire: 'Connu sous le nom de  la BRAISE le plat traditionnel d"origine du peuple  Douala du Littoral ', price: 2000 }
  ];


  const [loading, setLoading] = useState(false);
  const Direction = (x) => {
    console.log("welcome");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    router.push({ pathname: '/restaurant', params: { item: JSON.stringify(x) } });

  }

  const { restaurants } = useRestaurants();

  console.log('restaurants index', restaurants);
  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor='green' style='light' />
      <View style={styles.containt}>
        <View style={styles.header}>
          <AntDesign name="bars" size={24} color="white" />
          <Text style={{ color: 'white', fontSize: 20 }}>Homepage</Text>
          <AntDesign name="bells" size={24} color="white" />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>


          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginHorizontal: 'auto', backgroundColor: 'white', width: 300, justifyContent: 'space-around', borderRadius: 20, borderWidth: 1, borderColor: 'transparent', margin: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign name="search1" size={24} color="gray" />
              <TextInput placeholderTextColor='gray' placeholder='what do you want to eat ?' /></View>
            <AntDesign name="closesquare" size={24} color="gray" />
          </View>

          <View style={styles.day}>
            <View>
              <Text style={{ fontSize: 20 }}>Today New Arivable</Text>
              <Text style={{ color: 'gray' }}>Best the today list update</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'green', borderWidth: 1, borderRadius: 5,  borderColor: 'transparent', width: 70 }}>See oil</Text>
              <AntDesign name="right" size={24} color="green" />
            </View>
          </View>

          <ScrollView style={{paddingTop:30}} horizontal={true}>{
            arr.map((x, i) => {
              return (

                <View key={i} style={{ position: "relative", backgroundColor: 'white', borderWidth: 1, borderRadius: 30, borderColor: 'transparent', margin: 10, display: 'flex',width:150,
                  shadowColor: '#00ff00', // Couleur de l'ombre (vert)
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 10, }}>

<View style={styles.imge}>
  <Image
    source={x.image}
    style={
      { width: '70%', height: '100%', borderColor: 'transparent', borderWidth: 1, borderRadius: 40,  borderColor: 'transparent',
        shadowColor: '#00ff00', // Couleur de l'ombre (vert)
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10, }
    }
    resizeMode="cover"
  />
</View>


                  <View style={{ display: 'flex', alignItems: 'flex-start', padding:10 ,marginTop:120}}>
                    <Text style={{ fontSize: 18 }}>{x.titre}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>   <MaterialCommunityIcons name="pot-steam" size={15} color="green" /><Text style={{ color: 'gray' }} >{x.menu}</Text></View>
                  </View>
                </View>
              )
            })
          }
          </ScrollView>

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 8, borderWidth: 1, borderRadius: 8, borderColor: 'transparent', padding: 5 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Explore Restaurant</Text>
              <Text>Check your city Near by Restaurant</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'green', borderWidth: 1, borderRadius: 5, borderColor: 'transparent', width: 70 }}>See oil</Text>
              <AntDesign name="right" size={24} color="green" />
            </View>
          </View>
          <ScrollView >
            <View>

              {
                restaurants.map((x, i) => {

                  return (

                    <View style={{ margin: 10, }}>

                      <TouchableOpacity onPress={() =>

                        Direction(x)} >
                        <Image source={{ uri: x.images.cover }} style={{ width: "100%", height: 150, borderColor: 'transparent', borderWidth: 1, borderRadius: 25 }} resizeMode="cover" />
                      </TouchableOpacity>

                      <View>
                        <Text style={{ fontSize: 18, padding: 2, fontWeight: "bold" }}>{x.profile.name}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="map-marker-alt" size={15} color="green" /><Text style={{ color: 'gray', padding: 2 }}>{x.address.street},{x.address.city}  </Text>
                          </View>
                          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome name="star" size={15} color="yellow" />
                            <Text style={{ color: 'gray', padding: 2 }}>{x.ratings.averageRating}</Text>
                          </View>
                          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons
                              name="delivery-dining"
                              size={24}
                              color="green"
                            />
                            <Text style={{ color: 'gray', padding: 2 }}>free</Text>
                          </View>
                        </View>

                      </View>

                      <View>
                      </View>

                    </View>

                  )
                })
              }


            </View>


          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  area: {
    flex: 1,

  },
  imge: {
    display: 'flex',
    width: 150,
    height: 150,
    borderRadius: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top:-40,
    zIndex: 1,
  },
  containt: {

    flex: 1,

    justifyContent: 'space-around',

    // borderWidth:1,
    // borderColor:'transparent',
    backgroundColor: 'whitesmoke',
  },
  header: {
    width: '100%',
    position: 'fixed',
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'green',
    color: 'white',
    alignItems: 'center',
  },
  special: {
    height: 150,
    padding: 15,
    margin: 5,
    backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
  },
  day: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,

    padding: 5,

  },
  indicator: { marginLeft: 10 },
  rest: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  glowingBorder: {
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#00ff00', // Couleur de l'ombre (vert)
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  }
  
})
