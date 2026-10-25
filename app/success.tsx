import {
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

export default function Success() {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require('../assets/images/img70.jpg')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>{t('success.title')}</Text>
          <Text style={styles.message} numberOfLines={3}>
            {t('success.message')}
          </Text>
        </View>

        <Pressable
          onPress={() => router.push('/(tabs)/reservations')}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
          accessibilityRole="button"
        >
          <Text style={styles.primaryButtonText}>
            {t('success.viewReservations')}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1, backgroundColor: 'white' },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    maxWidth: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  primaryButton: {
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
  buttonPressed: { opacity: 0.85 },
});