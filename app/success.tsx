import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, Alert, ActivityIndicator, Pressable, SafeAreaView, StatusBar } from "react-native";
import { Link, useLocalSearchParams ,router} from 'expo-router';
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
function Success() {
    return (<SafeAreaView style={styles.area}>
        <StatusBar backgroundColor='green' style='light' />
<View style={styles.containt}>
<View style={styles.Item}>
    <Image source={require("../assets/images/img70.jpg")} style={{width:300,height:300}}/>
    <Text style={{fontWeight:'bold',fontSize:20,margin:5}}>Bravo!!!</Text>
    <Text numberOfLines={3} style={{fontWeight:'bold',color:'gray'}}>Vos réservations ont  bien été enregistrées</Text>
</View>
<TouchableOpacity onPress={()=>router.push('/(tabs)/reservations')} style={styles.touch}><View style={styles.consult}><Text style={{fontWeight:"bold",color:"white",padding:5,}}>Consultez vos réservations</Text></View></TouchableOpacity>
</View>
    </SafeAreaView>)
}
export default Success;

const styles = StyleSheet.create({
    area: {
        flex: 1,
    },
    containt: {
        flex: 1,
        backgroundColor: 'white',
    },
    Item: {
        display: 'flex',
        alignItems: "center", 
        justifyContent: "center", 
        height: "90%", 
        width: "100%", 
    },
    consult:{
        borderColor:"transparent",
        borderWidth:1,
        borderRadius:5,
        padding:5,
        backgroundColor:"green",
        width:200,
        display:'flex',
        alignItems:"center",
        justifyContent:'center',

    },
    touch:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center',
        width:"100%",
    }
    
});
