import {
  ActivityIndicator,
  Alert,
  Image,
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

import { useAuth } from '@/contexts/AuthContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN = 6;

export default function Signup() {
  const { t } = useTranslation();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = (): string | null => {
    if (!name.trim()) return t('signup.errors.name');
    if (!phone.trim()) return t('signup.errors.phone');
    if (!EMAIL_REGEX.test(email.trim())) return t('signup.errors.email');
    if (password.length < PASSWORD_MIN) return t('signup.errors.password');
    return null;
  };

  const handleRegister = async () => {
    setError(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      await register(email.trim(), password, {
        name: name.trim(),
        phone: phone.trim(),
      });
      router.push('/log');
    } catch (err) {
      console.error('[Signup] register failed', err);
      Alert.alert(t('signup.errors.title'), t('signup.errors.generic'));
    } finally {
      setLoading(false);
    }
  };

  const comingSoon = () =>
    Alert.alert(t('signup.comingSoonTitle'), t('signup.comingSoonMessage'));

  return (
    <SafeAreaView style={styles.area} edges={['bottom']}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.push('/option')}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel={t('signup.back')}
          >
            <AntDesign name="left" size={22} color="white" />
          </Pressable>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {t('signup.headerTitle')}
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
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.form}>
              <Text style={styles.label}>{t('signup.nameLabel')}</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder={t('signup.namePlaceholder')}
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                editable={!loading}
                autoCapitalize="words"
                autoComplete="name"
              />

              <Text style={styles.label}>{t('signup.phoneLabel')}</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder={t('signup.phonePlaceholder')}
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                editable={!loading}
                keyboardType="phone-pad"
                autoComplete="tel"
              />

              <Text style={styles.label}>{t('signup.emailLabel')}</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder={t('signup.emailPlaceholder')}
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                editable={!loading}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
              />

              <Text style={styles.label}>{t('signup.passwordLabel')}</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder={t('signup.passwordPlaceholder')}
                  placeholderTextColor="#9CA3AF"
                  style={styles.passwordInput}
                  secureTextEntry={!showPassword}
                  editable={!loading}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="password-new"
                />
                <Pressable
                  onPress={() => setShowPassword((v) => !v)}
                  style={styles.passwordToggle}
                  accessibilityRole="button"
                  accessibilityLabel={
                    showPassword
                      ? t('signup.hidePassword')
                      : t('signup.showPassword')
                  }
                >
                  <AntDesign
                    name={showPassword ? 'eye-invisible' : 'eye'}
                    size={18}
                    color="#6B7280"
                  />
                </Pressable>
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <Pressable
                onPress={handleRegister}
                disabled={loading}
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.buttonPressed,
                  loading && styles.buttonDisabled,
                ]}
                accessibilityRole="button"
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : null}
                <Text style={styles.primaryButtonText}>
                  {loading ? t('signup.submitting') : t('signup.submit')}
                </Text>
              </Pressable>

              <Pressable onPress={() => router.push('/log')}>
                <Text style={styles.loginRedirect}>
                  {t('signup.haveAccount')}{' '}
                  <Text style={styles.loginLink}>{t('signup.login')}</Text>
                </Text>
              </Pressable>

              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>{t('signup.or')}</Text>
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
                  style={styles.socialIcon}
                />
                <Text style={styles.socialText}>
                  {t('signup.continueWithFacebook')}
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
                  style={styles.socialIcon}
                />
                <Text style={styles.socialText}>
                  {t('signup.continueWithGoogle')}
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
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSpacer: { width: 44 },
  scrollContent: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: 'white',
    fontSize: 14,
    color: '#111827',
    marginBottom: 14,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 14,
    minHeight: 48,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#111827',
  },
  passwordToggle: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 13,
    color: '#EF4444',
    marginBottom: 8,
  },
  primaryButton: {
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
  buttonPressed: { opacity: 0.85 },
  buttonDisabled: { opacity: 0.6 },
  loginRedirect: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 13,
    marginTop: 16,
  },
  loginLink: { color: 'green', fontWeight: '700' },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 8,
  },
  divider: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  dividerText: { color: '#6B7280', fontSize: 13, paddingHorizontal: 8 },
  socialButton: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
    borderRadius: 10,
    gap: 10,
    marginBottom: 10,
    paddingHorizontal: 12,
  },
  socialIcon: { width: 20, height: 20 },
  socialText: { fontSize: 14, fontWeight: '600', color: '#111827' },
});