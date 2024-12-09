import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, SafeAreaView } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import CheckBox from '@react-native-community/checkbox';
import { StatusBar } from 'expo-status-bar';
import Utilisateur from './utilisateur';
import Livreur from './livreur';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import AntDesign from '@expo/vector-icons/AntDesign';
function App() {
    const [affiche, setAffiche] = useState(true);
    
    const router=useRouter();
    const {id, image, titre,lieu,etoile,jour,debut,fin} = useLocalSearchParams();

    return (
        <SafeAreaView style={styles.area}>
            <StatusBar backgroundColor='green' style='light' />
            <View style={styles.containt}>

                <View style={styles.hidden}>
                    <Link href='/(tabs)'> <AntDesign name="left" size={24} color="white" /></Link>
                    <View style={{marginLeft:20,height:45,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',backgroundColor:'white',borderColor:'transparent',borderRadius:10,width:300}}> 
                    <AntDesign name="search1" size={20} color="lightgray" />
                    <Text>{titre}</Text>
                    <AntDesign name="close" size={20} color="lightgray" />
                    </View>
                </View>

                <View style={{display:'flex',alignItems:'flex-start',margin:5,backgroundColor:'white',marginVertical:20,padding:5,borderColor:'transparent',borderRadius:20}}>
                  
                    <View><Text style={{fontSize:20}}>{titre}</Text></View>
                    <View style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row',margin:5}}><FontAwesome5 name="map-marker-alt" size={15} color="green" /><Text>{lieu}</Text></View>
                   <View style={{margin:5}}> <Image source={image} style={{width:300,height:200}} resizeMode='contain'/></View>
                    <View style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}>
                        <View>
                            <View style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row',margin:5}}><AntDesign name="clockcircle" size={15} color="green" /><Text>Ouvert de  {jour}</Text></View>
                            <Text>De {debut}heures à {fin}heures</Text>
                        </View>
                        <View style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}>
                        <FontAwesome name="xing" size={15} color="blue" />
                            <Text style={{color:'blue'}}>Visit restaurant</Text>
                        </View>
                        <View></View>
                    </View>
            
                </View>

                <View> <Text style={styles.text}><Link href={{pathname:'/comming',params:{id, image, titre,lieu,etoile,jour,debut,fin}, }}> Booking</Link></Text></View>   
            </View>
        </SafeAreaView>
    );
}
export default App;
const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        fontSize: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        height: 40,
        width: 300,
        padding: 5,
        marginHorizontal: 'auto',
        margin: 5,
    },
    vet: {
        justifyContent: 'space-around',
        display: 'flex', flexDirection: 'row', alignItems: 'center',
    },
    area: {
        flex: 1,
    },
    containt: {
        flex: 1,

        backgroundColor: 'whitesmoke',

    },
    vie: {
        marginVertical: 'auto',
        marginHorizontal: 'auto',
    },
    hidden: {
        top: 0,
        marginTop:20,
        position: 'fixed',
        height: 120,
        backgroundColor: 'green',
        display: 'flex',
        flexDirection: 'row',
        color: 'white',
        alignItems: 'center',

    },
    text: {
        height: 40,
        width: 150,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        color: 'white',
        backgroundColor: 'green',
        padding: 5,
        textAlign: 'center',
        marginVertical: 20,
        marginHorizontal: 'auto',
        margin: 5,
        fontWeight:500,
    },
    sign: {
        height: 40,
        width: 300,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        color: 'green',
        backgroundColor: 'white',
        padding: 5,
        textAlign: 'center',
        marginHorizontal: 'auto',
        margin: 5,
    },
    ali: {
        height: 40,
        width: 300,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'lightgray',
        backgroundColor: 'white',
        padding: 5,
        textAlign: 'center',
        marginHorizontal: 'auto',
        margin: 5,
        justifyContent: 'center',
        marginVertical: 10,
    },
});