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
import { Link ,router,useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useOrders } from '@/contexts/OrderContext';
import { ActivityIndicator } from 'react-native-paper';


export default function Comming({a}) {
  
console.log("a",a);

console.log('a',a);
const Direction=(x)=>{
  router.push(`/orders/${x.id}`);
 
}
 

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor='green' style='light' />
      <ScrollView>
      <View style={styles.containt}>
      {
        a.map((x)=>{
return(<>
     <View style={{ backgroundColor: 'white', alignItems: 'center', borderColor: 'transparent', borderWidth: 1, borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: 5 }}>
                       <View style={{borderWidth:1,borderRadius:5,padding:5,margin:5,backgroundColor:'gray',opacity:0.5, borderColor:'transparent',width:80,height:100}}></View> 
                     {/* <Image source={c} style={{ width: 50, height: 50, borderColor: 'transparent', borderWidth: 1, borderRadius: 2 }} resizeMode="cover" /> */}

                      <View>
                        <Text style={{ fontSize: 16, padding: 2 }}>{x.items.name}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}> <Text style={{ color: 'gray', padding: 2 }}>quantité commandée: {x.items.quantity}</Text></View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: 'gray', padding: 2 }}>pix à payer: {`${x.pricing.net }`}</Text></View>
                      
                      </View>
                      <View>
                      <TouchableOpacity onPress={()=>{Direction(x)}}>  <Text style={{ color: 'white', borderWidth: 1, borderRadius: 5, backgroundColor: 'green', borderColor: 'transparent', width: 70, padding: 5, textAlign: "center" }}>Check</Text></TouchableOpacity>
                      </View>
                    </View> 
                    </>)
        })
      }
      
                
     
       
      </View>
      </ScrollView>
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
