import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSwitcher from './languageSwitcher';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();
  const { user, setUser, getUserData } = useAuth();
  const [connectedUser, setConnectedUser] = useState();

  useEffect(() => {
    const checkUser = async () => {
      const userData = await getUserData();
      if (userData) {
        setUser(userData);
        setConnectedUser(userData);
      }
    };
    checkUser();
  }, []);

  const handleGetStarted = () => {
    if (connectedUser) {
      router.push('/(tabs)');
    } else {
      router.push('/log');
    }
  };

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        
        {/* Sélecteur de langue positionné proprement en haut à droite */}
        <View style={styles.header}>
          <LanguageSwitcher />
        </View>

        {/* Illustration centrale adaptative */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/shooping.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        {/* Section des textes et du bouton d'action */}
        <View style={styles.footerContainer}>
          <View style={styles.textGroup}>
            <Text style={styles.title}>
              {t('onboarding.exploreNow')}
            </Text>
            <Text style={styles.title}>
              {t('onboarding.enjoyBenefits')}
            </Text>
            <Text style={styles.subtitle}>
              {t('onboarding.digitalPleasures')}
            </Text>
          </View>

          <TouchableOpacity 
            onPress={handleGetStarted} 
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}> 
              {t('onboarding.getStarted')}
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Fond propre et neutre
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
    justifyContent: 'space-between', // Répartit l'espace verticalement de façon fluide
    paddingBottom: 20,
  },
  header: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    maxHeight: 280, // Empêche l'image de devenir géante sur les tablettes
  },
  footerContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  textGroup: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 30,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6B7280',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  button: {
    width: '100%',
    maxWidth: 340, // S'adapte aux grands téléphones tout en gardant une limite élégante
    height: 50,    // Hauteur standard ergonomique pour le tactile
    borderRadius: 12,
    backgroundColor: 'green', // Vert pro (Tailwind Emerald-500)
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,  // Ombre subtile sur Android
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});