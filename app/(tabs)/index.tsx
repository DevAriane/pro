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
import { useEffect, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import All from '../all';
import Entree from '../entree';
import Resistance from '../resistance';
import Dessert from '../dessert';
import Boisson from '../boisson';
import Burger from '../bureger';
import Hotdog from '../hotdog';
import Pizza from '../pizza';

export default function HomeScreen() {

 

  const [loading, setLoading] = useState(false);
  
  const Direction = (x) => {
    console.log("welcome");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    router.push({ pathname: '/restaurant', params: { item: JSON.stringify(x) } });

  }


  const { restaurants, categories } = useRestaurants();

  // console.log('restaurants index', restaurants);
  const [activeTab, setActiveTab] = useState('All');
  console.log("categories",categories);
  console.log("activeTab",activeTab);
  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor='green' style='light' />
      <View style={styles.containt}>
        <View style={styles.header}>
          <AntDesign name="bars" size={24} color="white" />
          <Text style={{ color: 'white', fontSize: 20 ,fontWeight:'bold'}}>Accueil</Text>
          <AntDesign name="bells" size={24} color="white" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>


          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginHorizontal: 'auto', backgroundColor: 'white', width: 300, justifyContent: 'space-around', borderRadius: 20, borderWidth: 1, borderColor: 'transparent', margin: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign name="search1" size={20} color="gray" />
              <TextInput placeholderTextColor='gray' placeholder="Qu'est ce que vous voulez mangé ? " /></View>
            <AntDesign name="closesquare" size={20} color="gray" />
          </View>

          <View style={styles.day}>
            <View>
              <Text style={{ fontSize: 16 }}>Nouveau arrivage d'aujourd'hui</Text>
              <Text style={{ color: 'gray' }}>La meilleure liste d'aujourd'hui</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'green', borderWidth: 1, borderRadius: 5, borderColor: 'transparent', width: 70 }}>Voir tout</Text>
              <AntDesign name="right" size={24} color="green" />
            </View>
          </View>

          <ScrollView horizontal={true} >
            <View style={{ margin: 10, display: 'flex',justifyContent:"space-around",flexDirection:"row",width:"100%" }}>
          <TouchableOpacity onPress={() => setActiveTab('All')} style={[styles.tabButton, activeTab === 'All' && styles.activeTab]} >
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", width: 90, }}>
                <View style={{ width: 35, height: 25,margin:5 }}>

                  <Image
                    source={require('../../assets/images/img62.jpg')}
                    style={
                      {
                        width: '100%', height: '100%', borderColor: 'transparent', borderWidth: 1, borderRadius: 40,
                        shadowColor: '#00ff00', // Couleur de l'ombre (vert)
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 10,
                      }
                    }
                    resizeMode="cover"
                  />
                </View>


                <View >
                  <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>Tout</Text>
                  {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>   <MaterialCommunityIcons name="pot-steam" size={15} color="green" /><Text style={{ color: 'gray' }} >{x.menu}</Text></View> */}
                </View>
              </View>
            </TouchableOpacity>
            {categories.map((x) => (
  <TouchableOpacity
    key={x.name} // Added a key for efficient list rendering
    onPress={() =>{ setActiveTab(x);
      
    }}
    style={[
      styles.tabButton,
      activeTab === x && styles.activeTab, // Corrected conditional comparison
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
      <View style={{ width: 35, height: 25,margin:5 }}>
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
            activeTab === x && styles.activeTabText, // Corrected conditional comparison
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
          <View>
            {/* <ScrollView style={{paddingTop:40}} horizontal={true}>
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
    source={require('../../assets/images/img62.jpg')}
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
                    <Text style={{ fontSize: 18,textAlign:"center" ,fontWeight:"bold",fontStyle:"italic",fontFamily:""}}>ALL</Text>
                    {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>   <MaterialCommunityIcons name="pot-steam" size={15} color="green" /><Text style={{ color: 'gray' }} >{x.menu}</Text></View> 
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
    source={require('../../assets/images/img58.jpg')}
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
                    <Text style={{ fontSize: 18,textAlign:"center" ,fontWeight:"bold",fontStyle:"italic",fontFamily:""}}>PIZZA</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>   <MaterialCommunityIcons name="pot-steam" size={15} color="green" /><Text style={{ color: 'gray' }} >{x.menu}</Text></View> 
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
    source={require('../../assets/images/img59.jpg')}
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
                    <Text style={{ fontSize: 18,textAlign:"center" ,fontWeight:"bold",fontStyle:"italic",fontFamily:""}}>HOT DOG</Text>
                     <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>   <MaterialCommunityIcons name="pot-steam" size={15} color="green" /><Text style={{ color: 'gray' }} >{x.menu}</Text></View> 
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
    source={require('../../assets/images/img61.jpg')}
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
                    <Text style={{ fontSize: 18,textAlign:"center" ,fontWeight:"bold",fontStyle:"italic",fontFamily:""}}>BURGER</Text>
                     <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>   <MaterialCommunityIcons name="pot-steam" size={15} color="green" /><Text style={{ color: 'gray' }} >{x.menu}</Text></View> 
                  </View>
                </TouchableOpacity>
              
           
          </ScrollView>
 */}</View>

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 4, borderWidth: 1, borderRadius: 8, borderColor: 'transparent', padding: 5 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Explorez les restaurants</Text>
              <Text style={{fontSize:12}}>Choisissez votre ville à partir des restaurants</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'green', borderWidth: 1, borderRadius: 5, borderColor: 'transparent', width: 70 }}>Voir tout</Text>
              <AntDesign name="right" size={24} color="green" />
            </View>
          </View>

           <All id='12' category={activeTab}/>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  area: {
    flex: 1,

  },
  tabButton: {
    padding: 5,
    paddingRight:10,
    borderRadius: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activeTab: {
    display:"flex",
    justifyContent:"center",
    marginHorizontal:"auto",
    backgroundColor: 'green', // Fond blanc pour l'onglet actif
  },
  activeTabText: {
    color: 'white',
   // Couleur du texte vert lorsque l'onglet est actif
  },
  tabText: {
    color: 'gray',
    fontWeight: 'bold',

  },
  imge: {
    display: 'flex',
    width: 150,
    height: 125,
    borderRadius: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -45,
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
