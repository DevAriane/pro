import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button } from 'react-native';
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
import { Link } from 'expo-router';


export default function HomeScreen() {

  const arr = [
    { id: 1, image: require('../../assets/images/img1.jpg'), titre: "Waffle", menu: "Waffle with Berries", prix: 6.50 ,commentaire:'Connu sous le nom d"OKOK le plat traditionnel d"origine du peuple  Bassa"a du Littoral ',price:2000},
    { id: 2, image: require('../../assets/images/img2.jpg'), titre: "Crème Brulée", menu: "Vanilla Bean Crème Brulée", prix: 7.00,commentaire:'Connu sous le nom de KOKI le plat traditionnel d"origine du peuple  Bamiléké ',price:1500 },
    { id: 3, image: require('../../assets/images/img3.jpg'), titre: "Macaron", menu: "Macaron Mix of Five", prix: 8.00 ,commentaire:'Connu sous le nom de KONDRE le plat traditionnel d"origine du peuple Bamiléké ',price:2000},
    { id: 4, image: require('../../assets/images/img4.jpg'), titre: "Tiramisu", menu: "Classic Tiramisu", prix: 5.50 ,commentaire:'Connu sous le nom de MBONGO TCHOBI le plat traditionnel d"origine du peuple  Bassa"a du Littoral ',price:1500},
    { id: 5, image: require('../../assets/images/img5.jpg'), titre: "Baklava", menu: "Pistachio Baklavva", prix: 4.00 ,commentaire:'Connu sous le nom de KWAKOUKOU le plat traditionnel d"origine du peuple  Bafang ',price:1500},
    { id: 6, image: require('../../assets/images/img6.jpg'), titre: "Pie", menu: "Lemon Meringue Pie", prix: 5.00 ,commentaire:'Connu sous le nom de TARO le plat traditionnel d"origine du peuple  Mbouda ',price:2000},
    { id: 7, image: require('../../assets/images/img7.jpg'), titre: "Cake", menu: "Red Velvet Cake", prix: 4.50 ,commentaire:'Connu sous le nom de SANGHA le plat traditionnel d"origine du peuple  Yaoundé ',price:1000},
    { id: 8, image: require('../../assets/images/img8.jpg'), titre: "Broxnie", menu: "Salted Caramel Brownie", prix: 5.50 ,commentaire:'Connu sous le nom d"OKOK le plat traditionnel d"origine du peuple  Bassa"a du Littoral ',price:1500},
    { id: 9, image: require('../../assets/images/img9.jpg'), titre: "Panna Cotta", menu: "Vanilla Panna Cotta", prix: 6.50,commentaire:'Connu sous le nom de  la BRAISE le plat traditionnel d"origine du peuple  Douala du Littoral ',price:2000 }
  ];

  const tab = [
    { id: 1, image: require('../../assets/images/res1.jpeg'), titre: 'Hotel De Ville', lieu: 'yaounde', etoile: 2 ,jour:'lundi à samedi',debut:8 , fin:20 },
    { id: 2, image: require('../../assets/images/res2.jpeg'), titre: '5 fourchettes', lieu: 'bonamoussadi', etoile: 4 ,jour:'mardi et mercredi',debut:12 , fin:22 },
    { id: 3, image: require('../../assets/images/res3.jpg'), titre: 'KMC:K my choise', lieu: 'Ange Raphael', etoile: 3 ,jour:'7jours/7',debut:10, fin:20 },
    { id: 4, image: require('../../assets/images/res4.jpg'), titre: 'Ange Lounge', lieu: 'logpom', etoile: 6,jour:'lundi à dimanche',debut:16 , fin:24  },
    { id: 5, image: require('../../assets/images/res5.jpg'), titre: 'Akwa palace', lieu: 'akwa', etoile: 7 ,jour:'mardi à jeudi',debut:12 , fin:20 },
    { id: 6, image: require('../../assets/images/res6.jpg'), titre: 'Delices Lounge', lieu: 'akwa-nord', etoile: 1 ,jour:' samedi et dimanche',debut:8 , fin:22 },
  ];
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
          <View style={styles.special}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24 }}>Special offer  </Text>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24 }}>for March</Text>
            <Text style={{ color: 'white' }}>We are here with the </Text>
            <Text style={{ color: 'white' }}>Best Burgers in town</Text>
            <Text style={{ color: 'green', borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: 'white', borderColor: 'transparent', width: 100 }}>Buy Now</Text>
            {/* <Button title='Buy Now' color='1CC019'/> */}
          </View>
          <View style={styles.day}>
            <View>
              <Text style={{ fontSize: 20 }}>Today New Arivable</Text>
              <Text style={{ color: 'gray' }}>Best the today list update</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'green', borderWidth: 1, borderRadius: 5, backgroundColor: 'white', borderColor: 'transparent', width: 70 }}>See oil</Text>
              <AntDesign name="right" size={24} color="green" />
            </View>
          </View>
          <View>
            <ScrollView horizontal={true}>{
              arr.map((x, i) => {
                return (<>

                  <View key={i} style={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 5, borderColor: 'transparent', width: 150, margin: 4, display: 'flex', alignItems: 'flex-start', }}>
                    {/* <View style={{borderWidth:1,borderRadius:5,padding:5,margin:5,backgroundColor:'gray',opacity:0.5, borderColor:'transparent',width:125,height:100}}></View> */}
                    <View style={{ width: '100%', }}><Link href={{pathname:'/food',params:{...x}, }}>  <Image source={x.image} style={{ width: '95%', height: 100, borderColor: 'transparent', borderWidth: 1, borderRadius: 2, margin: 3 }} resizeMode="stretch" /></Link>   </View>
                    <Text style={{ fontSize: 18, padding: 5 }}>{x.titre}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>  <FontAwesome5 name="map-marker-alt" size={15} color="green" /> <Text style={{ color: 'gray' }} >{x.menu}</Text></View>
                  </View>

                </>)
              })
            }
            </ScrollView>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', margin: 8, height: 40, borderWidth: 1, borderRadius: 8, borderColor: 'transparent', }}>
            <View>
              <Text style={{ fontSize: 20, padding: 5 }}>Booking Restaurant</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'green', borderWidth: 1, borderRadius: 5, backgroundColor: 'white', borderColor: 'transparent', width: 70 }}>See oil</Text>
              <AntDesign name="right" size={24} color="green" />
            </View>
          </View>
          <View>
            <ScrollView >
              {
                tab.map((x, i) => {
                  return (<>

                    <View style={{ backgroundColor: 'white', alignItems: 'center', borderColor: 'transparent', borderWidth: 1, borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: 5 }}>
                      {/* <View style={{borderWidth:1,borderRadius:5,padding:5,margin:5,backgroundColor:'gray',opacity:0.5, borderColor:'transparent',width:80,height:100}}></View> */}
                      <Link href={{pathname:'/restaurant',params:{...x}, }}>   <Image source={x.image} style={{ width: 50, height: 50, borderColor: 'transparent', borderWidth: 1, borderRadius: 2 }} resizeMode="cover" /></Link>

                      <View>
                        <Text style={{ fontSize: 16, padding: 2 }}>{x.titre}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}> <FontAwesome5 name="map-marker-alt" size={15} color="green" /><Text style={{ color: 'gray', padding: 2 }}>{x.lieu}</Text></View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><FontAwesome name="star" size={15} color="yellow" /><Text style={{ color: 'gray', padding: 2 }}>{x.etoile}</Text></View>
                      </View>
                      <View>
                        <Text style={{ color: 'white', borderWidth: 1, borderRadius: 5, backgroundColor: 'green', borderColor: 'transparent', width: 70, padding: 5, textAlign: "center" }}>Book</Text>
                      </View>
                    </View>

                  </>)
                })
              }
            </ScrollView>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  area: {
    flex: 1,

  },
  containt: {

    flex: 1,

    justifyContent: 'space-between',
    borderRadius: 50,
    // borderWidth:1,
    // borderColor:'transparent',
    backgroundColor: 'whitesmoke',
  },
  header: {
    width: '100%',
    position: 'fixed',
    height: 90,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'green',
    color: 'white',
    alignItems: 'center',
  },
  special: {
    height: 150,
    padding: 5,
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
    backgroundColor: 'white',
    padding: 5,
  },
  rest: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
