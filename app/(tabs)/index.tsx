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
import All from '../all';
import Entree from '../entree';
import Resistance from '../resistance';
import Dessert from '../dessert';
import Boisson from '../boisson';
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
  const category = [
  { id: 1, image: require('../../assets/images/img13.jpg'),categorie:"ENTREES",froide:[{nom:"salade"},{nom:"tartares"}],chaude:[{nom:"soupe"},{nom:"gratins"}]},
    { id: 2, image: require('../../assets/images/img24.jpg'),categorie:"PLAT PRINCIPAUX" , grillade:[ { id: 9, image: require('../../assets/images/img9.jpg'), titre: "GRILLADE", menu: "Vanilla Panna Cotta", prix: 6.50, commentaire: 'Connu sous le nom de  la BRAISE le plat traditionnel d"origine du peuple  Douala du Littoral ', price: 2000}],accompagnement:[{}],repas:[ { id: 1, image: require('../../assets/images/img1.jpg'), titre: "OKOK SALE ", menu: "Waffle with Berries", prix: 6.50, commentaire: 'Connu sous le nom d"OKOK le plat traditionnel d"origine du peuple  Bassa"a du Littoral ', price: 2000 },
      { id: 2, image: require('../../assets/images/img2.jpg'), titre: "KOKI", menu: "Vanilla Bean Crème Brulée", prix: 7.00, commentaire: 'Connu sous le nom de KOKI le plat traditionnel d"origine du peuple  Bamiléké ', price: 1500 },
      { id: 3, image: require('../../assets/images/img3.jpg'), titre: "KONDRE", menu: "Macaron Mix of Five", prix: 8.00, commentaire: 'Connu sous le nom de KONDRE le plat traditionnel d"origine du peuple Bamiléké ', price: 2000 },
      { id: 4, image: require('../../assets/images/img4.jpg'), titre: "MBONGO TCHOBI", menu: "Classic Tiramisu", prix: 5.50, commentaire: 'Connu sous le nom de MBONGO TCHOBI le plat traditionnel d"origine du peuple  Bassa"a du Littoral ', price: 1500 },
      { id: 5, image: require('../../assets/images/img5.jpg'), titre: "RAPE", menu: "Pistachio Baklavva", prix: 4.00, commentaire: 'Connu sous le nom de KWAKOUKOU le plat traditionnel d"origine du peuple  Bafang ', price: 1500 },
      { id: 6, image: require('../../assets/images/img6.jpg'), titre: "TARO", menu: "Lemon Meringue ", prix: 5.00, commentaire: 'Connu sous le nom de TARO le plat traditionnel d"origine du peuple  Mbouda ', price: 2000 },
      { id: 7, image: require('../../assets/images/img7.jpg'), titre: "SANGHA", menu: "Red Velvet Cake", prix: 4.50, commentaire: 'Connu sous le nom de SANGHA le plat traditionnel d"origine du peuple  Yaoundé ', price: 1000 },
      { id: 8, image: require('../../assets/images/img8.jpg'), titre: "OKOK SUCRE", menu: "Salted Caramel Brownie", prix: 5.50, commentaire: 'Connu sous le nom d"OKOK le plat traditionnel d"origine du peuple  Bassa"a du Littoral ', price: 1500 },]},
    { id: 3, image: require('../../assets/images/img26.jpg'),categorie:"DESSERTS",gateau:[{}],fruits:[{}]},
    { id: 4, image: require('../../assets/images/img43.jpg'),categorie:"BOISSON" ,nonalcool:[{nom:"eau"},{nom:"jus de fruit"},{nom:"sodas"},{nom:"cafe"},{nom:"the"}]},
  ];

