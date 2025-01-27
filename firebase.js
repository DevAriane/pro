
import * as Notifications from 'expo-notifications';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore'; // Added missing imports

const firebaseConfig = {
  apiKey: "AIzaSyACF2SPqFLwrsUz0RqBM16g3OphxI1Prm0",
  authDomain: "delivery-resa.firebaseapp.com",
  projectId: "delivery-resa",
  storageBucket: "delivery-resa.firebasestorage.app",
  messagingSenderId: "408419771866",
  appId: "1:408419771866:web:e3d5319080332ada7d8ce3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app); // Initialize Firestore once

// Get FCM token and save to Firestore
const registerFCMToken = async (userId, userType) => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return;

  try {
    const token = (await Notifications.getExpoPushTokenAsync()).data; // Fixed method name
    
    // Use userType to determine collection (e.g., "users" or "deliveryPartners")
    await updateDoc(doc(firestore, userType, userId), { 
      fcmToken: token 
    });
    
    // Listen for token changes AFTER initial registration
    Notifications.addPushTokenListener(async (newToken) => {
      await updateDoc(doc(firestore, userType, userId), { 
        fcmToken: newToken.data 
      });
    });

  } catch (error) {
    console.error("FCM token error:", error);
  }
};

export { auth, firestore, registerFCMToken };