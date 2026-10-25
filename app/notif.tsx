import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function fetchPushToken(): Promise<string | null> {
  if (!Device.isDevice) return null;

  const { status: existing } = await Notifications.getPermissionsAsync();
  let status = existing;
  if (status !== 'granted') {
    const req = await Notifications.requestPermissionsAsync();
    status = req.status;
  }
  if (status !== 'granted') return null;

  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;
  if (!projectId) return null;

  try {
    const token = await Notifications.getExpoPushTokenAsync({ projectId });
    return token.data;
  } catch {
    return null;
  }
}

export default function Notif() {
  const { t } = useTranslation();
  const [token, setToken] = useState<string>('');
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.EventSubscription | null>(
    null
  );
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (Device.osName === 'Android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#10B981',
      });
    }

    fetchPushToken().then((tk) => {
      if (!cancelled) setToken(tk ?? t('notif.tokenUnavailable'));
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((n) => setNotification(n));
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((resp) => {
        console.log('[Notifications] response', resp);
      });

    return () => {
      cancelled = true;
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [t]);

  const sendTest = useCallback(async () => {
    if (!token || token === t('notif.tokenUnavailable')) {
      Alert.alert(t('notif.tokenMissingTitle'), t('notif.tokenMissingBody'));
      return;
    }
    try {
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: token,
          sound: 'default',
          title: t('notif.testTitle'),
          body: t('notif.testBody'),
          data: { source: 'debug' },
        }),
      });
    } catch (error) {
      console.error('[Notifications] send failed', error);
      Alert.alert(t('notif.sendFailedTitle'), t('notif.sendFailedBody'));
    }
  }, [token, t]);

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="#10B981" style="light" />
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>{t('notif.debugTitle')}</Text>
        <Text style={styles.tokenLabel} numberOfLines={2}>
          {t('notif.tokenLabel')} {token}
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('notif.lastNotificationTitle')}</Text>
          <Text style={styles.cardText} numberOfLines={2}>
            {notification?.request?.content?.title ??
              t('notif.noNotificationYet')}
          </Text>
          <Text style={styles.cardText} numberOfLines={2}>
            {notification?.request?.content?.body ?? ''}
          </Text>
        </View>

        <Pressable
          onPress={sendTest}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
          accessibilityRole="button"
        >
          <Text style={styles.primaryButtonText}>
            {t('notif.sendTest')}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1, backgroundColor: '#F9FAFB' },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  tokenLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#111827' },
  cardText: { fontSize: 13, color: '#6B7280' },
  primaryButton: {
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonPressed: { opacity: 0.85 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
});