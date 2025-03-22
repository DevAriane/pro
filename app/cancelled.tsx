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
        {/* <ScrollView>
           {c.map((x) => {
                    return (<View style={styles.all}>
                      {x.items.map((i) => {
                        return (<View style={styles.items}>
                          <View style={{width:40,height:40,borderRadius:5,overflow:'hidden'}}><Image source={{ uri: i.imageUrl }} style={{width:"100%",height:"100%",borderRadius:5}}/></View>
                          <View style={{flex:1,margin:3}}>
                            <Text style={{fontWeight:"bold"}}>{i.name}</Text>
                            <Text numberOfLines={3} style={{fontSize:12,fontWeight:"bold",color:'gray'}}>{i.description}</Text>
                          </View>
                          <View>
                            <Text style={{fontWeight:"bold",display:"flex",justifyContent:"flex-end"}}>x{i.nbre}</Text>
                            <Text style={{fontWeight:"bold"}}>${i.montant.toFixed(0)}</Text>
                          </View>
                        </View>)
                      })}
                      <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                        <View style={{borderWidth:1,borderColor:"transparent",backgroundColor:"white",width:40,height:40,borderRadius:5,margin:5,display:"flex",alignItems:"center",justifyContent:"center"}}><Text style={{fontWeight:"bold"}}>${x.pricing.net.toFixed(0)}</Text></View>
                        
                      </View>
                    </View>)
                  })}
                      </ScrollView>                     */}
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
 items:{
  display:'flex',
  flexDirection:"row",
  alignItems:"center",
  justifyContent:'space-between',
  backgroundColor:'white',
  margin:5,
  padding:5,
  borderRadius:8,
  borderColor:"transparent",
  borderWidth:1
 },
 all:{
  margin:20,
  backgroundColor:'lightgray',
  padding:5,
  borderRadius:8,
  borderColor:"transparent",
  borderWidth:1
 }
})
