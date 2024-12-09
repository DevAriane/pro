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
import { Link ,useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Comming() {

    const router=useRouter();
    const {id, image, titre,lieu,etoile,jour,debut,fin} = useLocalSearchParams();
  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor='green' style='light' />
      <View style={styles.containt}>
                    <View style={{ backgroundColor: 'white', alignItems: 'center', borderColor: 'transparent', borderWidth: 1, borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: 5 }}>
                      {/* <View style={{borderWidth:1,borderRadius:5,padding:5,margin:5,backgroundColor:'gray',opacity:0.5, borderColor:'transparent',width:80,height:100}}></View> */}
                     <Image source={image} style={{ width: 50, height: 50, borderColor: 'transparent', borderWidth: 1, borderRadius: 2 }} resizeMode="cover" />

                      <View>
                        <Text style={{ fontSize: 16, padding: 2 }}>{titre}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}> <FontAwesome5 name="map-marker-alt" size={15} color="green" /><Text style={{ color: 'gray', padding: 2 }}>{`${lieu}`}</Text></View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><FontAwesome name="star" size={15} color="yellow" /><Text style={{ color: 'gray', padding: 2 }}>{`${etoile}`}</Text></View>
                      </View>
                      <View>
                        <Text style={{ color: 'white', borderWidth: 1, borderRadius: 5, backgroundColor: 'green', borderColor: 'transparent', width: 70, padding: 5, textAlign: "center" }}>Check</Text>
                      </View>
                    </View>
                    <Link href='/food'><Text>click here</Text></Link>
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
