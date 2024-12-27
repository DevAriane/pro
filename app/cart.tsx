import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, SafeAreaView } from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import { StatusBar } from 'expo-status-bar';
import { Link, useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
function App() {
    const router=useRouter();
    const {id, image, titre,menu,prix ,commentaire,price,m,count} = useLocalSearchParams();
    console.log('count',count);
    console.log('m',m);
    return (
        <SafeAreaView style={styles.area}>
            <StatusBar backgroundColor='green' style='light' />
            <View style={styles.containt}>
                <View style={styles.hidden}>
                    <Link href='/food'> <AntDesign name="left" size={24} color="white" /></Link>
                    <View style={{marginHorizontal:'auto'}}> <Text style={{  color: 'white', fontSize: 24 }}>Cart</Text></View>
                </View>
                <View style={{marginTop:"10%"}}>
                <View style={styles.a}>
                    <View> <Image source={image} style={{ width: 50, height: 50, borderColor: 'transparent', borderWidth: 1, borderRadius: 2 }} resizeMode="cover"/></View>
                    <View>
                        <Text style={{color:'orangered',fontStyle:20,fontweigth:'500'} }>{titre}</Text>
                        <Text>quantité commandée: <Text style={{color:'blue',fontStyle:20,fontweigth:'500'}}> {count}</Text> </Text>
                        <Text>montant net à payer:<Text style={{color:'red',fontStyle:20,fontweigth:'500'}} > {m} FCFA</Text> </Text>
                    </View>
                </View>
                <View style={{marginHorizontal:'auto'}}> 
                    <Text style={{color:'white',borderColor:'transparent',borderWidth:1,borderRadius:5,backgroundColor:'green',width:100,padding:5,height:40,textAlign:'center',fontWeight:'800',marginVertical:2}}>
                        <Link href='/comming' >Add Food</Link></Text>
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
    hidden: {
        width:"100%",
        top: 0,
        position: 'fixed',
        height: 120,
        backgroundColor: 'green',
        display: 'flex',
        flexDirection: 'row',
        color: 'white',
        alignItems: 'center',

    },
    a: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: 'gray',
        justifyContent: 'space-around',
        margin: 5,
        borderRadius:5,
        marginVertical: 20,
        backgroundColor:'white',
    },
});