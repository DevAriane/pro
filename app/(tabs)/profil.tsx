import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import LanguageSwitcher from '../languageSwitcher';

import { useAuth } from '@/contexts/AuthContext';

type RowProps = {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  right?: React.ReactNode;
  danger?: boolean;
};

function Row({ icon, label, onPress, right, danger }: RowProps) {
  const inner = (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        {icon}
        <Text
          style={[styles.rowLabel, danger && styles.rowLabelDanger]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
      {right ?? null}
    </View>
  );

  if (!onPress) return inner;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.rowPressed}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {inner}
    </Pressable>
  );
}

export default function Profile() {
  const { t } = useTranslation();
  const { logout, user } = useAuth();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [promoEnabled, setPromoEnabled] = useState(false);

  const comingSoon = () =>
    Alert.alert(t('profile.comingSoonTitle'), t('profile.comingSoonMessage'));

  const handleLogout = () => {
    Alert.alert(
      t('profile.logoutConfirmTitle'),
      t('profile.logoutConfirmMessage'),
      [
        { text: t('profile.cancel'), style: 'cancel' },
        {
          text: t('profile.logout'),
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.area} edges={['bottom']}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('profile.headerTitle')}</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.profileCard}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={require('../../assets/images/delivery.png')}
                  style={styles.avatar}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.name} numberOfLines={1}>
                {user?.name ?? t('profile.unknownUser')}
              </Text>
              <Text style={styles.email} numberOfLines={1}>
                {user?.email ?? ''}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t('profile.accountSection')}
              </Text>
              <Row
                icon={<Octicons name="person-add" size={20} color="green" />}
                label={t('profile.personalInfo')}
                onPress={comingSoon}
                right={<AntDesign name="right" size={16} color="#9CA3AF" />}
              />
              <Row
                icon={
                  <MaterialIcons name="language" size={20} color="green" />
                }
                label={t('profile.language')}
                
                right={
                  <LanguageSwitcher />
                }
              />
              <Row
                icon={<AntDesign name="find" size={20} color="green" />}
                label={t('profile.privacyPolicy')}
                onPress={comingSoon}
                right={<AntDesign name="right" size={16} color="#9CA3AF" />}
              />
              <Row
                icon={
                  <SimpleLineIcons name="settings" size={20} color="green" />
                }
                label={t('profile.settings')}
                onPress={comingSoon}
                right={<AntDesign name="right" size={16} color="#9CA3AF" />}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t('profile.notificationsSection')}
              </Text>
              <Row
                icon={<Fontisto name="bell" size={20} color="green" />}
                label={t('profile.notificationsPush')}
                onPress={() => setPushEnabled((v) => !v)}
                right={
                  <Feather
                    name={pushEnabled ? 'toggle-right' : 'toggle-left'}
                    size={26}
                    color={pushEnabled ? 'green' : '#9CA3AF'}
                  />
                }
              />
              <Row
                icon={<Fontisto name="bell" size={20} color="green" />}
                label={t('profile.notificationsPromo')}
                onPress={() => setPromoEnabled((v) => !v)}
                right={
                  <Feather
                    name={promoEnabled ? 'toggle-right' : 'toggle-left'}
                    size={26}
                    color={promoEnabled ? 'green' : '#9CA3AF'}
                  />
                }
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t('profile.moreSection')}
              </Text>
              <Row
                icon={
                  <Entypo name="info-with-circle" size={20} color="green" />
                }
                label={t('profile.help')}
                onPress={comingSoon}
                right={<AntDesign name="right" size={16} color="#9CA3AF" />}
              />
              <Row
                icon={<Entypo name="log-out" size={20} color="#EF4444" />}
                label={t('profile.logout')}
                onPress={handleLogout}
                danger
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1},
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    width: '100%',
    minHeight: 56,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 25,
  },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  content: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    gap: 14,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  avatar: { width: '100%', height: '100%' },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginTop: 12,
    textAlign: 'center',
  },
  email: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    minHeight: 48,
    borderRadius: 8,
  },
  rowPressed: { backgroundColor: '#F3F4F6' },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  rowLabel: { fontSize: 14, color: '#111827', flexShrink: 1 },
  rowLabelDanger: { color: '#EF4444', fontWeight: '700' },
  rowValue: { fontSize: 13, color: '#6B7280' },
});