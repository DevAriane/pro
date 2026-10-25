import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  const comingSoon = () =>
    Alert.alert(t('welcome.comingSoonTitle'), t('welcome.comingSoonMessage'));

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="#10B981" style="light" />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoWrapper}>
            <Image
              source={require('../assets/images/image.png')}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>

          <Pressable
            onPress={() => router.push('/log')}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
          >
            <Text style={styles.primaryButtonText}>
              {t('welcome.login')}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/sign')}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
          >
            <Text style={styles.secondaryButtonText}>
              {t('welcome.signup')}
            </Text>
          </Pressable>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>{t('welcome.or')}</Text>
            <View style={styles.divider} />
          </View>

          <Pressable
            onPress={comingSoon}
            style={({ pressed }) => [
              styles.socialButton,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
          >
            <Image
              source={require('../assets/images/facebook.png')}
              resizeMode="contain"
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>
              {t('welcome.continueWithFacebook')}
            </Text>
          </Pressable>

          <Pressable
            onPress={comingSoon}
            style={({ pressed }) => [
              styles.socialButton,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
          >
            <Image
              source={require('../assets/images/google.png')}
              resizeMode="contain"
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>
              {t('welcome.continueWithGoogle')}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { flex: 1 },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'center',
    gap: 12,
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: { width: 200, height: 200 },
  primaryButton: {
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryButton: {
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#10B981',
    fontWeight: '700',
    fontSize: 15,
  },
  buttonPressed: { opacity: 0.85 },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 8,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    color: '#6B7280',
    fontSize: 13,
    paddingHorizontal: 8,
  },
  socialButton: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    gap: 10,
    paddingHorizontal: 12,
  },
  socialIcon: { width: 20, height: 20 },
  socialText: { fontSize: 14, fontWeight: '600', color: '#111827' },
});