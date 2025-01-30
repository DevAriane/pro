import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import firebase from "firebase/app";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  runTransaction,
  serverTimestamp,
  Firestore,
  Query,
  DocumentData,
  limit,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { firestore } from "@/firebase";
import { Alert } from "react-native";

// Define strict Order type
type OrderStatus = {
  current: "PENDING" | "ASSIGNED" | 'PICKEDUP' | "DELIVERED" | "CANCELLED";
  timeline: {
    status: string;
    timestamp: Date;
    note: string;
  }[];
}

interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  createdAt: any;
  reservationDate: Date;
  reservationTime: string;
  deliveryPartnerId?: string;
  assignedAt?: any;
  restaurantLocation?: any
  // Add other specific fields as needed
}

type OrderCategories = {
  Comming: Order[];
  Delivered: Order[];
  Cancelled: Order[];
};

interface OrderContextType {
  orders: OrderCategories;
  loading: boolean;
  error: string | null;
  createOrder: (
    orderData: Omit<Order, "id" | "userId" | "createdAt" | "status">
  ) => Promise<string>;
  updateOrder: (orderId: string, updates: Partial<Order>) => Promise<void>;
  fetchOrdersDelivery: () => void;
  fetchOrdersUserConnected: () => void;
  assignDeliveryPartner: (orderId: string, deliveryPartnerId: string) => Promise<boolean>;
  clearError: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<OrderCategories>({
    Comming: [],
    Delivered: [],
    Cancelled: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const clearError = () => setError(null);

  const handleFirestoreError = (error: unknown, defaultMessage: string) => {
    const message = error instanceof Error ? error.message : defaultMessage;
    setError(message);
    throw new Error(message);
  };

  const setupRealtimeListener = (q: Query<DocumentData>, category: keyof OrderCategories) => {
    return onSnapshot(q, 
      (snapshot) => {
        const orderData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];
        setOrders(prev => ({ ...prev, [category]: orderData }));
      },
      (error) => handleFirestoreError(error, "Error in real-time listener")
    );
  };

 // where("createdAt", ">", new Date(Date.now() - 24 * 60 * 60 * 1000)), // Last 24h
  const fetchOrdersDelivery = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(firestore, "orders"),
        where("deliveryPartnerId", "==", null),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      
      const unsubscribe = setupRealtimeListener(q, 'Comming');
      return unsubscribe;
    } catch (error) {
      handleFirestoreError(error, "Error fetching delivery orders");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrdersUserConnected = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const q = query(
        collection(firestore, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const orderData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];
        
        setOrders({
          Comming: orderData.filter(o => o.status?.current === "PENDING"),
          Delivered: orderData.filter(o => o.status?.current === "DELIVERED"),
          Cancelled: orderData.filter(o => o.status?.current === "CANCELLED")
        });
      });

