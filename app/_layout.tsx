import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router"; // Added useRouter
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import * as Notifications from 'expo-notifications'; // Added
import * as TaskManager from 'expo-task-manager'; // Added

import { useColorScheme } from "@/hooks/useColorScheme";
import { AppProviders } from "@/contexts";
import { seedDatabase } from "@/utils/seedDatabase";
import { firestore } from "@/firebase";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Notification configuration (moved outside component)
const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND_NOTIFICATION';

// Configure notification handler
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// // Define background task
// TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data, error }) => {
//   if (error) {
//     console.error('Background task error:', error);
//     return;
//   }
//   const action = data?.action;
//   if (action === 'new_order') {
//     console.log('Handling background order:', data.orderId);
//     // Add your background processing logic here
//   }
// });

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter(); // Added router
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    if (loaded) {
      hideSplash();
    }
  }, [loaded]);

  // Added notification setup
  // useEffect(() => {
  //   // Register background task
  //   Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

  //   // Notification received listener (foreground)
  //   const receivedSubscription = Notifications.addNotificationReceivedListener(notification => {
  //     const { data } = notification.request.content;
  //     if (data.action === 'new_order') {
  //      router.push(`/orders/${data.orderId}`);
  //     }
  //   });

  //   // Notification response listener (user tap)
  //   const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
  //     const { data } = response.notification.request.content;
  //     if (data.action === 'accept_order') {
  //       //router.push(`/delivery/${data.orderId}`);
  //     }
  //   });

  //   // Cleanup subscriptions
  //   return () => {
  //     receivedSubscription.remove();
  //     responseSubscription.remove();
  //   };
  // }, [router]); // Added router as dependency

  useEffect(() => {
    // (async () => {
    //   try {
    //     console.log('Starting database seeding...');
    //     await seedDatabase(firestore);
    //     console.log('Database seeding complete.');
    //   } catch (error) {
    //     console.error('Error during database seeding:', error);
    //   }
    // })();
  },[])

  if (!loaded) {
    return null;
  }

  return (
    <AppProviders>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          initialRouteName="index"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="option" options={{ headerShown: false }} />
          <Stack.Screen name="log" options={{ headerShown: false }} />
          <Stack.Screen name="sign" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="food" options={{ headerShown: false }} />
          <Stack.Screen name="restaurant" options={{ headerShown: false }} />
          <Stack.Screen name="cart" options={{ headerShown: false }} />
          <Stack.Screen name="fd" options={{ headerShown: false }} />
         
          <Stack.Screen
            name="livreuurProfil"
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="orders/[orderId]" 
            options={{ 
              headerShown: false,
              headerTitle: 'Order Details',
              headerBackTitle: 'Back'
            }} 
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AppProviders>
  );
}
