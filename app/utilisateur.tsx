import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';

import { useAuth } from '@/contexts/AuthContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Utilisateur() {
  const { loading, login } = useAuth();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);

    if (!EMAIL_REGEX.test(email.trim())) {
      setError(t('auth.errors.email'));
      return;
    }
    if (!password) {
      setError(t('auth.errors.password'));
      return;
    }

    try {
      await login(email.trim(), password);
    } catch (err) {
      console.error('[Login] failed', err);
      Alert.alert(t('auth.errors.title'), t('auth.errors.generic'));
    }
  };

  const comingSoon = () =>
    Alert.alert(t('auth.comingSoonTitle'), t('auth.comingSoonMessage'));

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t('auth.emailLabel')}</Text>
          <TextInput
            placeholder={t('auth.emailPlaceholder')}
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />
        </View>

        {/* Mot de passe + toggle */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t('auth.passwordLabel')}</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder={t('auth.passwordPlaceholder')}
              placeholderTextColor="#9CA3AF"
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
            />
            <Pressable
              onPress={() => setShowPassword((v) => !v)}
              style={styles.passwordToggle}
              accessibilityRole="button"
              accessibilityLabel={
                showPassword
                  ? t('auth.hidePassword')
                  : t('auth.showPassword')
              }
            >
              <AntDesign
                name={showPassword ? 'eye-invisible' : 'eye'}
                size={18}
                color="#6B7280"
              />
            </Pressable>
          </View>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Se souvenir / Mot de passe oublié */}
        <View style={styles.rowBetween}>
          <Text style={styles.rememberText}>{t('auth.rememberMe')}</Text>
          <Pressable onPress={() => router.push('/password')}>
            <Text style={styles.forgotPassword}>
              {t('auth.forgotPassword')}
            </Text>
          </Pressable>
        </View>

        {/* Bouton de connexion */}
        <Pressable
          onPress={handleLogin}
          disabled={loading}
          style={({ pressed }) => [
            styles.loginButton,
            pressed && styles.buttonPressed,
            loading && styles.buttonDisabled,
          ]}
          accessibilityRole="button"
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.loginButtonText}>{t('auth.loginButton')}</Text>
          )}
        </Pressable>

        {/* Séparateur OU */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>{t('auth.or')}</Text>
          <View style={styles.line} />
        </View>

        {/* Redirection inscription */}
        <Pressable
          onPress={() => router.push('/sign')}
          style={styles.registerContainer}
        >
          <Text style={styles.registerText}>
            {t('auth.noAccount')}{' '}
            <Text style={styles.registerLink}>{t('auth.register')}</Text>
          </Text>
        </Pressable>

        {/* Facebook */}
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
          <Text style={styles.socialButtonText}>
            {t('auth.continueFacebook')}
          </Text>
        </Pressable>

        {/* Google */}
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
          <Text style={styles.socialButtonText}>
            {t('auth.continueGoogle')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: 'white',
    fontSize: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 48,
    paddingHorizontal: 14,
    color: '#111827',
    width: '100%',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    backgroundColor: 'white',
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
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  rememberText: {
    fontSize: 14,
    color: '#4B5563',
  },
  forgotPassword: {
    fontSize: 14,
    color: 'green',
    fontWeight: '600',
  },
  loginButton: {
    minHeight: 48,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonPressed: { opacity: 0.85 },
  buttonDisabled: { opacity: 0.6 },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  orText: {
    color: '#9CA3AF',
    marginHorizontal: 12,
    fontSize: 14,
  },
  registerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  registerText: {
    color: '#6B7280',
    fontSize: 14,
  },
  registerLink: {
    color: 'green',
    fontWeight: '700',
  },
  socialButton: {
    minHeight: 48,
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 12,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
});