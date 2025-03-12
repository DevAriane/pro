import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button,FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Link ,useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Cancelled({c}) {
  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor='green' style='light' />
      <View style={styles.containt}>
        <ScrollView>
            <FlatList
                              data={c}
                              renderItem={({ item }) => (
                                
                                <View style={{ backgroundColor: 'white', alignItems: 'center', borderColor: 'transparent', borderWidth: 1, borderRadius: 5, display: 'flex', justifyContent: 'space-around', margin:5,padding:5 }}>
                      
                                <View style={{ borderWidth: 1, padding: 5, margin: 5, borderColor: 'transparent', width: 120, height: 100, borderRadius:"50" }}>
                                  <Image source={{ uri: item.items.img }} style={{ width: '100%', height: '100%', borderColor: 'transparent', borderWidth: 1, borderRadius:25 }} resizeMode="cover" />
                                </View>
                      
                                <View>
                                  <Text style={{ fontSize: 16, padding: 2 ,textAlign:"center"}}>{item.items.name}</Text>
                                  <Text style={{ fontSize: 16, padding: 2 ,textAlign:"center"}}>Status:{item.status.current}</Text>
                                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}> <Text style={{ color: 'gray', padding: 2 }}>Quantity: {item.items.quantity}</Text></View>
                                 
                                </View>
                      
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',width:150 }}>
                        <View>
                          <Text style={{ color: 'gray', padding: 3, fontWeight: "bold", fontSize: 18 }}>
                            ${`${item.pricing.net.toFixed(0)}`}
                          </Text>
                        </View>
                        
                      </View>
                      
                              </View>
                              )}
                              keyExtractor={item => item.key}
                              numColumns={2}
                            />
                      
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
