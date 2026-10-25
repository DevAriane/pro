import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: t('notFound.headerTitle') }} />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.content}>
          <ThemedText type="title" style={styles.title}>
            {t('notFound.title')}
          </ThemedText>
          <ThemedText type="default" style={styles.subtitle}>
            {t('notFound.subtitle')}
          </ThemedText>
          <Link href="/" style={styles.link}>
            <ThemedText type="link" style={styles.linkText}>
              {t('notFound.backHome')}
            </ThemedText>
          </Link>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#F9FAFB',
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 28,
    opacity: 0.7,
  },
  link: {
    width: '100%',
    minHeight: 48,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
});