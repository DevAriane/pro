import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, SafeAreaView} from 'react-native';
import { Link } from 'expo-router';

function App() {
    return (
     <SafeAreaView style={styles.area}>
        <View style={styles.containt}>
        <View style={styles.vie}>
               <Image source={require('../../assets/images/image.png')} resizeMode='contain' style={{width:200,height:200}}/>
            </View>
            <Link href='/onboarding'><Text>click here</Text> </Link>
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
        justifyContent: 'space-around',
        backgroundColor: 'whitesmoke',
        margin:5,
    },
vie:{
marginVertical:'auto',
marginHorizontal:'auto',
 
},
});