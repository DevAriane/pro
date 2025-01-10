import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, SafeAreaView,Alert} from 'react-native';
import { Link } from 'expo-router';
import CheckBox from '@react-native-community/checkbox';
import { StatusBar } from 'expo-status-bar';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';

function Available({reservationVenant,affecter}){
    console.log('reservationVenant',reservationVenant);



    return(<SafeAreaView>
        <View style={styles.c}>
            {reservationVenant.map((x)=>{return(<>
         
                <View style={{display:'flex',flexDirection:'row',alignItems:'center',margin:5,justifyContent:'space-around'}}>
                    <View><Text>#ORDR00001</Text></View>
                    <View><Text style={{color:'green'}}>Available</Text></View>
                </View>
                <View style={styles.vie}>
                    <Text>{x.items.quantity}X   {x.items.name}</Text>
                    <Text></Text>
                    <View>
                       <TouchableOpacity onPress={()=>affecter(reservationVenant)}>
                       <AntDesign name="rightcircle" size={24} color="yellow" />
                       </TouchableOpacity> 
                    </View>
                </View>
                
            </>)})}
            
                </View>
    </SafeAreaView>)
}
   
export default Available;
const styles = StyleSheet.create({
    area:{
        flex:1,
      },
      containt:{
        flex:1,
        justifyContent:'space-between',
        borderRadius:50,
        // borderWidth:1,
        // borderColor:'transparent',
        backgroundColor:'whitesmoke',
      },
      header:{
        width:'100%',
        position:'fixed',
        height:120,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        backgroundColor:'green',
        color:'white',
        alignItems:'center',
      },
      vie:{
          margin:10,
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-around'
      },
      c:{
          margin:5,
          backgroundColor:'white',
          borderColor:'transparent',borderWidth:1,borderRadius:15,
      }
  },);