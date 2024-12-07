import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (

    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: false,
          title: 'Accueil',
           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
       }} />
        <Tabs.Screen name="reservations" options={{ headerShown: false,
          title: 'Réservations',
           tabBarIcon: ({ color }) => <FontAwesome6 name="clipboard-list" size={24} color={color} />,
       }} />
          <Tabs.Screen name="profil" options={{ headerShown: false,
          title: 'Profil',
           tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
       }} />
       
      {/* <Tabs.Screen name="onboarding" options={{ headerShown: false }} />
      <Tabs.Screen name="option" options={{ headerShown: false }} />
      <Tabs.Screen name="log" options={{ headerShown: false }} />
      <Tabs.Screen name="sign" options={{ headerShown: false }} />
      <Tabs.Screen name="password" options={{ headerShown: false }} /> */}
    </Tabs>
    // <Tabs
    //   screenOptions={{
    //     tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    //     headerShown: false,
    //     tabBarButton: HapticTab,
    //     tabBarBackground: TabBarBackground,
    //     tabBarStyle: Platform.select({
    //       ios: {
    //         // Use a transparent background on iOS to show the blur effect
    //         position: 'absolute',
    //       },
    //       default: {},
    //     }),
    //   }}>
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: 'Home',
    //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="explore"
    //     options={{
    //       title: 'Explore',
    //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
    //     }}
    //   />
    // </Tabs>
  );
}