const entree=[{img:require('../../assets/images/img13.jpg'),froide:[{nom:"Choux verte",image: require('../../assets/images/img11.jpg'), price:4,},
  {nom:"Salade de fruits",image: require('../../assets/images/img12.jpg'), price:5,},
  {nom:"Legumes ",image: require('../../assets/images/img17.jpg'), price:6,},
  {nom:"Tartares",image: require('../../assets/images/img14.jpg'),price:7},],
chaude:[{nom:"Soupe de poisson",image: require('../../assets/images/img16.jpg'), price:9,},
  {nom:"Soupe gluten",image: require('../../assets/images/img15.jpg'), price:10,},
]},];
  const resistance=[ { img:require('../../assets/images/img24.jpg'),
    grillade:[ 
      { id: 0, image: require('../../assets/images/img9.jpg'), titre: "Poulet braise", price: 15},
      { id: 1, image: require('../../assets/images/img41.jpg'), titre: "Poisson braise", price: 13},
      { id: 2, image: require('../../assets/images/img44.jpg'), titre: "Steak", price: 14},
      { id: 3, image: require('../../assets/images/img45.jpg'), titre: "Brochette", price: 20},
    ],
  accompagnement:[    { id: 9, image: require('../../assets/images/img46.jpg'), titre: "Riz vapeur", price: 3},
    
    { id: 2, image: require('../../assets/images/img48.jpg'), titre: "Frite de plantain", price: 7},
  ],
  repas:[ { id: 1, image: require('../../assets/images/img1.jpg'), titre: "OKOK SALE ",  price: 2000 },
    { id: 2, image: require('../../assets/images/img2.jpg'), titre: "KOKI",  price: 1500 },
    { id: 3, image: require('../../assets/images/img3.jpg'), titre: "KONDRE",price: 2000 },
    { id: 4, image: require('../../assets/images/img4.jpg'), titre: "MBONGO TCHOBI", price: 1500 },
    { id: 5, image: require('../../assets/images/img5.jpg'), titre: "RAPE", price: 1500 },
    { id: 6, image: require('../../assets/images/img6.jpg'), titre: "TARO", price: 2000 },
    { id: 7, image: require('../../assets/images/img7.jpg'), titre: "SANGHA",price: 1000 },
    { id: 8, image: require('../../assets/images/img8.jpg'), titre: "OKOK SUCRE", price: 1500 },]}];
  const dessert=[{img:require('../../assets/images/img26.jpg'),
    gateau:[  { id: 0, image: require('../../assets/images/img30.jpg'), titre: "Gateau fraise",  price: 22 },
      { id: 1, image: require('../../assets/images/img49.jpg'), titre: "Gateau mabre",  price: 20 },
     
    ],
    fruits:[{ id: 0, image: require('../../assets/images/img54.jpg'), titre: "Fraise",  price: 11 },
      { id: 1, image: require('../../assets/images/img52.jpg'), titre: "Argrume",  price: 12 },
   
    ],
    amuse:[{ id: 0, image: require('../../assets/images/img25.jpg'), titre: "Dornut mabre",  price: 16 },
      { id: 1, image: require('../../assets/images/img28.jpg'), titre: "Les sable",  price: 22 },
   
    ]}];
const boisson=[{img:require('../../assets/images/img42.jpg'),
  nonalcool:[
    { id: 0, image: require('../../assets/images/img36.jpg'), titre: "Eau",  price: 5 },
    { id: 1, image: require('../../assets/images/img35.jpg'), titre: "Cafe",  price: 8 },
    { id: 2, image: require('../../assets/images/img34.jpg'), titre: "Jus de fruit",  price: 7 },
    { id: 3, image: require('../../assets/images/img38.jpg'), titre: "The",  price: 10 },
  ],
alcool:[  { id: 0, image: require('../../assets/images/img37.jpg'), titre: "Biere",  price: 15 },
  { id: 1, image: require('../../assets/images/img43.jpg'), titre: "Vin",  price: 20 },
]
}];

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
   const [activeTab, setActiveTab] = useState('All');
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

          <ScrollView style={{paddingTop:40}} horizontal={true}>
          <TouchableOpacity  onPress={() => setActiveTab('All')}  style={{ position: "relative", backgroundColor: 'white', borderWidth: 1, borderRadius: 30, borderColor: 'transparent', margin: 10, display: 'flex',width:150,
                  shadowColor: '#00ff00', // Couleur de l'ombre (vert)
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 10, }}>

<View style={styles.imge}>

  <Image
    source={require('../../assets/images/img55.jpg')}
    style={
      { width: '70%', height: '100%', borderColor: 'transparent', borderWidth: 1, borderRadius: 40,
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


                  <View style={{ padding:3 ,marginTop:90}}>
                    <Text style={{ fontSize: 18,textAlign:"center" ,fontWeight:"bold",fontStyle:"italic",fontFamily:""}}>RESTAURANTS</Text>
                    {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>   <MaterialCommunityIcons name="pot-steam" size={15} color="green" /><Text style={{ color: 'gray' }} >{x.menu}</Text></View> */}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Entree')}  style={{ position: "relative", backgroundColor: 'white', borderWidth: 1, borderRadius: 30, borderColor: 'transparent', margin: 10, display: 'flex',width:150,
                  shadowColor: '#00ff00', // Couleur de l'ombre (vert)
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 10, }}>

