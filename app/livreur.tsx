import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, SafeAreaView,Alert, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import CheckBox from '@react-native-community/checkbox';
import { StatusBar } from 'expo-status-bar';
import { auth, firestore } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'expo-router'; // Import the useRouter hook for navigation
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

function Livreur() {
  const router = useRouter();
    const [email, setEmail] = useState<string>();
    const [pass, setPassword] = useState<string>();
    const [name, setName] = useState<string>();
   
    const {  loginPartner} = useAuth();
    
    const [loading, setLoading] = useState(false);
 
 
     const handleLogin = async () => {
         try {
          
           setLoading(true); 
           await loginPartner(email, pass);
                // Simuler une opération de connexion (par exemple, une requête API) 
              setTimeout(() => { setLoading(false);
                    // Ici, vous pouvez ajouter la logique pour rediriger l'utilisateur ou afficher un message de succès 
                    Alert.alert('succès');
                    }, 3000); // 3 secondes
         } catch (error) {
           console.error('Login failed:', error);
         }
       };

    // const connexion=async()=>{
    //     try {
    //           const response = await signInWithEmailAndPassword(auth, email,pass);
    //         if(response.user){
    //             router.push('/livreuurProfil');
    //         }
            
    //     } catch (error) {
    //          // Firebase error codes
    //          if (error?.code === 'auth/email-already-in-use') {
    //             Alert.alert('Erreur', 'Cet email est déjà utilisé, essayez un autre.');
    //         } else if (error?.code === 'auth/invalid-email') {
    //             Alert.alert('Erreur', 'L\'adresse email est invalide.');
    //         } else if (error?.code === 'auth/weak-password') {
    //             Alert.alert('Erreur', 'Le mot de passe est trop faible.');
    //         } else {
    //             // For any other error, we display a generic message
    //             Alert.alert('Erreur', 'Une erreur s\'est produite. Veuillez réessayer.');
    //         }
    //         console.error("Firebase registration error: ", error);
    //     }
    // }
    

    return (
        <SafeAreaView style={styles.area}>
            <StatusBar backgroundColor='green' style='light' />
            <View style={styles.containt}>
                <View>
                    <View style={{ marginVertical: 30 }}>
                        <View>
                            <Text style={{ padding: 5, fontSize: 18, marginLeft:"30%" }}>Email</Text>
                            <TextInput placeholder='Text your email' placeholderTextColor='gray' style={styles.input} 
                              keyboardType='email-address'
                              value={email}
                              onChangeText={(text) => {
                                  setEmail(text);
                              }}
                            />
                        </View>
                        <View >
                            <Text style={{ padding: 5, fontSize: 18, marginLeft: "30%" }}>Password</Text>
                            <TextInput placeholder='Text your name' placeholderTextColor='gray' style={styles.input} 
                              value={pass}
                              onChangeText={(word) => {
                                  setPassword(word);
                              }}
                            />
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
<TouchableOpacity onPress={()=>handleLogin()}><Text  style={styles.text}>   {loading && ( <ActivityIndicator size="small" color="white" style={styles.text} /> )}  Log In</Text> </TouchableOpacity>
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
        display: 'flex',
         flexDirection: 'row',
          alignItems: 'center',
          width:300,
          marginHorizontal:'auto',
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