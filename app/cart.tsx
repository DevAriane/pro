import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, SafeAreaView } from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import { StatusBar } from 'expo-status-bar';
import { Link, useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
function App() {
     // récupération des props envoyés
  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item) : null;
const {items,pricing}=item;
const {name,quantity,price}=items;
const {net}=pricing;
console.log('ITEM',item);
    return (
        <SafeAreaView style={styles.area}>
            <StatusBar backgroundColor='green' style='light' />
            <View style={styles.containt}>
                <View style={styles.hidden}>
                    <Link href='/food'> <AntDesign name="left" size={24} color="white" /></Link>
                    <View style={{marginHorizontal:'auto'}}> <Text style={{  color: 'white', fontSize: 24 }}>Cart</Text></View>
                </View>
                <View style={{marginVertical:"20%"}}>
                <View style={styles.a}>
                    <View> 
                        {/* <Image source={imageUrl} style={{ width: 50, height: 50, borderColor: 'transparent', borderWidth: 1, borderRadius: 2 }} resizeMode="cover"/> */}
                        </View>
                    <View>
                        <Text style={{color:'orangered',fontStyle:20,fontweigth:'500'} }>{name}</Text>
                        <Text>prix unitaire: <Text style={{color:'blue',fontStyle:20,fontweigth:'500'}}> {price}</Text> </Text>
                        <Text>quantité commandée: <Text style={{color:'blue',fontStyle:20,fontweigth:'500'}}> {quantity}</Text> </Text>
                        <Text>montant net à payer:<Text style={{color:'red',fontStyle:20,fontweigth:'500'}} > {net} FCFA</Text> </Text>
                    </View>
                </View>
                {/* <View style={{marginHorizontal:'auto'}}> 
                    <Text style={{color:'white',borderColor:'transparent',borderWidth:1,borderRadius:5,backgroundColor:'green',width:100,padding:5,height:40,textAlign:'center',fontWeight:'800',marginVertical:2}}>
                        <Link href={{pathname:'/comming',params:{imageUrl,m,count,price,name}}} >Add Food</Link></Text>
                        </View> */}
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