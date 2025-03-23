import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Pressable, StatusBar, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { firestore } from '@/firebase';
import MapView, { Marker } from 'react-native-maps';
import { useTracking } from '@/contexts/TrackingContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Types
interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Order {
  id: string;
  delivery: { address: { coordinates: Coordinates } };
  restaurantId: string;
  status: { current: string };
  items: Array<{ name: string; price: number; nbre: number; imageUrl: string }>;
  pricing: { subtotal: number; deliveryFree: number; net: number };
}

// Helper Function: Calculate Distance
const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth radius in km
  const toRad = (angle: number) => (angle * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

export default function OrderDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const orderId = params.orderId as string;
  const { socket, isConnected } = useTracking();

  const [order, setOrder] = useState<Order | null>(null);
  const [restaurantCoords, setRestaurantCoords] = useState<Coordinates | null>(null);
  const [partnerLocation, setPartnerLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [estimatedTime, setEstimatedTime] = useState<number>(0);

  // Fetch Order Data
  useEffect(() => {
    if (!orderId) return;

    const orderRef = doc(firestore, 'orders', orderId);
    const unsubscribe = onSnapshot(
      orderRef,
      (doc) => {
        if (doc.exists()) {
          setOrder({ ...doc.data(), id: doc.id } as Order);
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
  }, [orderId]);

  // Fetch Restaurant Coordinates
  useEffect(() => {
    if (!order?.restaurantId) return;

    const fetchRestaurantCoords = async () => {
      try {
        const restaurantRef = doc(firestore, 'restaurants', order.restaurantId);
        const restaurantSnap = await getDoc(restaurantRef);
        if (restaurantSnap.exists()) {
          setRestaurantCoords(restaurantSnap.data().address.coordinates);
        } else {
          setError('Restaurant not found');
        }
      } catch (err) {
        console.error('Error fetching restaurant:', err);
        setError('Failed to fetch restaurant details');
      }
    };

    fetchRestaurantCoords();
  }, [order?.restaurantId]);

  // Listen for Socket Updates
  useEffect(() => {
    if (!socket || !isConnected || !order) return;

    socket.emit('join_order', order.id);

    const handleLocationUpdate = (data: any) => {
      if (data.orderId === order.id) {
        setPartnerLocation(data.location);
      }
    };

    const handleError = (error: any) => {
      console.error('Socket error:', error);
      setError('WebSocket connection error');
    };

    socket.on('location_updated', handleLocationUpdate);
    socket.on('error', handleError);

    return () => {
      socket.off('location_updated', handleLocationUpdate);
      socket.off('error', handleError);
    };
  }, [socket, isConnected, order]);

  // Calculate Estimated Delivery Time
  useEffect(() => {
    if (!restaurantCoords || !order) return;

<<<<<<< HEAD
  useEffect(()=>{
    if(partnerLocation==null && restaurantCoords ){
      let latitude1= order.delivery.address.coordinates.latitude;
      let longitude1=order.delivery.address.coordinates.longitude;
      let latitude2=restaurantCoords.latitude;
      let longitude2=restaurantCoords.longitude;
    let distance=haversineDistance(latitude1, longitude1,latitude2,longitude2);
    console.log("distance:",distance);
    let t=(distance/60)*60;
    setTemps(t);
    }
  else if(partnerLocation && restaurantCoords){
    let latitude1= order.delivery.address.coordinates.latitude;
    let longitude1=order.delivery.address.coordinates.longitude;
    let latitude3=partnerLocation.latitude;
      let longitude3=partnerLocation.longitude;
    
     let distance= haversineDistance(latitude1, longitude1,latitude3,longitude3);
    let t=(distance/60)*60;
    setTemps(t);
    }
    
    },[restaurantCoords])
    
    console.log("temps",temps);



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

=======
    const { latitude, longitude } = order.delivery.address.coordinates;
    const distance = haversineDistance(
      latitude,
      longitude,
      restaurantCoords.latitude,
      restaurantCoords.longitude
    );
    setEstimatedTime((distance / 60) * 60); // Simplified time calculation
  }, [restaurantCoords, order]);
>>>>>>> 151dc823ff1c900e92249069fb8b2848f22bfa92

  // Render Loading State
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Render Error State
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  // Render Missing Order Data
  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Order data not available</Text>
      </View>
    );
  }



  // Render Main UI
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <AntDesign name="leftcircleo" size={24} color="white" />
          </Pressable>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Start this order</Text>
            <Text style={styles.subtitle}>
              Livraison dans {estimatedTime < 1 ? 'moins 1' : estimatedTime.toFixed(0)} minutes
            </Text>
          </View>
        </View>

        {/* Map View */}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: order.delivery.address.coordinates.latitude,
            longitude: order.delivery.address.coordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
          showsCompass
          showsPointsOfInterest={false}
        >
          {restaurantCoords && (
            <Marker coordinate={restaurantCoords} title="Restaurant" pinColor="blue" />
          )}
          {partnerLocation && (
            <Marker coordinate={partnerLocation} title="Delivery Partner" pinColor="black" />
          )}
          {order.delivery.address.coordinates && (
            <Marker
              coordinate={order.delivery.address.coordinates}
              title="Your Address"
              pinColor="red"
            />
          )}
        </MapView>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Status */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Status courant:</Text>
            <Text style={[styles.statusText, styles[order.status.current.toLocaleLowerCase()]]}>
              {order.status.current.replace('_', ' ').toUpperCase()}
            </Text>
          </View>

          {/* Items */}
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.itemContent}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.imageUrl }} style={styles.itemImage} resizeMode="cover" />
                </View>
                <View style={{width:"40%"}}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text numberOfLines={1} style={styles.itemName}>{item.description}</Text>
                </View>
                <View>
                  <Text>
                    Prix unitaire: <Text style={styles.price}>{item.price.toFixed(2)}$</Text>
                  </Text>
                  <Text>
                    Quantité: <Text style={styles.price}>x{item.nbre}</Text>
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {/* Invoice Details */}
          <View style={styles.invoiceContainer}>
            <Text style={styles.invoiceTitle}>Détails de la facture</Text>
            <InvoiceRow icon={<FontAwesome name="list-alt" size={20} color="black" />} label="Subtotal" value={`${order.pricing.subtotal.toFixed(0)}$`} />
            <InvoiceRow
              icon={<MaterialIcons name="delivery-dining" size={20} color="black" />}
              label="Frais de livraison"
              value={`${order.pricing.deliveryFree}$`}
            />
          </View>

          {/* Total */}
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <View style={styles.totalValueContainer}>
              <Entypo name="export" size={24} color="black" />
              <Text style={styles.totalValue}>{order.pricing.net.toFixed(0)}$</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// Helper Component: Invoice Row
