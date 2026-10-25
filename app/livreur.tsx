import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';

export default function Livreur() {
  const router = useRouter();
  const { t } = useTranslation();
  const { loginPartner } = useAuth();
  
  const [email, setEmail] = useState<string>('');
  const [pass, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await loginPartner(email, pass);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t('auth.emailLabel')}</Text>
          <TextInput
            placeholder={t('auth.emailPlaceholder')}
            placeholderTextColor="gray"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t('auth.passwordLabel')}</Text>
          <TextInput
            placeholder={t('auth.passwordPlaceholder')}
            placeholderTextColor="gray"
            style={styles.input}
            secureTextEntry
            value={pass}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.rowBetween}>
          <View style={styles.rememberView}>
            <Text style={styles.rememberText}>{t('auth.rememberMe')}</Text>
          </View>
          <Link href="/password" style={styles.forgotPassword}>
            {t('auth.forgotPassword')}
          </Link>
        </View>

        <TouchableOpacity 
          onPress={handleLogin}
          disabled={loading}
          style={styles.loginButton}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" style={styles.indicator} />
          ) : (
            <Text style={styles.loginButtonText}>{t('auth.loginButtonPartner')}</Text>
          )}
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    paddingHorizontal: 10,

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
    fontSize: 15,
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
    borderColor: '#D1D5DB',
    height: 48,
    paddingHorizontal: 12,
    color: '#1F2937',
    width: '100%',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  rememberView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: 14,
    color: '#4B5563',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  loginButton: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  indicator: {
    marginRight: 8,
  },
});