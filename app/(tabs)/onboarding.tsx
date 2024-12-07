import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, SafeAreaView} from 'react-native';
import { Link } from 'expo-router';

function App() {
    return (
     <SafeAreaView style={styles.area}>
        <View style={styles.containt}>
          <View >
            <Image source={require('../../assets/images/shooping.png')} resizeMode='contain'
             style={{width:350,height:500}}
             />
          </View>
          <View style={styles.a}>
      <Text style={{textAlign:'center',fontSize:24,fontWeight:400}}>Explore now  </Text>
      <Text style={{textAlign:'center',fontSize:24,fontWeight:400}}> to experience the benefits </Text>
      <Text style={{textAlign:'center',marginVertical:20}}>vivez et découvrez les plaisir que le digital nous offre</Text>
 <View style={styles.text}> <Text style={{color:'white',textAlign:'center'}}><Link href='/option'>Get stated</Link></Text> </View>  
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
        margin:7,
    },
image:{
  marginHorizontal:'auto',
},
a:{
  display:'flex',
  justifyContent:'space-around',
  marginHorizontal:'auto',
 
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
  marginHorizontal:'auto',
},
});