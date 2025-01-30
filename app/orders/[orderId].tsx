import {
  Image,
  StyleSheet,
  Platform,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Button,
  Linking,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import Foundation from "@expo/vector-icons/Foundation";
import { Link, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrderContext";
import MyMapComponent from "../map";

function DetailDelivery() {
  const { user } = useAuth();
  console.log("userrr", user);
  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item) : null;
  console.log("item detail delivery :", item);
  const {
    createdAt,
    id,
    items,
    payement,
    pricing,
    restaurantId,
    userId,
    status,
    phone,
    aff,
    email,
  } = item;
  const { itemId, name, price, quantity } = items;
  const { deliveryFree, net, subtotal, tax } = pricing;
  console.log("aff aff", aff);
  const { assignDeliveryPartner, orders } = useOrders();

  const affectOrder = (OrderId: string) => {
    assignDeliveryPartner(OrderId, user.uid);
    orders.Comming.filter((order) => order.id !== OrderId);
  };

  //  const sendSMS = () => {
  //     const phoneNumber = phone;  // Numéro du destinataire
  //     const message = 'votre réservation est en cours de livraison';
  //     const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

  //     // Ouvre l'application SMS avec le message pré-rempli
  //     Linking.openURL(smsUrl).catch(err => console.error('Erreur lors de l\'ouverture de l\'application SMS:', err));
  //   };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            backgroundColor: "whitesmoke",
          }}
        >
          <View
            style={{
              position: "fixed",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: 100,
              backgroundColor: "green",
            }}
          >
            <Link href="/livreuurProfil">
              {" "}
              <AntDesign name="left" size={24} color="black" />
            </Link>
            <View>
              <Text style={{ textAlign: "center", color: "black" }}>
                Start this order
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 20,
                  marginLeft: 50,
                  fontWeight: 500,
                }}
              >
                Delivery in 10 minutes
              </Text>
            </View>
          </View>
          <ScrollView>
            <View>
              <View
                style={{
                  width: "95%",
                  height: 200,
                  margin: 8,
                  borderWidth: 1,
                  borderColor: "transparent",
                  borderRadius: 5,
                  backgroundColor: "white",
                  opacity: 1,
                  marginHorizontal: "auto",
                }}
              >
                <MyMapComponent />
              </View>

              <View style={styles.del}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 5,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: "transparent",
                      borderRadius: "50%",
                      backgroundColor: "whitesmoke",
                      height: 50,
                      width: 50,
                      margin: 5,
                    }}
                  >
                    <MaterialIcons
                      name="delivery-dining"
                      size={24}
                      color="black"
                    />
                  </View>
                  <View>
                    <Text style={{ fontWeight: "bold" }}>
                      Your delivery details
                    </Text>
                    <Text style={{ fontSize: 14, color: "gray" }}>
                      Details of your current order
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.del}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 5,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: "transparent",
                      borderRadius: "50%",
                      backgroundColor: "whitesmoke",
                      height: 50,
                      width: 50,
                      margin: 5,
                    }}
                  >
                    <Feather name="map-pin" size={24} color="black" />
                  </View>
                  <View>
                    <Text>Delivery at Home</Text>
                    <Text style={{ fontSize: 14, color: "gray" }}>
                      645A/864.janki Vhar colory , jankpuram
                    </Text>
                    <Text style={{ fontSize: 14, color: "gray" }}>
                      LUCKnow. Uttar Pradesh 226021, India
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 5,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: "transparent",
                      borderRadius: "50%",
                      backgroundColor: "whitesmoke",
                      height: 50,
                      width: 50,
                      margin: 5,
                    }}
                  >
                    <Foundation name="telephone" size={24} color="black" />
                  </View>
                  <View>
                    {" "}
                    <Text>Rtix Prassad {phone}</Text>
                    <Text style={{ fontSize: 14, color: "gray" }}>
                      Receiver's contact no.
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.del}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 5,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: "transparent",
                      borderRadius: "50%",
                      backgroundColor: "whitesmoke",
                      height: 50,
                      width: 50,
                      margin: 5,
                    }}
                  >
                    <Ionicons
                      name="bag-handle-outline"
                      size={24}
                      color="black"
                    />
                  </View>
                  <View>
                    {" "}
                    <Text style={{ fontWeight: 500 }}>Order Summary</Text>
                    <Text style={{ fontSize: 14, color: "gray" }}>
                      Order ID.{id}
                    </Text>
                  </View>{" "}
                </View>
              </View>
              <View style={styles.del}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: "transparent",
                      borderRadius: "50%",
                      backgroundColor: "whitesmoke",
                      height: 50,
                      width: 50,
                      margin: 5,
                    }}
                  >
                    {/* <Image source={require('../../assets/images/milk.png')} /> */}
                  </View>
                  <View>
                    <Text style={{ fontWeight: 500 }}>{name}</Text>
                    <Text style={{ fontSize: 14, color: "gray" }}>
                      {status}
                    </Text>
                  </View>
                  <View>
                    <Text>Prix unitaire: {price}</Text>
                    <Text>Quantité: {quantity}</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "transparent",
                  backgroundColor: "white",
                  margin: 10,
                  padding: 5,
                }}
              >
                <View>
                  <Text style={{ padding: 5, fontWeight: 500 }}>
                    Bill Details
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <FontAwesome name="list-alt" size={24} color="black" />
                    <Text style={{ padding: 5 }}>items total</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 160,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Entypo name="export" size={24} color="black" />
                    <Text>{subtotal}</Text>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons
                      name="delivery-dining"
                      size={24}
                      color="black"
                    />{" "}
                    <Text style={{ padding: 5 }}>Delivery charge</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 130,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Entypo name="export" size={24} color="black" />
                    <Text>{deliveryFree}</Text>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome name="list-alt" size={24} color="black" />{" "}
                    <Text style={{ padding: 5 }}>Handing charge</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 125,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Entypo name="export" size={24} color="black" />
                    <Text>{quantity}</Text>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="rainy-sharp" size={24} color="black" />{" "}
                    <Text style={{ padding: 5 }}>Surge charge</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 140,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Entypo name="export" size={24} color="black" />
                    <Text>{tax}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.del}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 5,
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: 500, padding: 5 }}>
                      Grand Total
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 140,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Entypo name="export" size={24} color="black" />
                    <Text>{net}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.dele}>
                <View
                  style={{
                    backgroundColor: "green",
                    borderWidth: 1,
                    borderColor: "transparent",
                    borderRadius: 6,
                    height: 60,
                    margin: 4,
                  }}
                >
                  <TouchableOpacity onPress={() => affectOrder(user.uid)}>
                    {" "}
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        margin: 4,
                        fontWeight: 600,
                      }}
                    >
                      Accept Order
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
export default DetailDelivery;
const styles = StyleSheet.create({
  del: {
    backgroundColor: "white",
    margin: 5,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
  },
  dele: {
    backgroundColor: "white",
    margin: 5,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
    bottom: 0,
  },
});


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