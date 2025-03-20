import React, {createContext,useContext,useState, useEffect, ReactNode,
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
import Success from "@/app/success";
import { router } from "expo-router";

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
  Encours:Order[];
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
  fetchOrdersPickeUp: () => void;
  fetchOrdersDelivered: () => void;
  history: () => void;
  cancelOrders: () => void;
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
    Encours:[],
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
    console.log("hello comming");
    try {
      setLoading(true);
      console.log("hello comming 1");
      const q = query(
        collection(firestore, "orders"),
        where("deliveryPartnerId", "==", null),
        where("status.current", "==", "PENDING"),
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
  }

  const  fetchOrdersPickeUp = async () => {
    if (!user) return; 
    try {
     
      setLoading(true);
      const q = query(
        collection(firestore, "orders"),
        where("deliveryPartnerId", "==", user.uid),
        where("status.current", "==", "PICKEDUP"),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      
      const unsubscribe = setupRealtimeListener(q, 'Encours');
      return unsubscribe;
    } catch (error) {
      handleFirestoreError(error, "Error fetching user orders");
    } finally {
      setLoading(false);
    }

  }

  const fetchOrdersDelivered = async () => {
  
    if (!user) return; 
   
    try {
     
      setLoading(true);
      const q = query(
        collection(firestore, "orders"),
        where("deliveryPartnerId", "==", user.uid),
        where("status.current", "==", "DELIVERED"),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      
      const unsubscribe = setupRealtimeListener(q, 'Delivered');
      return unsubscribe;

    
    } catch (error) {
      handleFirestoreError(error, "Error fetching user orders");
    } finally {
      setLoading(false);
    }

  }


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
          Comming: orderData.filter(o => !["DELIVERED", "CANCELLED"].includes(o.status?.current)),
          Encours:orderData.filter(o => o.status?.current === "PICKEDUP"),
          Delivered: orderData.filter(o => o.status?.current === "DELIVERED"),
          Cancelled: orderData.filter(o => o.status?.current === "CANCELLED"),
        });
      });
  
      return unsubscribe;
    } catch (error) {
      handleFirestoreError(error, "Error fetching user orders");
    } finally {
      setLoading(false);
    }
  };

  const history = async () => {
    console.log('orderData ss0:');
    if (!user) return; 
    console.log('orderData ss1:');
    try {
      console.log('orderData ss02:');
      setLoading(true);
      const q = query(
        collection(firestore, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      console.log('orderData ss03:');
      const unsubscribe = setupRealtimeListener(q, 'Delivered');
      return unsubscribe;

    
    } catch (error) {
      handleFirestoreError(error, "Error fetching user orders");
    } finally {
      setLoading(false);
    }

  }

  const cancelOrders = async () => {
    console.log('orderData ss0:');
    if (!user) return; 
    console.log('orderData ss1:');
    try {
      console.log('orderData ss02:');
      setLoading(true);
      const q = query(
        collection(firestore, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      console.log('orderData ss03:');
      const unsubscribe = setupRealtimeListener(q, 'Cancelled');
      return unsubscribe;

    
    } catch (error) {
      handleFirestoreError(error, "Error fetching user orders");
    } finally {
      setLoading(false);
    }

  }

  const createOrder = async (
    orderData: any
  ): Promise<string> => {
    if (!user) throw new Error("User not authenticated");

    try {
      const order: Omit<Order, "id"> = {
        ...orderData,
        userId: user.uid,
        phone: user.phone,
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
      router.push('/success');
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, "Failed to create order");
      throw error;
    }
  };


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
    PICKEDUP:[],
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


      console.log('currentStatus', currentStatus);

      console.log('new status', updates.status?.current)

      if (updates.status?.current && currentStatus) {
        if (!validStatusTransitions[currentStatus].includes(updates.status?.current)) {
          throw new Error(`Invalid status transition from ${currentStatus} to ${updates.status?.current}`);
        }
      }

      console.log('updates', updates);

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
        const  result1=await fetchOrdersUserConnected();
        const  result2=await history();
        const result3=await cancelOrders();
          unsubscribe = result1 && result2 && result3;
        } else if (user.role === "delivery partner") {
          const result1 = await fetchOrdersDelivery();
          const result2 = await fetchOrdersPickeUp();
          const result = await fetchOrdersDelivered();
          console.log("result1:",result1);
          unsubscribe = result1 && result2 && result;
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
        fetchOrdersPickeUp,
        fetchOrdersDelivered,
        history,
        cancelOrders,
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


