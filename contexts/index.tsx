import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import { OrderProvider } from './OrderContext';
import { RestaurantProvider } from './RestaurantContext';
import { LocationProvider } from './LocationContext';
import { ReactNode } from 'react';

interface AppProvidersProps {
    children: ReactNode;
}
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <LocationProvider>
        <RestaurantProvider>
          <CartProvider>
            <OrderProvider>
              {children}
            </OrderProvider>
          </CartProvider>
        </RestaurantProvider>
      </LocationProvider>
    </AuthProvider>
  );
};