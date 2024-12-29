import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, query, getDocs, where, doc, getDoc } from 'firebase/firestore';
import { useLocation } from './LocationContext';
import { firestore } from '@/firebase';

// Define Restaurant type
interface Restaurant {
  id: string;
  name: string;
  address: string;
  [key: string]: any; // Add other fields as necessary
}

// Define RestaurantContext type
interface RestaurantContextType {
  restaurants: Restaurant[];
  loading: boolean;
  fetchRestaurants: () => Promise<void>;
  getRestaurantById: (id: string) => Promise<Restaurant | null>;
}

// Create Context
const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

interface RestaurantProviderProps {
  children: ReactNode;
}

export const RestaurantProvider: React.FC<RestaurantProviderProps> = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentLocation } = useLocation();

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const q = query(collection(firestore, 'restaurants'));
      const querySnapshot = await getDocs(q);
      const restaurantData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Restaurant[];
      setRestaurants(restaurantData);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRestaurantById = async (id: string): Promise<Restaurant | null> => {
    try {
      const docRef = doc(firestore, 'restaurants', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Restaurant;
      }
      return null;
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [currentLocation]);

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        loading,
        fetchRestaurants,
        getRestaurantById,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurants = (): RestaurantContextType => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurants must be used within a RestaurantProvider');
  }
  return context;
};
