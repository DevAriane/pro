import React, {createContext,useState,useContext, useEffect,ReactNode,} from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { doc,setDoc,getDoc,addDoc,collection,query,where,orderBy,getDocs,
} from "firebase/firestore";
import { firestore, registerFCMToken } from "@/firebase";
import { useRouter } from "expo-router";
import { usePushNotifications } from "@/hooks/usePushNotifications";

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
  register: (
    email: string,
    password: string,
    phone:string,
    userData: Record<string, any>
  ) => Promise<FirebaseUser>;
  logout: () => Promise<void>;
  loginPartner:(email: string, password: string) => Promise<FirebaseUser>;
  storeUserData:(userData:{}) => Promise<void>;
  getUserData:()=> Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const  {expoPushToken} = usePushNotifications();

// Fonction pour stocker les données de l'utilisateur dans AsyncStorage
const storeUserData = async (userData:any) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

// Fonction pour récupérer les données de l'utilisateur à partir de AsyncStorage
const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

  const loginPartner = async (email: string,password: string): Promise<FirebaseUser | undefined> => {
    console.log("ariane");

    try {
      // 1. Fetch Partner Document by Email
          const q = query(
              collection(firestore, "delivery_partners"),
              where("email", "==", email)
            );
          const querySnapshot = await getDocs(q);
      
      const partnerData = querySnapshot.docs[0].data();
      // 3. Validate Password (Assuming password field exists in the document)
      if (partnerData?.password !== password) {
        
        throw new Error("mot de passe incorrect.");
      }
      
      setUser(partnerData);

      registerFCMToken(partnerData.uid, expoPushToken ,"delivery_partners");
    
      router.push("/livreuurProfil");
      
      return partnerData;
    } catch (error: any) {
  
      Alert.alert("Login Error", error.message);
    
      return undefined; // Indicate login failure
    }
  };

  const login = async (email: string, password: string): Promise<AppUser> => {
    try {
      setLoading(true);
      // 1. Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
  
      // 2. Firestore Data Fetch
      const userDoc = await getDoc(doc(firestore, "users", firebaseUser.uid));
      
      if (!userDoc.exists()) {
        await auth.signOut();
        setLoading(false);
        throw new Error("votre compte client n'a pas bien été configuré");
      }

      registerFCMToken(firebaseUser.uid, expoPushToken ,"users");
  
      // 3. Merge auth and firestore data
      const userData: AppUser = {
        ...firebaseUser,
        ...userDoc.data(),
        // Explicitly copy sensitive fields
        uid: firebaseUser.uid,
        emailVerified: firebaseUser.emailVerified,
      };
  
      // 4. State management and side effects
      setUser(userData);
      storeUserData(userData);

      
      setLoading(false);
      // 5. Navigation
      router.replace("/(tabs)"); // Use replace instead of push
  
      return userData;
  
    } catch (error: any) {
      // Improved error handling
      const errorMessage = getAuthErrorMessage(error.code);
      Alert.alert("Login Error", errorMessage);
      
      // Clear partial auth state on failure
      setUser(null);
      setLoading(false);
      return Promise.reject(error);
    }
  };

  // Helper function for error messages
const getAuthErrorMessage = (code: string): string => {
  const messages: { [key: string]: string } = {
    'auth/invalid-email': 'email incorrect',
    'auth/user-disabled': 'vous etes hors réseau',
    'auth/user-not-found': 'vous n avez pas de compte',
    'auth/wrong-password': 'mot de passe incorrect',
    'auth/too-many-requests': 'Trop de tentative. Réesseyer plutard ',
  };

  return messages[code] || 'Connexion échouée. SVP réesseyez plutard.';
};

  // const login = async (
  //   email: string,
  //   password: string
  // ): Promise<FirebaseUser> => {
  //   try {
  //     const response = await signInWithEmailAndPassword(auth, email, password);

  //     try {
  //       const userDoc = await getDoc(
  //         doc(firestore, "users", response.user.uid)
  //       );

  //       console.log("User UID:", response.user.uid);
  //       console.log("Firestore Data:", userDoc.data());

  //       if (userDoc.exists()) {
  //         const userData = { ...response.user, ...userDoc.data() } as AppUser
  //         setUser(userData);
  //         storeUserData(userData);
  //         registerFCMToken(userData.uid, "users");
  //         router.push("/(tabs)");
  //       } else {
  //         console.log("No Firestore document found for user");
  //         setUser(response.user as AppUser);
  //       }
  //     } catch (firestoreError) {
  //       console.error("Error fetching user data:", firestoreError);
  //       setUser(response.user as AppUser);
  //     }

  //     // if (userData) {
  //     //   storeUserData(user);
  //     //   registerFCMToken(partnerData.uid, "users");
  //     //   router.push("/(tabs)");
  //     // }
  //     return response.user;
  //   } catch (error: any) {
  //     Alert.alert("Login Error", error.message);
  //     throw error;
  //   }
  // };

  const register = async (
    email: string,
    password: string,
    userData: Record<string, any>
  ): Promise<FirebaseUser> => {

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = response.user;
      const storedUser = {
        uid: user.uid,
        role: 'user',
        email: user.email,
        ...userData,
        createdAt: new Date(),
      };

      // Use setDoc instead of addDoc to set the document ID as the user's UID
        await setDoc(doc(firestore, "users", user.uid), storedUser);
  
      
      setUser(storedUser);
     
      router.push("/log");
     
      return response.user;
    } catch (error: any) {
      Alert.alert("Registration Error", error.message);
      throw error;
    }
  }
  

  const logout = async () => {
    await auth.signOut();
    storeUserData(null);
    router.push("/log");
  }


  return (
    <AuthContext.Provider
      value={{ user, loading, setUser,login, register, logout, loginPartner, storeUserData  ,getUserData}}
    >
      {children}
    </AuthContext.Provider>
  );
}

  

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
  