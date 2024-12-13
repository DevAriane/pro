import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, SafeAreaView} from 'react-native';
import { Link } from 'expo-router';
import CheckBox from '@react-native-community/checkbox';
import { StatusBar } from 'expo-status-bar';
import Utilisateur from './utilisateur';
import Livreur from './livreur';
import { useEffect, useState } from 'react';

import AntDesign from '@expo/vector-icons/AntDesign';
function App() {
    const [affiche,setAffiche]=useState(true);
    const [color,setColor]=useState(true);
   

    useEffect((()=>{console.log('bonjour');
    
      if (affiche===true){
        setColor(true);
        console.log('bonjour1')
      }
      else if(affiche===false){
        setColor(false);
        console.log('bonjour2')
      }
     }),[affiche])
   
    return (
     <SafeAreaView style={styles.area}>
        <StatusBar backgroundColor='green' style='light' />
        <View style={styles.containt}>
      
       <View style={styles.hidden}>
      <Link href='/option'> <AntDesign name="left" size={24} color="white" /></Link>
     <View> <Text style={{marginLeft:120,color:'white',fontSize:24}}>Log In</Text></View> 
       </View>
       <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
        <View style={[styles.text,{backgroundColor: color ? 'green' : 'gray' }]} ><Text style={{textAlign:'center',color:'white',fontWeight:500, backgroundColor: color ? 'green' : 'gray' }}>User</Text></View>  
        <View style={[styles.text,{backgroundColor: !color ? 'green' : 'gray' }]}><Text onPress={()=>{setAffiche(false)}} style={{textAlign:'center',color:'white',fontWeight:500, backgroundColor: !color ? 'green' : 'gray' }}>Delivery Man</Text></View>
        </View>
        {affiche ? <Utilisateur /> : <Livreur />}
        
        </View>
     </SafeAreaView>   
    );
}
export default App;
const styles = StyleSheet.create({
  vert:{backgroundColor:'green'},
  grise:{backgroundColor:'gray'},
    input:{
        backgroundColor:'white',
        fontSize:14,
        borderRadius:10,
        borderWidth:1,
        borderColor:'lightgray',
        height: 40,
    width:300,
    padding:5,
    marginHorizontal:'auto',
    margin:5,
    },
    vet:{
        justifyContent:'space-around',
        display:'flex',flexDirection:'row',alignItems:'center',
    },
    area: {
        flex: 1,
    },
    containt: {
        flex: 1,
       
        backgroundColor: 'whitesmoke',
       
    },
vie:{
marginVertical:'auto',
marginHorizontal:'auto',
},
hidden:{
    top:0,
    position:'fixed',
    height:120,
    backgroundColor:'green',
    display:'flex',
    flexDirection:'row',
   color:'white',
   alignItems:'center',
    
},
text:{
    height: 40,
    width:150,
    borderRadius:10,
    borderWidth:1,
    borderColor:'transparent',
    color:'white',
    backgroundColor:'green',
    padding:5,
    textAlign:'center',
    marginVertical:20,
    marginHorizontal:'auto',
    margin:5,
  },
  sign:{
    height: 40,
    width:300,
    borderRadius:10,
    borderWidth:1,
    borderColor:'transparent',
    color:'green',
    backgroundColor:'white',
    padding:5,
    textAlign:'center',
    marginHorizontal:'auto',
    margin:5,
  },
  ali:{
    height: 40,
    width:300,
    borderRadius:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    borderWidth:1,
    borderColor:'lightgray',
    backgroundColor:'white',
    padding:5,
    textAlign:'center',
    marginHorizontal:'auto',
    margin:5,
    justifyContent:'center',
    marginVertical:10,
  },
});