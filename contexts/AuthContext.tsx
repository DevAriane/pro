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
import { firestore } from "@/firebase";
import { useRouter } from "expo-router";

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

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
  //     if (firebaseUser) {
  //       try {
  //         const userDoc = await getDoc(
  //           doc(firestore, "users", firebaseUser.uid)
  //         );
  //         if (userDoc.exists()) {
  //           setUser({ ...firebaseUser, ...userDoc.data() } as AppUser);
  //         } else {
  //           setUser(firebaseUser as AppUser);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user document:", error);
  //       }
  //     } else {
  //       setUser(null);
  //     }
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, [auth]);

  const loginPartner = async (email: string,password: string): Promise<FirebaseUser | undefined> => {
    console.log("ariane");

    try {
      // 1. Fetch Partner Document by Email
          const q = query(
              collection(firestore, "delivery_partners"),
              where("email", "==", email)
            );
          const querySnapshot = await getDocs(q);
          console.log('query  : ', querySnapshot)
      const partnerData = querySnapshot.docs[0].data();
      // 3. Validate Password (Assuming password field exists in the document)
      if (partnerData?.password !== password) {
        
        throw new Error("Incorrect password.");
      }

      console.log('partner :  ', partnerData)
      
      setUser({ ...partnerData } as AppUser);
    
      router.push("/livreuurProfil");
      
      return partnerData;
    } catch (error: any) {
  
      Alert.alert("Login Error", error.message);
    
      return undefined; // Indicate login failure
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<FirebaseUser> => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      try {
        const userDoc = await getDoc(
          doc(firestore, "users", response.user.uid)
        );

        console.log("User UID:", response.user.uid);
        console.log("Firestore Data:", userDoc.data());

        if (userDoc.exists()) {
          setUser({ ...response.user, ...userDoc.data() } as AppUser);
        } else {
          console.log("No Firestore document found for user");
          setUser(response.user as AppUser);
        }
      } catch (firestoreError) {
        console.error("Error fetching user data:", firestoreError);
        setUser(response.user as AppUser);
      }

      if (response.user) {
        router.push("/(tabs)");
      }
      return response.user;
    } catch (error: any) {
      Alert.alert("Login Error", error.message);
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string,
    phone:string,
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
        email: user.email,
        phone:phone,
        ...userData,
        createdAt: new Date(),
      };

      // Use setDoc instead of addDoc to set the document ID as the user's UID
        await setDoc(doc(firestore, "users", user.uid), storedUser);
  
      console.log('après : ', storedUser);
      setUser(storedUser);
      Alert.alert("inscription réussie");
      router.push("/log");
     
      return response.user;
    } catch (error: any) {
      Alert.alert("Registration Error", error.message);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error: any) {
      Alert.alert("Logout Error", error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, loginPartner }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
