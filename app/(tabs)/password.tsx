import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, SafeAreaView} from 'react-native';
import { Link } from 'expo-router';
import CheckBox from '@react-native-community/checkbox';
import { StatusBar } from 'expo-status-bar';

import AntDesign from '@expo/vector-icons/AntDesign';
function App() {
    return (
     <SafeAreaView style={styles.area}>
        <StatusBar style='light'/>
        <View style={styles.containt}>
       <View style={styles.hidden}>
     <Link href='/log'>  <AntDesign name="left" size={24} color="white" /></Link>
     <View> <Text style={{marginLeft:80,color:'white',fontSize:24}}>Forgot Password</Text></View> 
       </View>
       <View style={{marginVertical:30}}>
        <Text style={styles.te}>Enter the email  associed with your account and we'll send an email with code to reset your password</Text>
       <View>
        <Text style={{padding:5,fontSize:18,marginLeft:20}}>Email</Text>
        <TextInput placeholder='Text your email' placeholderTextColor='gray' style={styles.input} />
       </View>
       <View><Text style={styles.text}> Confirm Order</Text></View>
       </View>
        </View>
     </SafeAreaView>   
    );
}
export default App;
const styles = StyleSheet.create({
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
te:{
   
    color:'gray',
    padding:5,
    marginVertical:20,
    marginHorizontal:'auto',
    marginLeft:20,
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