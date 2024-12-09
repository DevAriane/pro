import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import CheckBox from '@react-native-community/checkbox';
import { StatusBar } from 'expo-status-bar';

import AntDesign from '@expo/vector-icons/AntDesign';
function Livreur() {
    return (
        <SafeAreaView style={styles.area}>
            <StatusBar backgroundColor='green' style='light' />
            <View style={styles.containt}>
                <View>
                    <View style={{ marginVertical: 30 }}>
                        <View>
                            <Text style={{ padding: 5, fontSize: 18, marginLeft: 20 }}>Email</Text>
                            <TextInput placeholder='Text your email' placeholderTextColor='gray' style={styles.input} />
                        </View>
                        <View >
                            <Text style={{ padding: 5, fontSize: 18, marginLeft: 20 }}>Password</Text>
                            <TextInput placeholder='Text your name' placeholderTextColor='gray' style={styles.input} />
                        </View>
                    </View>
                    <View style={styles.vet}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                            {/* <CheckBox/> */}
                            <Text>Remenber me</Text>
                        </View>
                        <View><Text style={{ color: 'gray' }}><Link href='/password'>Forgot Password?</Link></Text></View>
                    </View>
                    <View>
                        <Text style={styles.text}><Link href='/(tabs)/reservations'> Log In</Link></Text>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
export default Livreur;
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
        width: 300,
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