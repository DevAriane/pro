import { View, Text } from 'react-native'
import React from 'react'

const OrderDetailScreen = () => {
  return (
    <View>
      <Text>OrderDetailScreen</Text>
    </View>
  )
}

export default OrderDetailScreen

// // app/orders/[orderId].js
// import { useEffect, useState, useCallback } from 'react';
// import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import { doc, onSnapshot } from 'firebase/firestore';
// import { firestore } from '@/firebase';
// import MapView, { Marker } from 'react-native-maps';
// import { io } from 'socket.io-client';

// export default function OrderDetailScreen() {
//   const { orderId } = useLocalSearchParams();
//   const [order, setOrder] = useState(null);
//   const [partnerLocation, setPartnerLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const handleLocationUpdate = useCallback((data) => {
//     if (data.orderId === orderId && isValidLocation(data.location)) {
//       setPartnerLocation({
//         latitude: data.location.latitude,
//         longitude: data.location.longitude,
//         latitudeDelta: 0.005,
//         longitudeDelta: 0.005,
//       });
//     }
//   }, [orderId]);

//   const isValidLocation = (location) => {
//     return (
//       location &&
//       typeof location.latitude === 'number' &&
//       typeof location.longitude === 'number'
//     );
//   };

//   // Real-time order data
//   useEffect(() => {
//     const orderRef = doc(firestore, 'orders', orderId);
//     const unsubscribe = onSnapshot(
//       orderRef,
//       (doc) => {
//         if (doc.exists()) {
//           const orderData = doc.data();
//           setOrder(orderData);
//           setLoading(false);
//         } else {
//           setError('Order not found');
//           setLoading(false);
//         }
//       },
//       (err) => {
//         setError('Failed to fetch order details');
//         console.error('Firestore error:', err);
//         setLoading(false);
//       }
//     );

//     return unsubscribe;
//   }, [orderId]);

//   // Socket.io connection
//   useEffect(() => {
//     if (!orderId) return;

//     const socket = io(process.env.EXPO_PUBLIC_SOCKET_SERVER_URL);

//     socket.on('connect', () => {
//       console.log('Connected to tracking server');
//       socket.emit('join_order', orderId);
//     });

//     socket.on('location_updated', handleLocationUpdate);

//     socket.on('connect_error', (err) => {
//       console.error('Socket connection error:', err);
//       setError('Real-time tracking unavailable');
//     });

//     return () => {
//       socket.off('location_updated', handleLocationUpdate);
//       socket.emit('leave_order', orderId);
//       socket.disconnect();
//     };
//   }, [orderId, handleLocationUpdate]);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.error}>{error}</Text>
//       </View>
//     );
//   }

//   if (!order) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.error}>Order data not available</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: order.deliveryAddress?.lat || 37.78825,
//           longitude: order.deliveryAddress?.lng || -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//         showsUserLocation={true}
//         showsCompass={true}
//         showsPointsOfInterest={false}
//       >
//         {/* Delivery Partner Marker */}
//         {partnerLocation && (
//           <Marker
//             coordinate={partnerLocation}
//             title="Delivery Partner"
//             pinColor="#0066cc"
//           />
//         )}

//         {/* Destination Marker */}
//         {order.deliveryAddress && (
//           <Marker
//             coordinate={{
//               latitude: order.deliveryAddress.lat,
//               longitude: order.deliveryAddress.lng,
//             }}
//             title="Delivery Address"
//             pinColor="#34d399"
//           />
//         )}
//       </MapView>

//       <View style={styles.content}>
//         <Text style={styles.title}>Order #{orderId}</Text>
        
//         <View style={styles.statusContainer}>
//           <Text style={styles.statusLabel}>Current Status:</Text>
//           <Text style={[styles.statusText, styles[order.status]]}>
//             {order.status.toUpperCase()}
//           </Text>
//         </View>

//         <View style={styles.details}>
//           <Text style={styles.detailText}>
//             Total: ${order.total?.toFixed(2)}
//           </Text>
//           <Text style={styles.detailText}>
//             Items: {order.items?.length || 0}
//           </Text>
//           {order.estimatedDelivery && (
//             <Text style={styles.detailText}>
//               Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleTimeString()}
//             </Text>
//           )}
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   map: {
//     width: '100%',
//     height: '50%',
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     marginBottom: 16,
//     color: '#1f2937',
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   statusLabel: {
//     fontSize: 16,
//     color: '#6b7280',
//     marginRight: 8,
//   },
//   statusText: {
//     fontSize: 16,
//     fontWeight: '600',
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 8,
//   },
//   pending: {
//     backgroundColor: '#fef3c7',
//     color: '#d97706',
//   },
//   preparing: {
//     backgroundColor: '#bfdbfe',
//     color: '#1d4ed8',
//   },
//   in_transit: {
//     backgroundColor: '#c7d2fe',
//     color: '#4f46e5',
//   },
//   delivered: {
//     backgroundColor: '#dcfce7',
//     color: '#16a34a',
//   },
//   details: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   detailText: {
//     fontSize: 16,
//     color: '#374151',
//     marginBottom: 8,
//   },
//   error: {
//     color: '#dc2626',
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });