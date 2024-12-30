import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, addDoc, collection } from 'firebase/firestore';
import { firestore } from '@/firebase';
import { useRouter } from 'expo-router';

// Define the user structure
interface AppUser extends FirebaseUser {
  fullName?: string;
  role?: string;
  [key: string]: any; // Allow additional user fields from Firestore
}

// Define the context type
interface AuthContextType {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<FirebaseUser>;
  register: (email: string, password: string, userData: Record<string, any>) => Promise<FirebaseUser>;
  logout: () => Promise<void>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(firestore, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUser({ ...firebaseUser, ...userDoc.data() } as AppUser);
          } else {
            setUser(firebaseUser as AppUser);
          }
        } catch (error) {
          console.error('Error fetching user document:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const login = async (email: string, password: string): Promise<FirebaseUser> => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(firestore, 'users', response.user.uid));
      if (userDoc.exists()) {
        setUser({ ...response.user, ...userDoc.data() } as AppUser);
      } else {
        setUser(response.user as AppUser);
      }

      if(response.user){
        router.push('/(tabs)');
      }
      return response.user;
    } catch (error: any) {
      Alert.alert('Login Error', error.message);
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string,
    userData: Record<string, any>
  ): Promise<FirebaseUser> => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user=response.user;
      const storedUser= {
        id:user.uid,
        email:user.email,
        ...userData,
        createdAt: new Date(),
      }
      await addDoc(collection(firestore, 'users'), storedUser);
      setUser(storedUser);

      router.push('/log');
      return response.user;
    } catch (error: any) {
      Alert.alert('Registration Error', error.message);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error: any) {
      Alert.alert('Logout Error', error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
