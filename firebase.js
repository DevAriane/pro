// Import Firebase functions you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Initialize Auth and Firestore services
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };