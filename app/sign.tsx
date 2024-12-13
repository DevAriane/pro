import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, SafeAreaView, Alert} from 'react-native';
import { Link } from 'expo-router';
import CheckBox from '@react-native-community/checkbox';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


import AntDesign from '@expo/vector-icons/AntDesign';
function App() {
    const [email,setEmail]=useState<string>();
    const [pass,setPassword]=useState();
    const [name,setName]=useState();
    const userRef=firestore().collection('users')

// Get user document with an ID of ABC
const userDocument = firestore().collection('Users').doc('ABC');


    const registre=async()=>{
        if(email && pass){
            try {
                const response:FirebaseAuthTypes.UserCredential =await auth().createUserWithEmailAndPassword(email,pass);
                if (response.user){
                    console.log("response.user",response.user);
                    addUser(response.user);
                }
            } catch (error) {
                Alert.alert('réesséssayez le mot de pass ou email');
            }
        }
    }
const addUser=async(user:FirebaseAuthTypes.User)=>{
    try {
        await userRef.add({
            id: user.uid,
            email: user.email, // Store email instead of password
            role: 'user',
            name: name || 'Nom non fourni', // Use displayName if available
            createdAt: firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
        console.error("Error adding user to Firestore:", error);
    }
}

    return (
     <SafeAreaView style={styles.area}>
        <StatusBar style='light'/>
        <View style={styles.containt}>
       <View style={styles.hidden}>
     <Link href='/log'>  <AntDesign name="left" size={24} color="white" /></Link>
     <View> <Text style={{marginLeft:120,color:'white',fontSize:24}}>Sign Up</Text></View> 
       </View>
       <View>
        <View style={{marginVertical:30}}>
       <View>
        <Text style={{padding:5,fontSize:18,marginLeft:20}}>Name</Text>
        <TextInput 
           
        placeholder='Text your name' 
        placeholderTextColor='gray' 
        style={styles.input} 
        value={name} 
        onChangeText={(text) => {
            setName(text);
          }} 
        />

<Text style={{padding:5,fontSize:18,marginLeft:20}}>Email</Text>
        <TextInput 
          keyboardType='email-address' 
        placeholder='Text your email' 
        placeholderTextColor='gray' 
        style={styles.input} 
        value={email} 
        onChangeText={(text) => {
            setEmail(text);
          }} 
        />
       
       </View>
       <View >
        <Text style={{padding:5,fontSize:18,marginLeft:20}}>Password</Text>
        <TextInput
         placeholder='Text your name'
          placeholderTextColor='gray'
           style={styles.input}
           value={pass} 
           onChangeText={(word) => {
               setPassword(word);
             }} 
            />
       </View>
       <View >
        <Text style={{padding:5,fontSize:18,marginLeft:20}}>Confirm password</Text>
        <TextInput placeholder='Text your name' placeholderTextColor='gray' style={styles.input} />
       </View>
       </View>
       
       <View>
        <TouchableOpacity onPress={()=>{registre()}}>  <Text style={styles.text} > Sign up</Text> </TouchableOpacity>   
        
            </View>
            <Text style={{color:'gray',marginLeft:30,marginVertical:10}}>----------------------------------or-------------------------------------</Text>
            
                <View style={styles.ali}>
                    <Image source={require('../assets/images/facebook.png')} resizeMode='contain' style={{width:20,height:20}}/>
                    <Text style={{fontWeight:500}}>Continue with facebook</Text>
                </View>
                <View style={styles.ali}>
                    <Image source={require('../assets/images/google.png')} resizeMode='contain' style={{width:20,height:20}}/>
                    <Text style={{fontWeight:500}}>Continue with Google</Text>
                </View>
   
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