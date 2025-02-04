// app/orders/[orderId].js
import { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
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


export default function OrderDetailScreen() {
  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item) : null;
  console.log("item:",item);
  const {id,items,pricing}=item;
  const {name,price,quantity}=items;
  const {net,subtotal,tax,deliveryFree}=pricing;
  const [order, setOrder] = useState(null);
  const [partnerLocation, setPartnerLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 
console.log(" orderId uselocal params :",id );
  const handleLocationUpdate = useCallback((data) => {
    if (data.orderId === id && isValidLocation(data.location)) {
      setPartnerLocation({
        latitude: data.location.latitude,
        longitude: data.location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [id]);

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
          setOrder(orderData);
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

  // Socket.io connection
  useEffect(() => {
    if (!id) return;
    console.log("socket.emit('join_order', orderId):", id);
    const socket = io(process.env.EXPO_PUBLIC_SOCKET_SERVER_URL);
    socket.on('connect', () => {
    console.log('Connected to tracking server');
 
    socket.emit('join_order', id);
    });

    socket.on('location_updated', handleLocationUpdate);

    // socket.on('connect_error', (err) => {
    // console.error('Socket connection error:', err);
    // setError('Real-time tracking unavailable');  
    // });

    return () => {
      socket.off('location_updated', handleLocationUpdate);
      socket.emit('leave_order', id);
      socket.disconnect();
    };
  }, [id, handleLocationUpdate]);

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

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Order data not available</Text>
      </View>
    );
  }
console.log("order user",order);
console.log("order.estimatedDelivery :",order.estimatedDelivery);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: order.deliveryAddress?.lat || 37.78825,
          longitude: order.deliveryAddress?.lng || -122.4324,
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
            title="Delivery Partner"
            pinColor="#0066cc"
          />
        )}

        {/* Destination Marker */}
        {order.deliveryAddress && (
          <Marker
            coordinate={{
              latitude: order.deliveryAddress.lat,
              longitude: order.deliveryAddress.lng,
            }}
            title="Delivery Address"
            pinColor="#34d399"
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
                    justifyContent:"space-around",
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
                      justifyContent:"space-around",
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
    fontSize: 24,
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


