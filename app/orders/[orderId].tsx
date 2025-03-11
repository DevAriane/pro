// app/orders/[orderId].js
import { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '@/firebase';
import MapView, { Marker } from 'react-native-maps';
import { io } from 'socket.io-client';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import Foundation from "@expo/vector-icons/Foundation";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrderContext";
import Notif from '../notif';
import { orders } from '@/data/seedData';
import { useTracking } from '@/contexts/TrackingContext';
export default function OrderDetailScreen() {

  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item) : null;
  console.log("item:", item);
  const { id, items, pricing, delivery } = item;
  const { address } = delivery;
  const { coordinates } = address;
  const { longitude, latitude } = coordinates;
  console.log("longitude:", longitude);
  console.log("latitude:", latitude);
  const { name, price, quantity, img } = items;
  const { net, subtotal, tax, deliveryFree } = pricing;
  const [order, setOrder] = useState<any>(null);
  const [partnerLocation, setPartnerLocation] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { socket, isConnected } = useTracking();

  // const socket = io("https://serveur-production-7b71.up.railway.app", {
  //   transports: ["websocket"],
  //   path: "/socket.io",
  // });
 // const socket = io("https://socket-server-hfig.onrender.com:8001"); // Replace with your server URL

  const [location, setLocation] = useState(null);
  // const [loading, setLoading] = useState(true);

  console.log(" orderId uselocal params :", id);

  const isValidLocation = (location) => {
    return (
      location &&
      typeof location.latitude === 'number' &&
      typeof location.longitude === 'number'
    );
  };

  // Real-time order data
  useEffect(() => {
    const orderRef = doc(firestore, 'orders', id);
    const unsubscribe = onSnapshot(
      orderRef,
      (doc) => {
        if (doc.exists()) {
          const orderData = doc.data();
          const orderId = doc.id;
          setOrder({ ...orderData, id: orderId });
          setLoading(false);
        } else {
          setError('Order not found');
          setLoading(false);
        }
      },
      (err) => {
        setError('Failed to fetch order details');
        console.error('Firestore error:', err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [id]);


  useEffect(() => {
    if (!socket || !isConnected || !order) {
      return;
    }
    const id = order.id;
    // Join the room for the specific order
    socket.emit('join_order', id);
    console.log(`Joined order room: order_${id}`);

    // Listener for location updates
    socket.on('location_updated', (data) => {
      if (data.orderId === id) {
        setPartnerLocation(data.location);
        setLoading(false);
      }
    });

    // Handle error events
    socket.on('error', (error) => {
      console.error('Socket error:', error);
      setError('WebSocket connection error');
      setLoading(false);
    });

    return () => {
      socket.off('location_updated');
      socket.off('error');
    };
  }, [socket, isConnected, order]);


  // useEffect(() => {
  //   if (isConnected && socket && order) {

  //     console.log("🎉 Écoute des mises à jour des commandes...");
  //     socket.on("order_update", (data) => {
  //       console.log("📦 Nouvelle mise à jour de commande :", data);
  //     });
  //   }

  //   return () => {
  //     if (socket) socket.off("order_update");
  //   };
  // }, [socket, isConnected, order]);


  // useEffect(() => {
  //   console.log("socket",socket);
  //   if (!socket || !order) return;
  //   console.log('order', order);

  //   const orderId = order.id;
  //   // Join the order room
  //   const joinOrderRoom = () => {
  //     console.log("joinOrder");
  //     socket.emit('join_order', orderId);
  //     console.log(`Joined order room: order_${orderId}`);
  //   };

  //   // Listen for location updates
  //   const handleLocationUpdate = (data) => {
  //     console.log('handleLocationUpdate');
  //     console.log('data:', data.location);
  //     if (data.orderId === orderId) {
  //       setPartnerLocation(data.location);
  //       setLoading(false);
  //     }
  //   };

  //   // Handle errors
  //   const handleError = (error) => {
  //     console.error('Socket error:', error);
  //     setLoading(false);
  //   };

  //   // Set up listeners
  //   socket.on('connect', joinOrderRoom);
  //   socket.on('location_updated', handleLocationUpdate);
  //   socket.on('error', handleError);

  //   // Cleanup listeners on unmount
  //   return () => {
  //     socket.off('connect', joinOrderRoom);
  //     socket.off('location_updated', handleLocationUpdate);
  //     socket.off('error', handleError);
  //   };
  // }, [socket, order]);


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  console.log("partnerLocation 223:", partnerLocation);
  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Order data not available</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: order.delivery.address.coordinates.latitude,
          longitude: order.delivery.address.coordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsCompass={true}
        showsPointsOfInterest={false}
      >
        {/* Delivery Partner Marker */}
        {partnerLocation && (
          <Marker
            coordinate={partnerLocation}
            title="Delivery Partner Address"
            pinColor="blue"
          />
        )}

        {/* Destination Marker */}

{order.delivery.address.coordinates &&
     (   <Marker
          coordinate={{
            latitude: order.delivery.address.coordinates.latitude,
            longitude: order.delivery.address.coordinates.longitude,
          }}
          title="Your Address"
          pinColor="red"


        />
)}


      </MapView>

      <View style={styles.content}>
        <Text style={styles.title}>Order #{id}</Text>

        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Current Status:</Text>
          <Text style={[styles.statusText, styles[order.status]]}>
            {order.status.current.toUpperCase()}
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>

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
                  borderRadius: 25,  // La moitié de la largeur/hauteur pour créer un cercle
                  backgroundColor: "whitesmoke",
                  height: 50,
                  width: 50,
                  margin: 5,
                }}
              >
                <Image
                  source={{ uri: img }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 25,  // Ajouter un borderRadius pour que l'image épouse la forme circulaire
                    borderColor: 'transparent',
                    borderWidth: 1,
                  }}
                  resizeMode="cover"
                />
              </View>

              <View>
                <Text style={{ fontWeight: 500 }}>{name}</Text>
                <Text style={{ fontSize: 14, color: "gray" }}>

                </Text>
              </View>
              <View>
                <Text>Prix unitaire:<Text style={{ color: "blue", fontWeight: 'bold' }}> {price.toFixed(0)}$ </Text></Text>
                <Text>Quantité:<Text style={{ color: "blue", fontWeight: 'bold' }}> {quantity}$ </Text></Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "transparent",
              backgroundColor: "white",
              margin: 5,
              padding: 15,
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
                justifyContent: "space-around",
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
                <Text style={{ padding: 5, fontSize: 19, fontStyle: 'italic' }}>items total</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Entypo name="export" size={24} color="black" />
                <Text style={{ color: "blue", fontWeight: 'bold' }}>{subtotal.toFixed(0)}$</Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: 'space-around',
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <MaterialIcons
                  name="delivery-dining"
                  size={24}
                  color="black"
                />{" "}
                <Text style={{ padding: 5, fontSize: 19, fontStyle: 'italic' }}>Delivery charge</Text>
              </View>
              <View
                style={{

                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Entypo name="export" size={24} color="black" />
                <Text style={{ color: "blue", fontWeight: 'bold' }}>{deliveryFree}$</Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: 'space-around',
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
                <Text style={{ padding: 5, fontSize: 19, fontStyle: 'italic' }}>Handing charge</Text>
              </View>
              <View
                style={{

                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Entypo name="export" size={24} color="black" />
                <Text style={{ color: "blue", fontWeight: 'bold' }}>{quantity}$</Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: 'space-around',
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
                <Text style={{ padding: 5, fontSize: 19, fontStyle: 'italic' }}>Surge charge</Text>
              </View>
              <View
                style={{

                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Entypo name="export" size={24} color="black" />
                <Text style={{ color: "blue", fontWeight: 'bold' }}>{tax}$</Text>
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
                justifyContent: 'space-around',
              }}
            >
              <View>
                <Text style={{ fontWeight: 500, padding: 5, fontSize: 19 }}>
                  Grand Total
                </Text>
              </View>
              <View
                style={{

                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Entypo name="export" size={24} color="black" />
                <Text style={{ color: "red", fontWeight: 'bold' }}>{net.toFixed(0)}$</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  del: {
    backgroundColor: "white",
    margin: 5,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1f2937',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 16,
    color: '#6b7280',
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  pending: {
    backgroundColor: '#fef3c7',
    color: '#d97706',
  },
  preparing: {
    backgroundColor: '#bfdbfe',
    color: '#1d4ed8',
  },
  in_transit: {
    backgroundColor: '#c7d2fe',
    color: '#4f46e5',
  },
  delivered: {
    backgroundColor: '#dcfce7',
    color: '#16a34a',
  },
  details: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailText: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
  error: {
    color: '#dc2626',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});


