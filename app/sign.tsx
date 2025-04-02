import {Image,StyleSheet,Text,TouchableOpacity,View,TextInput,ScrollView,SafeAreaView,ActivityIndicator,Pressable,Platform,StatusBar} from 'react-native';

import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

import AntDesign from '@expo/vector-icons/AntDesign';

import { auth, firestore } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

function App() {
    const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;
    const { register, logout } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loading) {
            const timer = setTimeout(() => setLoading(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [loading]);

    const handleRegister = async () => {
        if (!email || !password || !name || !phone) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        const userData = { name, phone };

        try {
            setLoading(true);
            await register(email, password, userData);
            router.push('/log');
        } catch (error) {
            console.error('Inscription échouée:', error);
    
        }
    };

    const addUser = async (user) => {
        try {
            await addDoc(collection(firestore, 'users'), {
                uid: user.uid,
                email: user.email,
                role: 'user',
                name: name || 'No name provided',
                phone,
                createdAt: new Date()
            });
            router.push('/log');
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        }
    };

    return (
        <SafeAreaView style={styles.area}>
            <StatusBar backgroundColor="green" style="light" />
            <View style={styles.container}>
                <View style={[styles.header, { marginTop: statusBarHeight }]}>
                <TouchableOpacity onPress={()=>router.push("/option")} style={{marginLeft:10}} >
            {" "}
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
                    <Text style={styles.headerTitle}>Inscription</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Nom :</Text>
                        <TextInput
                            placeholder="Entrez votre nom"
                            placeholderTextColor="gray"
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />

                        <Text style={styles.label}>Numéro de téléphone :</Text>
                        <TextInput
                            placeholder="Entrez votre numéro de téléphone"
                            placeholderTextColor="gray"
                            style={styles.input}
                            value={phone}
                            onChangeText={setPhone}
                        />

                        <Text style={styles.label}>Email :</Text>
                        <TextInput
                            keyboardType="email-address"
                            placeholder="Entrez votre adresse email"
                            placeholderTextColor="gray"
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Text style={styles.label}>Mot de passe :</Text>
                        <TextInput
                            secureTextEntry
                            placeholder="Entrez votre mot de passe"
                            placeholderTextColor="gray"
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity onPress={handleRegister} disabled={loading} style={styles.registerButton}>
                        {loading ? <ActivityIndicator size="small" color="white" style={styles.indicator} /> : null}
                        <Text style={styles.registerText}>Inscription</Text>
                    </TouchableOpacity>

                    <Pressable onPress={() => router.push('/log')}>
                        <Text style={styles.loginRedirect}>
                            Vous avez déjà un compte ?
                            <Text style={styles.loginLink}> Connexion</Text>
                        </Text>
                    </Pressable>

                    <Text style={styles.separator}>-------------------- ou --------------------</Text>

                    <View style={styles.socialLogin}>
                        <Image source={require('../assets/images/facebook.png')} style={styles.socialIcon} />
                        <Text style={styles.socialText}>Continuer avec Facebook</Text>
                    </View>
                    <View style={styles.socialLogin}>
                        <Image source={require('../assets/images/google.png')} style={styles.socialIcon} />
                        <Text style={styles.socialText}>Continuer avec Google</Text>
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
        backgroundColor: 'whitesmoke',
    },
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        backgroundColor: 'green',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        position: 'absolute',
        top: 0,
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    formGroup: {
        marginTop: 140,
        paddingHorizontal: 20,
    },
    label: {
        padding: 5,
        fontSize: 18,
    },
    input: {
        backgroundColor: 'white',
        fontSize: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        height: 40,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    registerButton: {
        backgroundColor: 'green',
        borderRadius: 10,
        paddingVertical: 10,
        marginHorizontal: 20,
        alignItems: 'center',
        display:'flex',
        justifyContent:"center"
    },
    registerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loginRedirect: {
        color: 'gray',
        textAlign: 'center',
        marginTop: 10,
    },
    loginLink: {
        color: 'blue',
        fontWeight: 'bold',
    },
    separator: {
        color: 'gray',
        textAlign: 'center',
        marginVertical: 10,
    },
    socialLogin: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'lightgray',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 20,
        justifyContent: 'center',
        marginBottom: 10,
    },
    socialIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    socialText: {
        fontWeight: '500',
    },
    indicator: {
        marginRight: 10,
    },
});
