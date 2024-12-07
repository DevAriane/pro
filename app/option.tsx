import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, SafeAreaView} from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
function App() {
    return (
     <SafeAreaView style={styles.area}>
       
        <View style={styles.containt}>
        <View style={styles.img} >
               <Image source={require('../assets/images/image.png')} resizeMode='contain' style={{width:200,height:200}}/>
            </View>
            <View>
        <View style={styles.text}>  <Text style={{textAlign:'center',color:'white',marginVertical:'auto'}}><Link href='/log'>  Log In</Link></Text> </View> 
         <View style={styles.sign}>   <Link href='/sign'><Text style={{textAlign:'center',color:'green',marginVertical:'auto'}}><Link href='/sign'>Sign Up</Link></Text></Link></View>
            </View>
            <Text style={{color:'gray',marginLeft:30,marginVertical:20}}>----------------------------------or-------------------------------------</Text>
            <View>
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