import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, SafeAreaView, Alert ,ActivityIndicator, Pressable} from 'react-native';
import { Link } from 'expo-router';
import CheckBox from '@react-native-community/checkbox';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

import { auth, firestore } from '../firebase'


import AntDesign from '@expo/vector-icons/AntDesign';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'expo-router'; // Import the useRouter hook for navigation
import { useAuth } from '@/contexts/AuthContext';


function App() {
    const { user, login, logout, register } = useAuth();

    const [email, setEmail] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [pass, setPassword] = useState<string>();
    const [name, setName] = useState<string>();
const [loading,setLoading]=useState(false)
    const router = useRouter();
    // const userRef = collection('users')

    // Get user document with an ID of ABC
    //const userDocument = firestore().collection('Users').doc('ABC');
    console.log('name', name);
    console.log('email', email);
    console.log('pass', pass);

    const handleRegister = async () => {
        console.log('signe ');
        const userData = {
            name: name || 'No name provided',
            phone: phone,
        }

        try {
         setLoading(true);
            await register(email, pass, userData);
            setTimeout(()=>{
                setLoading(false);
            },3000)
        } catch (error) {
            console.error('Login failed:', error);
        }
        console.log('userData', userData);
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };


    // const registre = async () => {
    //     if (email && pass) {
    //         try {
    //             // const response = await signInWithEmailAndPassword(auth, )
    //             const response = await createUserWithEmailAndPassword(auth, email, pass);
    //             // const response: any = await auth.createUserWithEmailAndPassword(email, pass);
    //             if (response.user) {
    //                 console.log("response.user", response.user);
    //                 addUser(response.user);
    //             }
    //         } catch (error) {
    //             // Firebase error codes
    //             if (error?.code === 'auth/email-already-in-use') {
    //                 Alert.alert('Erreur', 'Cet email est déjà utilisé, essayez un autre.');
    //             } else if (error?.code === 'auth/invalid-email') {
    //                 Alert.alert('Erreur', 'L\'adresse email est invalide.');
    //             } else if (error?.code === 'auth/weak-password') {
    //                 Alert.alert('Erreur', 'Le mot de passe est trop faible.');
    //             } else {
    //                 // For any other error, we display a generic message
    //                 Alert.alert('Erreur', 'Une erreur s\'est produite. Veuillez réessayer.');
    //             }
    //             console.error("Firebase registration error: ", error);
    //         }
    //     }
    // };
    const addUser = async (user: any) => {
        try {

            await addDoc(collection(firestore, 'users'), {
                uid: user.uid,
                email: user.email,
                role: 'user',
                name: name || 'No name provided',
                phone: phone,
                createdAt: new Date()
            });


            router.push('/log');

            // await addDoc(collection(firestore, 'users')({
            //     id: user.uid,
            //     email: user.email, // Store email instead of password
            //     role: 'user',
            //     name: name || 'Nom non fourni', // Use displayName if available
            //     createdAt: firestore.FieldValue.serverTimestamp(),
            // });
        } catch (error) {
            console.error("Error adding user to Firestore:", error);
        }
    };

    return (
        <SafeAreaView style={styles.area}>
            <StatusBar style='light' />
            <View style={styles.containt}>
                <View style={styles.hidden}>
                    <Pressable onPress={()=>router.push('/option')} style={{marginLeft:10}}>  <AntDesign name="left" size={24} color="white" /></Pressable>
                    <View style={{ marginHorizontal: 'auto', }}> <Text style={{ color: 'white', fontSize: 20,fontWeight:"bold" }}>Inscription</Text></View>
                </View>
                <View >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ marginVertical: 4 }}>
                            <View>
                                <Text style={{ padding: 5, fontSize: 18, marginLeft: 20 }}>Nom :</Text>
                                <TextInput

                                    placeholder='Entrez votre nom'
                                    placeholderTextColor='gray'
                                    style={styles.input}
                                    value={name}
                                    onChangeText={(text) => {
                                        setName(text);
                                    }}
                                />

                                <Text style={{ padding: 5, fontSize: 18, marginLeft: 20 }}>Numéro de téléphone :</Text>
                                <TextInput

                                    placeholder='Entrez votre numéro de téléphone'
                                    placeholderTextColor='gray'
                                    style={styles.input}
                                    value={phone}
                                    onChangeText={(text) => {
                                        setPhone(text);
                                    }}
                                />

                                <Text style={{ padding: 5, fontSize: 18, marginLeft: 20 }}>Email :</Text>
                                <TextInput
                                    keyboardType='email-address'
                                    placeholder='Entrz votre adresse email'
                                    placeholderTextColor='gray'
                                    style={styles.input}
                                    value={email}
                                    onChangeText={(text) => {
                                        setEmail(text);
                                    }}
                                />

                            </View>
                            <View >
                                <Text style={{ padding: 5, fontSize: 18, marginLeft: 20 }}>Mot de passe :</Text>
                                <TextInput
                                    placeholder='Entrez votre mot passe'
                                    placeholderTextColor='gray'
                                    style={styles.input}
                                    value={pass}
                                    onChangeText={(word) => {
                                        setPassword(word);
                                    }}
                                />
                            </View>
                            <View >
                                <Text style={{ padding: 5, fontSize: 18, marginLeft: 20 }}>Confirmez votre mot de passe </Text>
                                <TextInput placeholder='Entrez votre mot passe' placeholderTextColor='gray' style={styles.input} />
                            </View>
                        </View>

                        <View>
                            <TouchableOpacity onPress={() => { handleRegister() }} disabled={loading} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>  <Text style={styles.text} > {loading && (
                                <ActivityIndicator
                                    size="small"
                                    color="white"
                                    style={styles.indicator}
                                />
                            )} Inscription</Text> </TouchableOpacity>

                        </View>
                         <View>
                                  <Pressable onPress={()=>router.push('/log')} >  
                                  <Text style={{ color: "gray", textAlign: "center",margin:5 }}>
                                    Avez vous déja un compte? 
                                  
                                      <Text style={{ color:"blue", fontWeight:'bold' }}> Connexion </Text>
                                   
                                  </Text>
                                  </Pressable>
                                  </View>
                        <Text style={{ color: 'gray', marginLeft: 30, marginVertical: 6 }}>----------------------------------ou-------------------------------------</Text>

                        <View style={styles.ali}>
                            <Image source={require('../assets/images/facebook.png')} resizeMode='contain' style={{ width: 20, height: 20 }} />
                            <Text style={{ fontWeight: 500 }}>Continuer avec facebook</Text>
                        </View>
                        <View style={styles.ali}>
                            <Image source={require('../assets/images/google.png')} resizeMode='contain' style={{ width: 20, height: 20 }} />
                            <Text style={{ fontWeight: 500 }}>Continue avec Google</Text>
                        </View>
                    </ScrollView>
                </View>
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
        display: 'flex',
        flexDirection: 'row', alignItems: 'center',
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
    indicator: { marginLeft: 10 },
    hidden: {
        width: "100%",
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
        fontWeight:'bold',
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