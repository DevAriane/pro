import React, { createContext, useContext, useReducer, useEffect, ReactNode, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Alert } from 'react-native';

// Define the structure of a cart item
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  [key: string]: any; // Allow for additional optional fields
}

// Define the initial state and actions for the reducer
interface CartState {
  items: any[];
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: any }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: any[] };

// Cart reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'SET_CART':
      return { ...state, items: action.payload };

    default:
      return state;
  }
};

// Define the context type
interface CartContextType {
  items: CartItem[];
  restaurantCartId:string | null,
  addToCart: (item: CartItem,restaurantId:string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => boolean;
  getCartTotal: () => number;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const initialState={ items:[],restaurantId:null };
  const [state, setState] = useState( initialState);

  // useEffect(() => {
  //   loadCart();
  // }, []);

  // useEffect(() => {
  //   saveCart();
  // }, [state]);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setState(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const saveCart = async () => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(state.items));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addToCart = (menu: CartItem,restaurantId:string) => {
    console.log("item",menu);
  if(state.restaurantId && state.restaurantId !==restaurantId){
    Alert.alert('veuillez commander les plats déja enregistré car ils sont de restaurants différents');
return;
}
const newItem={items:[...state.items,menu],restaurantId:restaurantId};
   setState(newItem);
    // router.push('/cart');
  };

  const removeFromCart = (itemId: string) => {
    const result=state.items.filter((x)=>x.id !== itemId);
    const newItem={items:result,restaurantId:state.restaurantId};
    setState(newItem);

  };

  const updateQuantity = (itemId: string, quantity: number) => {
   const result= state.items.map((item) =>
        item.id === itemId ? { ...item, nbre:quantity } : item
      )
  const newItem={items:result,restaurantId:state.restaurantId} ;
  setState(newItem);
  };

  const clearCart = () => {
  setState(initialState);
  return true;
  };

  const getCartTotal = (): number => {
    console.log('state.items',state.items);
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        restaurantCartId:state.restaurantId,
        addToCart,
         removeFromCart,
        updateQuantity,
         clearCart,
         getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
