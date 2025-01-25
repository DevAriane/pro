import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { router } from 'expo-router'; // Vous n'avez pas besoin de Link ici
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/contexts/AuthContext';

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { getUserData, storeUserData } = useAuth(); // Utilisation du contexte

  useEffect(() => {
    const checkUser = async () => {
      const userData = await getUserData(); // Vérifier si des données d'utilisateur sont stockées
      if (userData) {
        setUser(userData);
        setIsLoggedIn(true); // Utilisateur est connecté
      }
    };

    checkUser(); // Vérifie si l'utilisateur est déjà connecté
  }, []); // Ce useEffect ne s'exécute qu'une seule fois au démarrage

  const handleGetStarted = () => {
    if (isLoggedIn && user) {
      router.push('/(tabs)'); // Si l'utilisateur est connecté, redirigez-le vers la page d'accueil ou les tabs
    } else {
      alert('Veuillez vous connecter');
      router.push('/log'); // Affichez un message si l'utilisateur n'est pas connecté
    }
  };

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.containt}>
        <View style={styles.image}>
          <Image
            source={require('../assets/images/shooping.png')}
            resizeMode="contain"
            style={{ width: 350, height: 500 }}
          />
        </View>
        <View style={styles.a}>
          <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '400' }}>Explore now</Text>
          <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '400' }}>to experience the benefits</Text>
          <Text style={{ textAlign: 'center', marginVertical: 20 }}>
            vivez et découvrez les plaisirs que le digital nous offre
          </Text>
          <TouchableOpacity onPress={handleGetStarted}> {/* Appel à handleGetStarted */}
            <View style={styles.text}>
              <Text style={{ color: 'white', textAlign: 'center', marginVertical: 'auto' }}>Get Started</Text>
            </View>
          </TouchableOpacity>
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
    margin: 7,
  },
  image: {
    marginHorizontal: 'auto',
  },
  a: {
    display: 'flex',
    justifyContent: 'space-around',
    marginHorizontal: 'auto',
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
    marginHorizontal: 'auto',
  },
});
