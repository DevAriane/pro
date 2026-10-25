import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    if (!EMAIL_REGEX.test(email.trim())) {
      setError(t('forgotPassword.invalidEmail'));
      return;
    }
    setLoading(true);
    try {
      // TODO : brancher l'appel backend (sendPasswordResetEmail, etc.)
      await new Promise((res) => setTimeout(res, 600));
      Alert.alert(
        t('forgotPassword.successTitle'),
        t('forgotPassword.successMessage'),
        [{ text: t('forgotPassword.ok'), onPress: () => router.push('/log') }]
      );
    } catch {
      Alert.alert(
        t('forgotPassword.errorTitle'),
        t('forgotPassword.errorMessage')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.area} edges={['bottom']}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.push('/log')}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel={t('forgotPassword.back')}
          >
            <AntDesign name="left" size={22} color="#FFFFFF" />
          </Pressable>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {t('forgotPassword.headerTitle')}
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>
              <Text style={styles.description}>
                {t('forgotPassword.description')}
              </Text>

              <Text style={styles.label}>
                {t('forgotPassword.emailLabel')}
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder={t('forgotPassword.emailPlaceholder')}
                placeholderTextColor="#9CA3AF"
                style={[styles.input, error ? styles.inputError : null]}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                editable={!loading}
              />
              {error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : null}

              <Pressable
                onPress={submit}
                disabled={loading}
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.primaryButtonPressed,
                  loading && styles.primaryButtonDisabled,
                ]}
                accessibilityRole="button"
              >
                <Text style={styles.primaryButtonText}>
                  {loading
                    ? t('forgotPassword.sending')
                    : t('forgotPassword.submit')}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: 'green',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  flex: { flex: 1 },
  header: {
    width: '100%',
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    paddingHorizontal: 8,
    paddingVertical: 25,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSpacer: { width: 44 },
  scrollContent: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    gap: 10,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    color: '#111827',
  },
  inputError: { borderColor: '#EF4444' },
  errorText: { fontSize: 12, color: '#EF4444' },
  primaryButton: {
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  primaryButtonPressed: { opacity: 0.85 },
  primaryButtonDisabled: { opacity: 0.6 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
});