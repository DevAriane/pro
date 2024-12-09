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

export default function History() {

    const router=useRouter();
    const {id, image, titre,lieu,etoile,jour,debut,fin} = useLocalSearchParams();
  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor='green' style='light' />
      <View style={styles.containt}>
                   
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
