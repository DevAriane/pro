
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

//Get FCM token and save to Firestore
const registerFCMToken = async (userId, userType) => {
  console.log('yes');
  const { status } = await Notifications.requestPermissionsAsync();
  console.log('status',status);
  if (status !== 'granted') return;

  try {
//     if (_DEV_) {  // Use Expo token in development
//       token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log("token:",token);
//     } else {      // Use FCM token in production
//       token = await messaging().getToken();
//         }
token = (await Notifications.getExpoPushTokenAsync({projectId: '168541c5-fd02-4c82-8e39-f50adf67e2c2'})).data;
console.log("token:",token);

    // Use userType to determine collection (e.g., "users" or "deliveryPartners")
    await updateDoc(doc(firestore, userType, userId), { 
      fcmToken: token 
    });
    
    //Listen for token changes AFTER initial registration
    Notifications.addPushTokenListener(async (newToken) => {
      await updateDoc(doc(firestore, userType, userId), { 
        fcmToken: newToken.data 
      });
    });
  }
   catch (error) {
    console.error("FCM token error:", error);
  }
};

export { auth, firestore, registerFCMToken };