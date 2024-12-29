import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { firestore } from '@/firebase';

// Define the Order type
interface Order {
  id: string;
  userId: string;
  status: string;
  createdAt: Date;
  [key: string]: any; // Add other fields as necessary
}

// Define the OrderContext type
interface OrderContextType {
  orders: Order[];
  loading: boolean;
  createOrder: (orderData: Omit<Order, 'id' | 'userId' | 'createdAt'>) => Promise<string>;
  updateOrder: (orderId: string, updates: Partial<Order>) => Promise<void>;
}

// Create the OrderContext
const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(firestore, 'orders'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      setOrders(orderData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const createOrder = async (
    orderData: Omit<Order, 'id' | 'userId' | 'createdAt'>
  ): Promise<string> => {
    try {
      const order = {
        ...orderData,
        userId: user?.uid,
        status: 'PENDING',
        createdAt: new Date(),
      };
      const docRef = await addDoc(collection(firestore, 'orders'), order);
      return docRef.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const updateOrder = async (orderId: string, updates: Partial<Order>): Promise<void> => {
    try {
      await updateDoc(doc(firestore, 'orders', orderId), updates);
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        createOrder,
        updateOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
