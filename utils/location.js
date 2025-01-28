// utils/location.ts
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export const getCurrentAddress = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  
  if (status !== 'granted') {
    Alert.alert(
      'Permission Required',
      'Please enable location services to set delivery address',
      [{ text: 'OK', onPress: () => Location.requestForegroundPermissionsAsync() }]
    );
    return null;
  }

  try {
    const location = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync(location.coords);
    
    if (address.length > 0) {
      return {
        street: address[0].street || '',
        city: address[0].city || '',
        state: address[0].region || '',
        postalCode: address[0].postalCode || '',
        coordinates: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting location:', error);
    return null;
  }
};