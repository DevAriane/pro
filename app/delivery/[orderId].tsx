// app/partner/orders/[orderId].js
import { useEffect, useState, useCallback } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Button, Alert, SafeAreaView, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "@/firebase";
import MapView, { Marker } from "react-native-maps";
import { io } from "socket.io-client";
import * as Location from "expo-location";
import { useAuth } from "@/contexts/AuthContext";
import Foundation from "@expo/vector-icons/Foundation";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import { useOrders } from "@/contexts/OrderContext";
import { ScrollView } from "react-native";
import { Link } from "expo-router";
import { getCurrentAddress } from "@/utils/location";


export default function PartnerOrderScreen() {
  const { orderId } = useLocalSearchParams();
  const { updateOrder } = useOrders();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log('orderId delivery:', orderId);
  console.log('order delivery:', order);
  const [partenerLocation, setPartnerLocation] = useState(null);
  const [time, setTime] = useState(0);
  const [socket, setSocket] = useState(null);
  // Request location permissions  
  console.log("partenerLocation:", partenerLocation);
  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Location access is required for delivery tracking"
      );
      return false;
    }
    return true;
  };



  // Handle status change actions
  const handleAcceptOrder = async () => {
    console.log('acept order ')
    if (!(await requestLocationPermission())) return;

    const updates = {
      deliveryPartnerId: user.uid,
      status: {
        current: 'ASSIGNED',
        timeline: [
          ...order?.status?.timeline,
          {
            "status": "ASSIGNED",
            "timestamp": new Date(),
            "note": "Order accepted"
          }
        ]
      }
    }
    await updateOrder(orderId, updates);
  };

  const handlePickUpOrder = async () => {
    const updates = {
      deliveryPartnerId: user.uid,
      status: {
        current: 'PICKEDUP',
        timeline: [
          ...order?.status?.timeline,
          {
            "status": 'PICKEDUP',
            "timestamp": new Date(),
            "note": "Driver picked up order"
          }
        ]
      }
    }
    await updateOrder(orderId, updates);
  };
  const handleDeliverOrder = async () => {
    const updates = {
      deliveryPartnerId: user.uid,
      status: {
        current: 'DELIVERED',
        timeline: [
          ...order?.status?.timeline,
          {
            "status": 'DELIVERED',
            "timestamp": new Date(),
            "note": "Driver picked up order"
          }
        ]
      }
    }
    await updateOrder(orderId, updates);
  };

  // const handlePickUpOrder = async () => {
  //   await updateOrderStatus('picked_up');
  //   startLocationTracking();
  // };

  // const handleDeliverOrder = async () => {
  //   await updateOrderStatus('delivered');
  //   stopLocationTracking();
  //   router.back();
  // };

  // Location tracking functions

  // Real-time order data
  useEffect(() => {
    const orderRef = doc(firestore, "orders", orderId);
    const unsubscribe = onSnapshot(
      orderRef,
      (doc) => {
        if (doc.exists()) {
          setOrder(doc.data());
          setLoading(false);
        } else {
          setError("Order not found");
          setLoading(false);
        }
      },
      (err) => {
        setError("Failed to load order");
        console.error("Firestore error:", err);
        setLoading(false);
      }
    );
    console.log('order accept', order);
    return unsubscribe;
  }, [orderId]);
  useEffect(() => {
    const getLocation = async () => {
      const address = await getCurrentAddress();
      if (address) {
        console.log("addresse",address);
        setPartnerLocation(address?.coordinates);
      }

    }
    getLocation();
  }, []);

  useEffect(() => {
    if (!orderId || !user) return;

    const newSocket = io(process.env.EXPO_PUBLIC_SOCKET_SERVER_URL, {
      auth: {
        token: user.accessToken,
        userId: user.uid,
      }
    });

    newSocket.on('connect', () => {
      console.log('Connected to tracking server');
      newSocket.emit('join_order', orderId);
    });

    newSocket.on('location_update', (data) => {
      console.log('Location update:', data);
      setPartnerLocation(data.coordinates);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [orderId, user]);

  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in km
    const toRad = (angle) => (angle * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  useEffect(() => {
    if (!order || !partenerLocation) return;

    console.log("order coordinates",order.delivery);

    let latitude1 = order.delivery.address.coordinates.latitude;
    let longitude1 = order.delivery.address.coordinates.longitude;
    let latitude2 = partenerLocation.latitude;
    let longitude2 = partenerLocation.longitude;
    
    let distance = haversineDistance(latitude1, longitude1, latitude2, longitude2);
    let temps = (distance / 60) * 60;
    console.log('temps:',temps);
    setTime(temps);
   
  }, [partenerLocation,order]);


  console.log("order delivery ",order);
 


  // Socket.io connection
  // useEffect(() => {
  //   if (!orderId || !user) return;

  //   const newSocket = io(process.env.EXPO_PUBLIC_SOCKET_SERVER_URL, {
  //     auth: {
  //       token: user.accessToken,
  //       userId: user.uid
  //     }
  //   });

  //   newSocket.on('connect', () => {
  //     console.log('Connected to tracking server');
  //     newSocket.emit('join_order', orderId);
  //   });

  //   newSocket.on('connect_error', (err) => {
  //     console.error('Socket connection error:', err);
  //     setError('Real-time tracking unavailable');
  //   });

  //   setSocket(newSocket);

  //   return () => {
  //     newSocket.disconnect();
  //     stopLocationTracking();
  //   };
  // }, [orderId, user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // if (error) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.error}>{error}</Text>
  //     </View>
  //   );
  // }

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Order not found</Text>
      </View>
    );
  }

  const isAssignedPartner = order.deliveryPartnerId === user.uid;
  const isActiveOrder = ["ASSIGNED", "PICKEDUP"].includes(order.status.current);

  const orderStatus = order.status.current.toLowerCase();


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,

          // justifyContent: "space-between",
          backgroundColor: "whitesmoke",
        }}
      >
        <View style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'flex-start', backgroundColor: "green", height: 50, marginTop: 28 }}>
          <Pressable style={{ margin: 12 }} onPress={() => { router.back() }}> <AntDesign name="leftcircleo" size={24} color="white" /></Pressable>
          <View style={{ marginLeft: 70 }}>
            <Text style={{ fontWeight: "bold", fontSize: 14, color: "white" }}>Start this order</Text>
            <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>Delivery in {time.toFixed(2)} minutes</Text>
          </View>
        </View>
        <ScrollView>

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: order?.delivery?.address?.coordinates?.latitude,
              longitude: order?.delivery?.address?.coordinates?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {/* Restaurant Marker */}
            {/* {order.restaurant && (
              <Marker
                coordinate={{
                  latitude: order.restaurant.lat,
                  longitude: order.restaurant.lng,
                }}
                title="Restaurant"
                pinColor="#f59e0b"
                image={'./assets/images/map.png'} 
              />
            )}  */}


            {/* Delivery Address Marker */}
  {order && <Marker
              coordinate={{
                latitude: order?.delivery.address.coordinates.latitude,
                longitude: order?.delivery.address.coordinates.longitude,
              }}
              title="Delivery Address"
              pinColor="red"

            />}


            {/* Partner Marker */}
            {partenerLocation && (
              <Marker
                coordinate={partenerLocation}
                title="Partener Location"
                pinColor="blue"

              />
            )}
          </MapView>

          <View style={styles.content}>
            <Text style={styles.title}>Order #{orderId.slice(0, 8)}</Text>

            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>Current Status:</Text>
              <Text style={[styles.statusText, styles[orderStatus]]}>
                {order.status.current.replace("_", " ").toUpperCase()}
              </Text>
            </View>
            <View style={styles.details}>
              <ScrollView>

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
                      margin: 2,


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
                    <View style={{ overflow: "scroll" }} >
                      <Text>Delivery at Home</Text>

                      <Text style={{ fontSize: 14, color: "gray", overflow: "scroll" }}>
                        645A/864.janki Vhar colory , jankpuram
                      </Text>
                      <Text style={{ fontSize: 14, color: "gray" }}>
                        LUCKnow. Uttar Pradesh 226021, India
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
                      <Foundation name="telephone" size={24} color="black" />
                    </View>
                    <View>
                      {" "}
                      <Text>Rtix Prassad phone <Text style={{ color: "red", fontWeight: "bold" }}>{order.phone} </Text> </Text>
                      <Text style={{ fontSize: 14, color: "gray" }}>
                        Receiver's contact no.
                      </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>

          <View>
            {!isAssignedPartner && order.status.current === "PENDING" && (
              <Button title="Accept Order" onPress={() => handleAcceptOrder()} color='green' />
            )}

            {isAssignedPartner && (
              <>
                {order.status.current === "ASSIGNED" && (
                  <Button
                    title="Mark as Picked Up"
                    onPress={() => { handlePickUpOrder() }}
                    color="#10b981"
                  />
                )}

                {order.status.current === "PICKEDUP" && (
                  <Button
                    title="Mark as Delivered"
                    onPress={() => { handleDeliverOrder() }}
                    color="#10b981"
                  />
                )}
              </>
            )}

            {isActiveOrder && !order?.partnerLocation && (
              <Text style={styles.warning}>
                Location tracking is required for order delivery
              </Text>
            )}</View>
        </ScrollView>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: "60%",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1f2937",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 16,
    color: "#6b7280",
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  pending: {
    backgroundColor: "#fef3c7",
    color: "#d97706",
  },
  accepted: {
    backgroundColor: "#bfdbfe",
    color: "#1d4ed8",
  },
  picked_up: {
    backgroundColor: "#c7d2fe",
    color: "#4f46e5",
  },
  delivered: {
    backgroundColor: "#dcfce7",
    color: "#16a34a",
  },
  details: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,

  },
  detailText: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 8,
  },
  error: {
    color: "#dc2626",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  warning: {
    color: "#d97706",
    textAlign: "center",
    marginTop: 10,
  },

  del: {
    backgroundColor: "white",
    margin: 5,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
  },
});