<View style={styles.imge}>

  <Image
    source={require('../../assets/images/img13.jpg')}
    style={
      { width: '70%', height: '100%', borderColor: 'transparent', borderWidth: 1, borderRadius: 40,
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


                  <View style={{ padding:3 ,marginTop:90}}>
                    <Text style={{ fontSize: 18,textAlign:"center" ,fontWeight:"bold",fontStyle:"italic",fontFamily:""}}>ENTREES</Text>
                    {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>   <MaterialCommunityIcons name="pot-steam" size={15} color="green" /><Text style={{ color: 'gray' }} >{x.menu}</Text></View> */}
                  </View>
                </TouchableOpacity>
                 <TouchableOpacity  onPress={() => setActiveTab('Resistance')}  style={{ position: "relative", backgroundColor: 'white', borderWidth: 1, borderRadius: 30, borderColor: 'transparent', margin: 10, display: 'flex',width:150,
                  shadowColor: '#00ff00', // Couleur de l'ombre (vert)
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 10, }}>


<View style={styles.imge}>

  <Image
    source={require('../../assets/images/img24.jpg')}
    style={
      { width: '70%', height: '100%', borderColor: 'transparent', borderWidth: 1, borderRadius: 40,
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



                  <View style={{ padding:3 ,marginTop:90}}>
                    <Text style={{ fontSize: 18,textAlign:"center" ,fontWeight:"bold",fontStyle:"italic",fontFamily:""}}>PLAT PRINCIPAUX</Text>
                    {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>   <MaterialCommunityIcons name="pot-steam" size={15} color="green" /><Text style={{ color: 'gray' }} >{x.menu}</Text></View> */}
                  </View>
                </TouchableOpacity>
                 <TouchableOpacity onPress={() => setActiveTab('Dessert')}  style={{ position: "relative", backgroundColor: 'white', borderWidth: 1, borderRadius: 30, borderColor: 'transparent', margin: 10, display: 'flex',width:150,
                  shadowColor: '#00ff00', // Couleur de l'ombre (vert)
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 10, }}>

<View style={styles.imge}>

  <Image
    source={require('../../assets/images/img26.jpg')}
    style={
      { width: '70%', height: '100%', borderColor: 'transparent', borderWidth: 1, borderRadius: 40,
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


                  <View style={{ padding:3 ,marginTop:90}}>
                    <Text style={{ fontSize: 18,textAlign:"center" ,fontWeight:"bold",fontStyle:"italic",fontFamily:""}}>DESSERTS</Text>
                    {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>   <MaterialCommunityIcons name="pot-steam" size={15} color="green" /><Text style={{ color: 'gray' }} >{x.menu}</Text></View> */}
                  </View>
                </TouchableOpacity>
                 <TouchableOpacity onPress={() => setActiveTab('Boisson')}   style={{ position: "relative", backgroundColor: 'white', borderWidth: 1, borderRadius: 30, borderColor: 'transparent', margin: 10, display: 'flex',width:150,
                  shadowColor: '#00ff00', // Couleur de l'ombre (vert)
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 10, }}>


<View style={styles.imge}>
  <Image
    source={require('../../assets/images/img43.jpg')}
    style={
      { width: '70%', height: '100%', borderColor: 'transparent', borderWidth: 1, borderRadius: 40,
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


                  <View style={{ padding:3 ,marginTop:90}}>
                    <Text style={{ fontSize: 18,textAlign:"center" ,fontWeight:"bold",fontStyle:"italic",fontFamily:""}}>BOISSONS</Text>
                    {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>   <MaterialCommunityIcons name="pot-steam" size={15} color="green" /><Text style={{ color: 'gray' }} >{x.menu}</Text></View> */}
                  </View>
                </TouchableOpacity>
           
          </ScrollView>

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 4, borderWidth: 1, borderRadius: 8, borderColor: 'transparent', padding: 5 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Explore Restaurant</Text>
              <Text>Check your city Near by Restaurant</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'green', borderWidth: 1, borderRadius: 5, borderColor: 'transparent', width: 70 }}>See all</Text>
              <AntDesign name="right" size={24} color="green" />
            </View>
          </View>
      {activeTab === 'All' && <All/>}
        {activeTab === 'Entree' && <Entree  a={entree}/>} 
                       {activeTab === 'Resistance' && <Resistance b={resistance}/>}
                       {activeTab === 'Dessert' && <Dessert c={dessert}/>}
                       {activeTab === 'Boisson' && <Boisson  d={boisson}/>}
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
    height: 125,
    borderRadius: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top:-45,
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