      return unsubscribe;
    } catch (error) {
      handleFirestoreError(error, "Error fetching user orders");
    } finally {
      setLoading(false);
    }
  };


  const createOrder = async (
    orderData : any
  ): Promise<string> => {
    if (!user) throw new Error("User not authenticated");
  
    try {
      const order: Omit<Order, "id"> = {
        ...orderData,
        userId: user.uid,
        phone:user.phone,
        status: {
          current: "PENDING",
          timeline: [{
            status: "PENDING",
            timestamp: new Date(),
            note: "Order received"
          }]
        },
        deliveryPartnerId: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
  
      const docRef = await addDoc(collection(firestore, "orders"), order);
      Alert.alert("Order Created", "Your reservation has been confirmed");
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, "Failed to create order");
      throw error;
    }
  };


  // const createOrder = async (
  //   orderData: Omit<Order, "id" | "userId" | "createdAt" | "status">
  // ): Promise<string> => {
  //   if (!user) throw new Error("User not authenticated");

  //   try {
  //     const order: Omit<Order, "id"> = {
  //       ...orderData,
  //       userId: user.uid,
  //       status: "PENDING",
  //       createdAt: serverTimestamp(),
  //     };

  //     const docRef = await addDoc(collection(firestore, "orders"), order);
  //     Alert.alert("Order Created", "Your reservation has been confirmed");
  //     return docRef.id;
  //   } catch (error) {
  //     handleFirestoreError(error, "Failed to create order");
  //     throw error;
  //   }
  // };

  const assignDeliveryPartner = async (
    orderId: string,
    deliveryPartnerId: string
  ): Promise<boolean> => {
    try {
      const orderRef = doc(firestore, "orders", orderId);
      const partnerRef = doc(firestore, "deliveryPartners", deliveryPartnerId);

      await runTransaction(firestore, async (transaction) => {
        const [orderDoc, partnerDoc] = await Promise.all([
          transaction.get(orderRef),
          transaction.get(partnerRef)
        ]);

        if (!orderDoc.exists() || !partnerDoc.exists()) {
          throw new Error("Document not found");
        }

        const orderData = orderDoc.data() as Order;
        const partnerData = partnerDoc.data();

        if (orderData.deliveryPartnerId) {
          throw new Error("Order already assigned");
        }

        if (partnerData.currentOrder) {
          throw new Error("Partner already has an active order");
        }

        transaction.update(orderRef, {
          deliveryPartnerId,
          status: "ASSIGNED",
          assignedAt: serverTimestamp()
        });

        transaction.update(partnerRef, {
          currentOrder: orderId,
          lastActive: serverTimestamp()
        });
      });

      return true;
    } catch (error) {
      handleFirestoreError(error, "Failed to assign delivery partner");
      return false;
    }
  };

  const validStatusTransitions: Record<OrderStatus, OrderStatus[]> = {
    PENDING: ["ASSIGNED", "CANCELLED"],
    ASSIGNED: ["COMPLETED", "CANCELLED"],
    COMPLETED: [],
    CANCELLED: []
  };

  const updateOrder = async (
    orderId: string,
    updates: Partial<Order>
  ): Promise<void> => {
    if (!user) throw new Error("Unauthorized");

    console.log('call database');
    try {
      const currentStatus = orders.Comming.concat(orders.Delivered, orders.Cancelled)
        .find(o => o.id === orderId)?.status.current;


        console.log('currentStatus',currentStatus);

        console.log('new status', updates.status?.current)

      if (updates.status?.current && currentStatus) {
        if (!validStatusTransitions[currentStatus].includes(updates.status?.current)) {
          throw new Error(`Invalid status transition from ${currentStatus} to ${updates.status?.current}`);
        }
      }

      console.log('updates',updates);

      await updateDoc(doc(firestore, "orders", orderId), updates);
    } catch (error) {
      handleFirestoreError(error, "Failed to update order");
      throw error;
    }
  };

  useEffect(() => {
    let unsubscribe: () => void;

    const setupListeners = async () => {
      if (!user) return;

      try {
        setLoading(true);
        
        if (user.role === "user") {
          unsubscribe = await fetchOrdersUserConnected();
        } else if (user.role === "delivery partner") {
          unsubscribe = await fetchOrdersDelivery();
        }
      } catch (error) {
        handleFirestoreError(error, "Error setting up listeners");
      } finally {
        setLoading(false);
      }
    };

    setupListeners();
    return () => unsubscribe?.();
  }, [user]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        createOrder,
        updateOrder,
        assignDeliveryPartner,
        fetchOrdersUserConnected,
        fetchOrdersDelivery,
        clearError,
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


// To use this implementation:

// Create a deliveryPartners collection in Firestore with documents containing:

// {
//   currentOrder: string | null;
//   lastActive: Timestamp;
//   // ... other partner fields
// }


// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import {
//   collection,
//   query,
//   where,
//   orderBy,
//   onSnapshot,
//   addDoc,
//   updateDoc,
//   doc,
//   getDocs,
//   runTransaction,
//   serverTimestamp,
// } from "firebase/firestore";
// import { useAuth } from "./AuthContext";
// import { firestore } from "@/firebase";
// import { Alert } from "react-native";
// import { Try } from "expo-router/build/views/Try";

// // Define the Order type
// interface Order {
//   // id: string;
//   // userId: string;
//   // status: string;
//   // createdAt: Date;
//   // reservationDate: Date; // Date de la réservation
//   // reservationTime: string; //heure de la réservation
//   [key: string]: any; // Add other fields as necessary
// }

// // Define the OrderContext type
// interface OrderContextType {
//   orders: Order[];
//   loading: boolean;
//   createOrder: (
//     orderData: Omit<Order, "id" | "userId" | "createdAt">
//   ) => Promise<string>;
//   updateOrder: (orderId: string, updates: Partial<Order>) => Promise<void>;
//   fetchOrdersDelivery: () => void;
//   fetchOrdersUserConnected: () => void;
//   assignDeliveryPartner: (orderId: string, deliveryPartnerId: string) => void;
// }

// // Create the OrderContext
// const OrderContext = createContext<OrderContextType | undefined>(undefined);

// interface OrderProviderProps {
//   children: ReactNode;
// }

// export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
//   const [orders, setOrders] = useState<Order>({});
//   const [loading, setLoading] = useState<boolean>(true);
//   const { user } = useAuth();

//   const fetchOrdersDelivery = async () => {
//     console.log("je suis un livreur");
//     try {
//       setLoading(true);
//       const q = query(
//         collection(firestore, "orders"),
//         where("deliveryPartnerId", "==", null), // matches both null and non-existent fields
//         orderBy("createdAt", "desc")
//       );
//       const querySnapshot = await getDocs(q);
//       const orderData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Order[];
//       console.log("order data 1", orderData);

//       setOrders({ Comming: orderData, Delivered: [], Cancelled: [] });
//     } catch (error) {
//       console.error("Error fetching DELIVERY orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchOrdersUserConnected = async () => {
//     console.log("bonjour je suis utilisateur");
//     try {
//       setLoading(true);
//       const q = query(
//         collection(firestore, "orders"),
//         where("userId", "==", user.uid),
//         orderBy("createdAt", "desc")
//       );
//       const querySnapshot = await getDocs(q);
//       const orderData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Order[];
//       console.log("order data 1", orderData);
//       const comme = orderData.filter((order) => order.status == "PENDING");
//       console.log("comme", comme);
//       const delivered = orderData.filter(
//         (order) => order.status == "completed"
//       );
//       const cancelled = orderData.filter((order) => order.status == "cancel");
//       setOrders({ Comming: comme, Delivered: delivered, Cancelled: cancelled });
//     } catch (error) {
//       console.error("error fetching order:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   //methode qui permet fetch les données
//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const q = query(collection(firestore, "orders"));
//       const querySnapshot = await getDocs(q);
//       const orderData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Order[];
//       setOrders(orderData);
//     } catch (error) {
//       console.error("error fetching order:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createOrder = async (
//     orderData: Omit<Order, "id" | "userId" | "createdAt">
//   ): Promise<string> => {
//     try {
//       const order = {
//         ...orderData,
//         deliveryPartnerId: null,
//         userId: user?.uid,
//         status: "PENDING",
//         createdAt: serverTimestamp(),
//       };
//       console.log("order 1122", order);

//       const docRef = await addDoc(collection(firestore, "orders"), order);
//       // setOrders(order);
//       Alert.alert("votre réservation a été éffectuée");
//       return docRef.id;
//     } catch (error) {
//       console.error("Error creating order:", error);
//       Alert.alert("désolé une erreur cette produite");
//       throw error;
//     }
//   };

//   const assignDeliveryPartner = async (
//     orderId: string,
//     deliveryPartnerId: string
//   ) => {
//     console.log("bonjour le monde");
//     try {
//       const orderRef = doc(firestore, "orders", orderId);

//       await runTransaction(firestore, async (transaction) => {
//         const orderDoc = await transaction.get(orderRef);

//         // Check if order exists
//         if (!orderDoc.exists()) {
//           throw new Error("Order not found");
//         }

//         const orderData = orderDoc.data();

//         console.log("orderData : ", orderData);

//         // Check if order is already assigned
//         if (orderData.deliveryPartnerId) {
//           console.log("Order is already assigned to a delivery partner");
//         }

//         // Perform the update within the transaction
//         transaction.update(orderRef, {
//           deliveryPartnerId,
//           status: "assigned",
//           assignedAt: serverTimestamp(), // Better than new Date() for consistency
//         });
//       });

//       return true;
//     } catch (error: any) {
//       console.error("Error assigning delivery partner:", error);
//       throw error;
//     }
//   };

//   const updateOrder = async (
//     orderId: string,
//     updates: Partial<Order>
//   ): Promise<void> => {
//     console.log("updates 1234", updates);
//     try {
//       await updateDoc(doc(firestore, "orders", orderId), updates);
//     } catch (error) {
//       console.error("Error updating order:", error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     console.log("user 0", user);
//     if (!user) return;
//     console.log("user travail", user);

//     if (user.role == "user") {
//       fetchOrdersUserConnected();
//     } else if (user.role == "delivery partner") {
//       console.log("bonjouer livreur");
//       fetchOrdersDelivery();
//     }
//   }, [user]);

//   return (
//     <OrderContext.Provider
//       value={{
//         orders,
//         loading,
//         createOrder,
//         updateOrder,
//         assignDeliveryPartner,
//         fetchOrdersUserConnected,
//         fetchOrdersDelivery,
//       }}
//     >
//       {children}
//     </OrderContext.Provider>
//   );
// };

// export const useOrders = (): OrderContextType => {
//   const context = useContext(OrderContext);
//   if (!context) {
//     throw new Error("useOrders must be used within an OrderProvider");
//   }
//   return context;
// };