const InvoiceRow = ({ icon, label, value }: { icon: JSX.Element; label: string; value: string }) => (
  <View style={styles.invoiceRow}>
    <View style={styles.invoiceLabelContainer}>
      {icon}
      <Text style={styles.invoiceLabel}>{label}</Text>
    </View>
    <View style={styles.invoiceValueContainer}>
      <Entypo name="export" size={20} color="black" />
      <Text style={styles.price}>{value}</Text>
    </View>
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: 'orange',
    gap:50
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    color: 'lightgray',
  },
  map: {
    width: '100%',
    height: '40%',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusLabel: {
    fontWeight: 'bold',
  },
  statusText: {
    marginLeft: 5,
    padding:2
  },
  itemContainer: {
    padding: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap:10
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: 'whitesmoke',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  itemName: {
    fontWeight: '500',
  },
  price: {
    color: 'blue',
    fontWeight: 'bold',
  },
  invoiceContainer: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  invoiceTitle: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 10,
  },
  invoiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  invoiceLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  invoiceLabel: {
    paddingLeft: 5,
    fontSize: 16,
    fontStyle: 'italic',
  },
  invoiceValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff5f5',
    borderRadius: 5,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 19,
  },
  totalValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalValue: {
    color: 'red',
    fontWeight: 'bold',
  },
  error: {
    color: '#dc2626',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },

  pending: {
    backgroundColor: "#fef3c7",
    color: "#d97706",
  },
  assigned: {
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
});


