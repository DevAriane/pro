import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';

import Comming from '../comming';
import History from '../history';
import Cancelled from '../cancelled';
import Draft from '../draft';
import { useOrders } from '@/contexts/OrderContext';

type TabKey = 'comming' | 'history' | 'cancelled' | 'draft';

const TABS: { key: TabKey; labelKey: string }[] = [
  { key: 'comming', labelKey: 'reservations.tabUpcoming' },
  { key: 'history', labelKey: 'reservations.tabHistory' },
  { key: 'cancelled', labelKey: 'reservations.tabCancelled' },
  { key: 'draft', labelKey: 'reservations.tabReviews' },
];

export default function Reservations() {
  const { t } = useTranslation();
  const { orders, loading } = useOrders();
  const [activeTab, setActiveTab] = useState<TabKey>('comming');

  const counts: Record<TabKey, number> = {
    comming: orders?.Comming?.length ?? 0,
    history: orders?.Delivered?.length ?? 0,
    cancelled: orders?.Cancelled?.length ?? 0,
    draft: 0,
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="green" />
        </View>
      );
    }

    switch (activeTab) {
      case 'comming':
        return <Comming a={orders?.Comming ?? []} />;
      case 'history':
        return <History b={orders?.Delivered ?? []} />;
      case 'cancelled':
        return <Cancelled c={orders?.Cancelled ?? []} />;
      case 'draft':
        return <Draft />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.area} edges={['top']}>
      <StatusBar style="light" />

      {/* ─── Header ─── */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.push('/(tabs)')}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel={t('reservations.back')}
        >
          <AntDesign name="left" size={22} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {t('reservations.headerTitle')}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* ─── Body ─── */}
      <View style={styles.body}>
        {/* Tabs */}
        <View style={styles.tabsWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsRow}
          >
            {TABS.map((tab) => {
              const active = activeTab === tab.key;
              const count = counts[tab.key];

              return (
                <Pressable
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key)}
                  style={[styles.tabButton, active && styles.tabButtonActive]}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: active }}
                  accessibilityLabel={t(tab.labelKey)}
                >
                  <Text
                    style={[styles.tabText, active && styles.tabTextActive]}
                    numberOfLines={1}
                  >
                    {t(tab.labelKey)}
                  </Text>
                  {count > 0 ? (
                    <View
                      style={[
                        styles.tabBadge,
                        active && styles.tabBadgeActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.tabBadgeText,
                          active && styles.tabBadgeTextActive,
                        ]}
                      >
                        {count}
                      </Text>
                    </View>
                  ) : null}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Contenu */}
        <View style={styles.content}>{renderContent()}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: 'green',
  },

  /* ─── Header ─── */
  header: {
    width: '100%',
    minHeight: 56,
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 44,
  },

  /* ─── Body ─── */
  body: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },

  /* ─── Tabs ─── */
  tabsWrapper: {
    backgroundColor: '#F9FAFB',
    paddingVertical: 12,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 14,
    minHeight: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tabButtonActive: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  tabBadge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBadgeActive: {
    backgroundColor: '#FFFFFF',
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#111827',
  },
  tabBadgeTextActive: {
    color: 'green',
  },

  /* ─── Content ─── */
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});