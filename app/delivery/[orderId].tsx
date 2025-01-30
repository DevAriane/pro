//  // app/partner/orders/[orderId].js
// import { useEffect, useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   ActivityIndicator,
//   StyleSheet,
//   Button,
//   Alert,
//   SafeAreaView,
// } from "react-native";
// import { useLocalSearchParams, router } from "expo-router";
// import { doc, updateDoc, onSnapshot } from "firebase/firestore";
// import { firestore } from "@/firebase";
// import MapView, { Marker } from "react-native-maps";
// import { io } from "socket.io-client";
// import * as Location from "expo-location";
// import { useAuth } from "@/contexts/AuthContext";
// import Foundation from "@expo/vector-icons/Foundation";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import Feather from "@expo/vector-icons/Feather";
// import { useOrders } from "@/contexts/OrderContext";

// export default function PartnerOrderScreen() {
//   const { orderId } = useLocalSearchParams();
//   const {updateOrder} = useOrders();
//   const { user } = useAuth();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [partnerLocation, setPartnerLocation] = useState(null);
//   const [socket, setSocket] = useState(null);
//   const [locationSubscription, setLocationSubscription] = useState(null);

//   // Request location permissions
//   const requestLocationPermission = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert(
//         "Permission denied",
//         "Location access is required for delivery tracking"
//       );
//       return false;
//     }
//     return true;
//   };

//   // Handle status change actions
//   const handleAcceptOrder = async () => {
//     console.log('acept order ')
//     if (!(await requestLocationPermission())) return;

//     console.log('rororor')
//     const updates = {
//       status: {
//         current : 'ASSIGNED',
//         timeline: [
//           ...order?.status?.timeline,
//           {
//             "status": "ASSIGNED",
//             "timestamp": new Date(),
//             "note": "Order accepted"
//           }
//         ]
//       }
//     }
//     await updateOrder(orderId, updates);
//   };

//   // const handlePickUpOrder = async () => {
//   //   await updateOrderStatus('picked_up');
//   //   startLocationTracking();
//   // };

//   // const handleDeliverOrder = async () => {
//   //   await updateOrderStatus('delivered');
//   //   stopLocationTracking();
//   //   router.back();
//   // };

//   // Location tracking functions
//   const startLocationTracking = async () => {
//     const hasPermission = await requestLocationPermission();
//     if (!hasPermission) return;

//     const sub = await Location.watchPositionAsync(
//       { accuracy: Location.Accuracy.High, distanceInterval: 10 },
//       (location) => {
//         const { latitude, longitude } = location.coords;
//         setPartnerLocation({ latitude, longitude });
//         if (socket) {
//           socket.emit('update_location', {
//             orderId,
//             location: { latitude, longitude }
//           });
//         }
//       }
//     );
//     setLocationSubscription(sub);
//   };

//   const stopLocationTracking = () => {
//     if (locationSubscription) {
//       locationSubscription.remove();
//       setLocationSubscription(null);
//     }
//   };

//   // Real-time order data
//   useEffect(() => {
//     const orderRef = doc(firestore, "orders", orderId);
//     const unsubscribe = onSnapshot(
//       orderRef,
//       (doc) => {
//         if (doc.exists()) {
//           setOrder(doc.data());
//           setLoading(false);
//         } else {
//           setError("Order not found");
//           setLoading(false);
//         }
//       },
//       (err) => {
//         setError("Failed to load order");
//         console.error("Firestore error:", err);
//         setLoading(false);
//       }
//     );

//     return unsubscribe;
//   }, [orderId]);

//   // Socket.io connection
//   // useEffect(() => {
//   //   if (!orderId || !user) return;

//   //   const newSocket = io(process.env.EXPO_PUBLIC_SOCKET_SERVER_URL, {
//   //     auth: {
//   //       token: user.accessToken,
//   //       userId: user.uid
//   //     }
//   //   });

//   //   newSocket.on('connect', () => {
//   //     console.log('Connected to tracking server');
//   //     newSocket.emit('join_order', orderId);
//   //   });

//   //   newSocket.on('connect_error', (err) => {
//   //     console.error('Socket connection error:', err);
//   //     setError('Real-time tracking unavailable');
//   //   });

//   //   setSocket(newSocket);

//   //   return () => {
//   //     newSocket.disconnect();
//   //     stopLocationTracking();
//   //   };
//   // }, [orderId, user]);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   // if (error) {
//   //   return (
//   //     <View style={styles.container}>
//   //       <Text style={styles.error}>{error}</Text>
//   //     </View>
//   //   );
//   // }

//   if (!order) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.error}>Order not found</Text>
//       </View>
//     );
//   }

//   const isAssignedPartner = order.deliveryPartnerId === user.uid;
//   const isActiveOrder = ["ASSIGNED", "PICKEDUP"].includes(order.status.current);

//   const orderStatus = order.status.current.toLowerCase();

//   console.log("isAssignedPartner", isAssignedPartner);

//   console.log("order details ", order.status.current);

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View
//         style={{
//           flex: 1,
//           marginTop: 50,
//           // justifyContent: "space-between",
//           backgroundColor: "whitesmoke",
//         }}
//       >
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: order.restaurant?.lat || 37.78825,
//             longitude: order.restaurant?.lng || -122.4324,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//           {/* Restaurant Marker */}
//           {/* {order.restaurant && (
//               <Marker
//                 coordinate={{
//                   latitude: order.restaurant.lat,
//                   longitude: order.restaurant.lng,
//                 }}
//                 title="Restaurant"
//                 pinColor="#f59e0b"
//               />
//             )} */}


