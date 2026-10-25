import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

type DraftParams = {
  id?: string;
  image?: string;
  titre?: string;
  lieu?: string;
  etoile?: string;
  jour?: string;
  debut?: string;
  fin?: string;
};

export default function Draft() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<DraftParams>();

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="#10B981" style="light" />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>
            {params.titre ?? t('draft.placeholderTitle')}
          </Text>
          <Text style={styles.subtitle}>{t('draft.emptyState')}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1, backgroundColor: '#F9FAFB' },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  content: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});