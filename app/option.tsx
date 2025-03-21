import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, SafeAreaView,Pressable} from 'react-native';
import { Link,router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import LoadingIndicator from './loading';
function App() {
   
    return (
     <SafeAreaView style={styles.area}>
       
        <View style={styles.containt}>
        <View style={styles.img} >
               <Image source={require('../assets/images/image.png')} resizeMode='contain' style={{width:200,height:200}}/>
            </View>
            <View>
        <Pressable onPress={()=>router.push('/log')} style={styles.text}>  <Text  style={{textAlign:'center',color:'white',marginVertical:'auto',fontWeight:"bold"}}>  Connexion</Text> </Pressable> 
         <Pressable onPress={()=>router.push('/sign')} style={styles.sign}>   <Text  style={{textAlign:'center',color:'green',marginVertical:'auto',fontWeight:"bold"}}>Inscription</Text></Pressable>
            </View>
           <View style={{display:'flex',alignItems:"center",justifyContent:"center",width:"100%"}}><Text style={{color:'gray'}}>------------------------------------ou-----------------------------------</Text></View> 
            <View>
                <View style={styles.ali}>
                    <Image source={require('../assets/images/facebook.png')} resizeMode='contain' style={{width:20,height:20}}/>
                    <Text style={{fontWeight:500}}>Continuer avec facebook</Text>
                </View>
                <View style={styles.ali}>
                    <Image source={require('../assets/images/google.png')} resizeMode='contain' style={{width:20,height:20}}/>
                    <Text style={{fontWeight:500}}>Continuer avec Google</Text>
                </View>
            </View>
        </View>
     </SafeAreaView>   
    );
}
export default App;
const styles = StyleSheet.create({
    area: {
        flex: 1,
    },
    containt: {
        flex: 1,
        backgroundColor: 'whitesmoke',
    },
    text:{
        height: 40,
        width:300,
        borderRadius:10,
        borderWidth:1,
        borderColor:'transparent',
        color:'white',
        backgroundColor:'green',
        padding:5,
        textAlign:'center',
        marginHorizontal:'auto',
        margin:5,
      },
      sign:{
        height: 40,
        width:300,
        borderRadius:10,
        borderWidth:1,
        borderColor:'green',
        color:'green',
        backgroundColor:'white',
        padding:5,
        textAlign:'center',
        marginHorizontal:'auto',
        margin:5,
      },
      img:{
        top:30,
        marginVertical:60,
         marginHorizontal:'auto',
       
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
      },
});