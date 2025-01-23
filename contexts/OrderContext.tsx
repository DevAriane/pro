import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { firestore } from "@/firebase";
import { Alert } from "react-native";
import { Try } from "expo-router/build/views/Try";

// Define the Order type
interface Order {
  // id: string;
  // userId: string;
  // status: string;
  // createdAt: Date;
  // reservationDate: Date; // Date de la réservation
  // reservationTime: string; //heure de la réservation
  [key: string]: any; // Add other fields as necessary
}

// Define the OrderContext type
interface OrderContextType {
  orders: Order[];
  loading: boolean;
  createOrder: (
    orderData: Omit<Order, "id" | "userId" | "createdAt">
  ) => Promise<string>;
  updateOrder: (orderId: string, updates: Partial<Order>) => Promise<void>;
  fetchOrdersDelivery:() => void;
  fetchOrdersUserConnected :() => void;
  assignDeliveryPartner: (orderId: string,deliveryPartnerId: string)=> void ;
}

// Create the OrderContext
const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order>({});
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  //   useEffect(() => {

  //      console.log('order  1111');
  //     if (!user) return;

  //     const q = query(
  //       collection(firestore, 'orders'),
  //       where('userId', '==', user.uid),
  //       orderBy('createdAt', 'desc')
  //     );

  //     console.log('q',q);

  //     //methode qui permet fetch les données
  //     const unsubscribe = onSnapshot(q, (snapshot) => {
  //       const orderData = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       })) as Order[];

  //       console.log('orderData',orderData);
  //       setOrders(orderData);
  //       setLoading(false);
  //     });

  //     return () => unsubscribe();
  //  }
  // , [user]);

  const fetchOrdersDelivery = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(firestore, "orders"),
        where("deliveryPartnerId", "==", null), // matches both null and non-existent fields
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const orderData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      console.log('order data 1',orderData);
      setOrders(orderData);

    } catch (error) {
      console.error("Error fetching DELIVERY orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrdersUserConnected = async () => {
    console.log('bonjour je suis utilisateur');
    try {
      setLoading(true);
      const q = query(
        collection(firestore, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const orderData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      console.log('order data 1',orderData);
      const comme=orderData.filter(order => order.status == 'PENDING');
console.log('comme',comme)
const delivered=orderData.filter(order => order.status == 'completed');
const cancelled=orderData.filter(order => order.status == 'cancel');
      setOrders({"Comming":comme, "Delivered":delivered,"Cancelled":cancelled});
    } catch (error) {
      console.error("error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  //methode qui permet fetch les données
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const q = query(collection(firestore, "orders"));
      const querySnapshot = await getDocs(q);
      const orderData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      setOrders(orderData);
    } catch (error) {
      console.error("error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: Omit<Order, "id" | "userId" | "createdAt">  ): Promise<string> => {
    try {
      const order = {
        ...orderData,
        deliveryPartnerId:null,
        userId: user?.uid,
        status: "PENDING",
        createdAt: new Date(),
      };
      console.log("order 1122", order);
 
      const docRef = await addDoc(collection(firestore, "orders"), order);
      // setOrders(order);
      Alert.alert("votre réservation a été éffectuée");
      return docRef.id;
    } catch (error) {
      console.error("Error creating order:", error);
      Alert.alert("désolé une erreur cette produite");
      throw error;
    }
    
  };

  const  assignDeliveryPartner= async (orderId: string,deliveryPartnerId: string) => {
    console.log('bonjour le monde');
    try {
      const orderRef = doc(firestore, "orders", orderId);

      await runTransaction(firestore, async (transaction) => {
        const orderDoc = await transaction.get(orderRef);

        // Check if order exists
        if (!orderDoc.exists()) {
          throw new Error("Order not found");
        }

        const orderData = orderDoc.data();

        console.log('orderData : ', orderData)

        // Check if order is already assigned
        if (orderData.deliveryPartnerId) {
          console.log("Order is already assigned to a delivery partner");
        }

        // Perform the update within the transaction
        transaction.update(orderRef, {
          deliveryPartnerId,
          status: "assigned",
          assignedAt: serverTimestamp(), // Better than new Date() for consistency
        });
        
      });

   

      return true;
    } catch (error: any) {
      console.error("Error assigning delivery partner:", error);
      throw error;
    }
  };

  const updateOrder = async (
    orderId: string,
    updates: Partial<Order>
  ): Promise<void> => {
    console.log('updates 1234',updates);
    try {
      await updateDoc(doc(firestore, "orders", orderId), updates);
      
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  };

  useEffect(() => {
    console.log('user 0');
    if (!user) return;
    console.log('user travail',user);

    if(user.role == 'user') {
    
      fetchOrdersUserConnected ();
    }
    else if (user.role == "delivery partner"){
     fetchOrdersDelivery();
    }
  }, [user]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        createOrder,
        updateOrder,
        assignDeliveryPartner,
        fetchOrdersUserConnected ,
        fetchOrdersDelivery,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
