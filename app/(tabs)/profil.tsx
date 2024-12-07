import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';
import Octicons from '@expo/vector-icons/Octicons';
import { StatusBar } from 'expo-status-bar';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
function App() {
    return (
        <SafeAreaView style={styles.area}>
            <StatusBar backgroundColor='green' style='light' />
            <View style={styles.containt}>
                
                    <View style={{ position: 'fixed', width: '100%', height: 100, backgroundColor: 'green',display:'flex',alignItems:'center',justifyContent:'center' }}>
                        <Text style={{ color: 'white', fontSize: 20,textAlign:'center' ,marginHorizontal:'auto' }}>Account</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{display:'flex',justifyContent:'center',alignItems:'center',borderWidth:1,borderRadius:5,borderColor:'transparent',backgroundColor:'white',margin:10,padding:5}}>
                        <View style={{borderWidth:1,borderRadius:'50%',borderColor:'transparent',width:100,height:100,backgroundColor:'gray',opacity:0.5}}></View>
                        <View><Text style={{padding:5,textAlign:'center'}}>Emmie Watson</Text></View>
                        <View><Text style={{color:'gray',padding:5,textAlign:'center'}}>emmie1709@gmail.com</Text></View>
                    </View>
                    <View style={{display:'flex',alignContent:'flex-start',justifyContent:'flex-start',borderWidth:1,borderRadius:5,borderColor:'transparent',backgroundColor:'white',margin:10,padding:5}}>
                        <View ><Text style={{padding:5,fontWeight:500}}>My Account</Text></View>
                        <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}><Octicons name="person-add" size={24} color="black" /><Text style={{padding:5,margin:2}}>Personal information</Text></View>
                        <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                            <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}><MaterialIcons name="language" size={15} color="black" /><Text style={{padding:5,margin:2}}>Language</Text></View>
                            <View><Text style={{color:'gray',marginLeft:150}}>English (US)</Text></View>
                        </View>
                        <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}><AntDesign name="find" size={15} color="black" /><Text style={{padding:5,margin:2}}>Privacy Policy</Text></View>
                        <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}><SimpleLineIcons name="settings" size={15} color="black" /><Text style={{padding:5,margin:2}}>Setting</Text></View>
                    </View>
                    <View style={{borderWidth:1,borderRadius:5,borderColor:'transparent',backgroundColor:'white',margin:10,padding:5}}>
                        <View><Text style={{padding:5,fontWeight:500}}>Notifications</Text></View>
                        <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start' }}><Fontisto name="bell" size={15} color="black" /><Text style={{padding:5}}>Push Notications</Text></View>
                            <View style={{marginLeft:155}}><Feather name="toggle-right" size={24} color="green" /></View>
                        </View>
                        <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}><Fontisto name="bell" size={15} color="black" /><Text style={{padding:5}}>Promotional Notifications</Text></View>
                            <View style={{marginLeft:100}}><Feather name="toggle-left" size={24} color="gray" /></View>
                        </View>
                    </View>
                    <View style={{display:'flex',alignContent:'flex-start',justifyContent:'flex-start',borderWidth:1,borderRadius:5,borderColor:'transparent',backgroundColor:'white',margin:10,padding:5}}>
                        <View ><Text style={{padding:5,fontWeight:500}}>More</Text></View>
                        <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}><Entypo name="info-with-circle" size={15} color="black" /><Text style={{padding:5}}>Help Center</Text></View>
                        <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}><Entypo name="log-out" size={15} color="red" /><Text style={{padding:5,color:'red'}}>Log out</Text></View>
                    </View>
                    
                </ScrollView>
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
        justifyContent: 'space-between',
        backgroundColor: 'whitesmoke',
    },

});