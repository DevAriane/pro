import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, SafeAreaView} from 'react-native';
import { Link } from 'expo-router';
import CheckBox from '@react-native-community/checkbox';
import { StatusBar } from 'expo-status-bar';

import AntDesign from '@expo/vector-icons/AntDesign';
function App() {
    return (
     <SafeAreaView style={styles.area}>
       
        <View style={styles.containt}>
       <View style={styles.hidden}>
      <Link href='/option'> <AntDesign name="left" size={24} color="white" /></Link>
     <View> <Text style={{marginLeft:120,color:'white',fontSize:24}}>Log In</Text></View> 
       </View>
       <View>
        <View style={{marginVertical:30}}>
       <View>
        <Text style={{padding:5,fontSize:18,marginLeft:20}}>Email</Text>
        <TextInput placeholder='Text your email' placeholderTextColor='gray' style={styles.input} />
       </View>
       <View >
        <Text style={{padding:5,fontSize:18,marginLeft:20}}>Password</Text>
        <TextInput placeholder='Text your name' placeholderTextColor='gray' style={styles.input} />
       </View>
       </View>
       <View style={styles.vet}>
        <View style={{display:'flex',flexDirection:'row',alignItems:'center',}}>
        {/* <CheckBox/> */}
        <Text>Remenber me</Text>
        </View>
        <View><Text style={{color:'gray'}}><Link href='/password'>Forgot Password?</Link></Text></View>
       </View>
       <View>
           <Text style={styles.text}> Log In</Text>  
        
            </View>
            <Text style={{color:'gray',marginLeft:30,marginVertical:10}}>----------------------------------or-------------------------------------</Text>
            
                <View style={styles.ali}>
                    <Image source={require('../../assets/images/facebook.png')} resizeMode='contain' style={{width:20,height:20}}/>
                    <Text style={{fontWeight:500}}>Continue with facebook</Text>
                </View>
                <View style={styles.ali}>
                    <Image source={require('../../assets/images/google.png')} resizeMode='contain' style={{width:20,height:20}}/>
                    <Text style={{fontWeight:500}}>Continue with Google</Text>
                </View>
                <Text style={{color:'gray',textAlign:'center'}}>Don't you have a register account? <Text style={{color:'lightblue',fontWeight:'bold'}}><Link href='/account'>Register</Link></Text></Text>
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