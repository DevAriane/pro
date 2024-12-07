import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, SafeAreaView} from 'react-native';
import { Link } from 'expo-router';
import CheckBox from '@react-native-community/checkbox';
import { StatusBar } from 'expo-status-bar';

import AntDesign from '@expo/vector-icons/AntDesign';
function App() {
    return (
     <SafeAreaView style={styles.area}>
        <StatusBar backgroundColor='green' style='light' />
        <View style={styles.containt}>
       <View style={styles.hidden}>
      <Link href='/option'> <AntDesign name="left" size={24} color="white" /></Link>
     <View> <Text style={{marginLeft:120,color:'white',fontSize:24}}>Orders</Text></View> 
       </View>
       <View style={styles.a}>
      <View><Text style={{color:"gray"}}>Coming</Text></View>
      <View><Text style={{color:"gray"}}>History</Text></View>
      <View><Text style={{color:"gray"}}>Cancelled</Text></View>
      <View><Text style={{color:"gray"}}>Draft</Text></View>
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
a:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    color:'gray',
    justifyContent:'space-around',
    margin:1,
    marginVertical:20,
},
});