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
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';

import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';
import { useTracking } from '@/contexts/TrackingContext';
import Available from './available';
import Encours from './encours';
import Delivery from './delivery';

type TabKey = 'available' | 'encours' | 'delivered';

const TAB_KEYS: TabKey[] = ['available', 'encours', 'delivered'];
const TAB_LABEL_KEYS: Record<TabKey, string> = {
  available: 'driverDashboard.tabAvailable',
  encours: 'driverDashboard.tabOngoing',
  delivered: 'driverDashboard.tabDelivered',
};

export default function LivreurProfil() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { orders } = useOrders();
  const { socket, isConnected } = useTracking();
  const [activeTab, setActiveTab] = useState<TabKey>('available');

  useEffect(() => {
    if (!socket || !isConnected) return;
    const handler = (data: unknown) => {
      // Hook applicatif — brancher ici un refresh des commandes si besoin
      console.log('[Tracking] order_update', data);
    };
    socket.on('order_update', handler);
    return () => {
      socket.off('order_update', handler);
    };
  }, [socket, isConnected]);

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="#10B981" style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.push('/liv')}
            style={styles.avatarButton}
            accessibilityRole="button"
            accessibilityLabel={t('driverDashboard.openProfile')}
          >
            <Image
              source={require('../assets/images/telecharge.jpeg')}
              style={styles.avatar}
            />
          </Pressable>

          <View style={styles.headerText}>
            <Text style={styles.greeting} numberOfLines={1}>
              {t('driverDashboard.greeting', {
                name: user?.nom ?? user?.name ?? '',
              })}
            </Text>
            <Text style={styles.email} numberOfLines={1}>
              {user?.email ?? ''}
            </Text>
          </View>

          <AntDesign name="right" size={22} color="#FFFFFF" />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.tabContainer} accessibilityRole="tablist">
            {TAB_KEYS.map((key) => {
              const active = activeTab === key;
              return (
                <Pressable
                  key={key}
                  onPress={() => setActiveTab(key)}
                  style={[styles.tabButton, active && styles.tabButtonActive]}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: active }}
                >
                  <Text
                    style={[styles.tabText, active && styles.tabTextActive]}
                    numberOfLines={1}
                  >
                    {t(TAB_LABEL_KEYS[key])}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {activeTab === 'available' && (
            <Available reservationVenant={orders.Comming} />
          )}
          {activeTab === 'encours' && <Encours encours={orders.Encours} />}
          {activeTab === 'delivered' && (
            <Delivery delivered={orders.Delivered} />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { flex: 1 },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 12,
  },
  avatarButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  avatar: { width: '100%', height: '100%' },
  headerText: { flex: 1, justifyContent: 'center' },
  greeting: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
  },
  email: {
    color: '#FFFFFF',
    fontSize: 13,
    opacity: 0.9,
    marginTop: 2,
  },
  scrollContent: { paddingBottom: 24 },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    paddingHorizontal: 12,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tabButtonActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  tabText: {
    color: '#6B7280',
    fontWeight: '700',
    fontSize: 13,
  },
  tabTextActive: { color: '#FFFFFF' },
});