//           {/* Delivery Address Marker */}
//           {order.delivery.address && (
//             <Marker
//               coordinate={{
//                 latitude: order.delivery.address.coordinates.latitude,
//                 longitude: order.delivery.address.coordinates.longitude,
//               }}
//               title="Delivery Address"
//               pinColor="#10b981"
//             />
//           )}

//           {/* Partner Marker */}
//           {partnerLocation && (
//             <Marker
//               coordinate={partnerLocation}
//               title="Your Location"
//               pinColor="#3b82f6"
//             />
//           )}
//         </MapView>

//         <View style={styles.content}>
//           <Text style={styles.title}>Order #{orderId.slice(0, 8)}</Text>

//           <View style={styles.statusContainer}>
//             <Text style={styles.statusLabel}>Current Status:</Text>
//             <Text style={[styles.statusText, styles[orderStatus]]}>
//               {order.status.current.replace("_", " ").toUpperCase()}
//             </Text>
//           </View>

//           <View style={styles.details}>
//             <View style={styles.del}>
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   alignItems: "center",
//                   margin: 5,
//                 }}
//               >
//                 <View
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     borderWidth: 1,
//                     borderColor: "transparent",
//                     borderRadius: "50%",
//                     backgroundColor: "whitesmoke",
//                     height: 50,
//                     width: 50,
//                     margin: 5,
//                   }}
//                 >
//                   <MaterialIcons
//                     name="delivery-dining"
//                     size={24}
//                     color="black"
//                   />
//                 </View>
//                 <View>
//                   <Text style={{ fontWeight: "bold" }}>
//                     Your delivery details
//                   </Text>
//                   <Text style={{ fontSize: 14, color: "gray" }}>
//                     Details of your current order
//                   </Text>
//                 </View>
//               </View>
//             </View>
//             <View style={styles.del}>
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   alignItems: "center",
//                   margin: 5,
//                 }}
//               >
//                 <View
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     borderWidth: 1,
//                     borderColor: "transparent",
//                     borderRadius: "50%",
//                     backgroundColor: "whitesmoke",
//                     height: 50,
//                     width: 50,
//                     margin: 5,
//                   }}
//                 >
//                   <Feather name="map-pin" size={24} color="black" />
//                 </View>
//                 <View>
//                   <Text>Delivery at Home</Text>
//                   <Text style={{ fontSize: 14, color: "gray" }}>
//                     645A/864.janki Vhar colory , jankpuram
//                   </Text>
//                   <Text style={{ fontSize: 14, color: "gray" }}>
//                     LUCKnow. Uttar Pradesh 226021, India
//                   </Text>
//                 </View>
//               </View>
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   alignItems: "center",
//                   margin: 5,
//                 }}
//               >
//                 <View
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     borderWidth: 1,
//                     borderColor: "transparent",
//                     borderRadius: "50%",
//                     backgroundColor: "whitesmoke",
//                     height: 50,
//                     width: 50,
//                     margin: 5,
//                   }}
//                 >
//                   <Foundation name="telephone" size={24} color="black" />
//                 </View>
//                 <View>
//                   {" "}
//                   <Text>Rtix Prassad phone  </Text>
//                   <Text style={{ fontSize: 14, color: "gray" }}>
//                     Receiver's contact no.
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>


//           {!isAssignedPartner && order.status.current === "PENDING" && (
//           <Button title="Accept Order" onPress={handleAcceptOrder} color="#3b82f6" />
//         )}

//         {isAssignedPartner && (
//           <>
//             {order.status.current === "ASSIGNED" && (
//               <Button
//                 title="Mark as Picked Up"
//                 onPress={() => {}}
//                 color="#10b981"
//               />
//             )}

//             {order.status.current === "PICKEDUP" && (
//               <Button
//                 title="Mark as Delivered"
//                 onPress={() => {}}
//                 color="#10b981"
//               />
//             )}
//           </>
//         )}

//         {isActiveOrder && !partnerLocation && (
//           <Text style={styles.warning}>
//             Location tracking is required for order delivery
//           </Text>
//         )}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   map: {
//     width: "100%",
//     height: "40%",
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 16,
//     color: "#1f2937",
//   },
//   statusContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   statusLabel: {
//     fontSize: 16,
//     color: "#6b7280",
//     marginRight: 8,
//   },
//   statusText: {
//     fontSize: 16,
//     fontWeight: "600",
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 8,
//   },
//   pending: {
//     backgroundColor: "#fef3c7",
//     color: "#d97706",
//   },
//   accepted: {
//     backgroundColor: "#bfdbfe",
//     color: "#1d4ed8",
//   },
//   picked_up: {
//     backgroundColor: "#c7d2fe",
//     color: "#4f46e5",
//   },
//   delivered: {
//     backgroundColor: "#dcfce7",
//     color: "#16a34a",
//   },
//   details: {
//     backgroundColor: "#f8fafc",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 20,
//   },
//   detailText: {
//     fontSize: 16,
//     color: "#374151",
//     marginBottom: 8,
//   },
//   error: {
//     color: "#dc2626",
//     fontSize: 16,
//     textAlign: "center",
//     marginTop: 20,
//   },
//   warning: {
//     color: "#d97706",
//     textAlign: "center",
//     marginTop: 10,
//   },

//   del: {
//     backgroundColor: "white",
//     margin: 5,
//     borderWidth: 1,
//     borderColor: "transparent",
//     borderRadius: 5,
//   },
// });
