
// app/partner/orders/[orderId].js
import { useEffect, useState, useCallback } from "react";
import {View,Text,ActivityIndicator,StyleSheet,Button,Alert,Pressable,Image,StatusBar,Platform,} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { firestore } from "@/firebase";
import MapView, { Marker } from "react-native-maps";
import { io } from "socket.io-client";
import * as Location from "expo-location";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import Foundation from "@expo/vector-icons/Foundation";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import { useOrders } from "@/contexts/OrderContext";
import { ScrollView } from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Link } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
import { getCurrentAddress } from "@/utils/location";
// firebase.js
// ...
import { getFirestore, updateDoc } from 'firebase/firestore'; // Added missing imports
// ...

export default function PartnerOrderScreen() {
  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight : 0;

  const { orderId } = useLocalSearchParams();
  const { updateOrder, fetchOrdersDelivery } = useOrders();
  const { orders } = useOrders();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [partenerLocation, setPartnerLocation] = useState(null);
  const [time, setTime] = useState(0);
  const [socket, setSocket] = useState(null);
  const { fetchOrdersPickeUp } = useOrders();
  // Request location permissions
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
    if (!(await requestLocationPermission())) return;

    const updates = {
      deliveryPartnerId: user.uid,
      status: {
        current: "ASSIGNED",
        timeline: [
          ...order?.status?.timeline,
          {
            status: "ASSIGNED",
            timestamp: new Date(),
            note: "Order accepted",
          },
        ],
      },
    };
    await updateOrder(orderId, updates);
  };

  const handlePickUpOrder = async () => {
    console.log("bonjour pickedup");
    const updates = {
      status: {
        current: "PICKEDUP",
        timeline: [
          ...order?.status?.timeline,
          {
            status: "PICKEDUP",
            timestamp: new Date(),
            note: "Driver picked up order",
          },
        ],
      },
    };
    console.log("updates.status.current", updates.status.current);
    await updateOrder(orderId, updates);
  };
  const handleDeliverOrder = async () => {
    console.log("bonjour delivery");
    const updates = {
      deliveryPartnerId: user.uid,
      status: {
        current: "DELIVERED",
        timeline: [
          ...order?.status?.timeline,
          {
            status: "DELIVERED",
            timestamp: new Date(),
            note: "Driver picked up order",
          },
        ],
      },
    };
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
// Code CORRIGÉ (à appliquer) :
useEffect(() => {
  // ✅ Utiliser l'instance firestore().collection().doc() du SDK Natif
  // Dans app/delivery/[orderId].tsx (Ligne 126)
// const orderRef = firestore.collection("orders").doc(orderId); // Retirer les parenthèses '()'
  // Ancien code (invalide pour le SDK Web v9) :
// const orderRef = firestore.collection("orders").doc(orderId); // Retirer les parenthèses '()'
  
// ✅ NOUVEAU CODE CORRECT :
const orderRef = doc(firestore, "orders", orderId);
  
// ✅ Utiliser .onSnapshot() comme fonction
const unsubscribe = onSnapshot( 
  orderRef, // Passer la référence créée par doc()
  (docSnapshot) => { 
    if (docSnapshot.exists()) { // Correction : la méthode est exists()
      setOrder(docSnapshot.data());
      setLoading(false);
    } else {
// ... reste inchangé
  // ✅ Utiliser .onSnapshot() comme méthode de la référence du document
  const unsubscribe = orderRef.onSnapshot( 
    (docSnapshot) => { // Utilisez docSnapshot car 'doc' est souvent réservé à la fonction doc()
      if (docSnapshot.exists) {
        setOrder(docSnapshot.data());
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
  return unsubscribe;
}, [orderId]);

  useEffect(() => {
    if (!orderId || !user) return;

    const newSocket = io(process.env.EXPO_PUBLIC_SOCKET_SERVER_URL, {
      auth: {
        token: user.accessToken,
        userId: user.uid,
      },
    });

    newSocket.on("connect", () => {
      console.log("Connected to tracking server");
      newSocket.emit("join_order", orderId);
    });

    newSocket.on("location_update", (data) => {
      console.log("Location update:", data);
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
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }


  useEffect(() => {
    if (!order || !partenerLocation) return;
    let latitude1 = order.delivery.address.coordinates.latitude;
    let longitude1 = order.delivery.address.coordinates.longitude;
    let latitude2 = partenerLocation.latitude;
    let longitude2 = partenerLocation.longitude;
    let distance = haversineDistance(latitude1, longitude1, latitude2, longitude2);
    setTime((distance / 60) * 60);
  }, [partenerLocation, order]);


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

  if (!orderId) {
    console.error("Order ID is undefined");
    return <Text>Order ID is missing</Text>;
  }
  
  if (!user) {
    console.error("User is undefined");
    return <Text>User is not logged in</Text>;
  }

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

  const renderStatus = () => {
    switch (order.status.current.replace("_", " ").toUpperCase()) {
      case "PENDING":
        return "En attente";
        break;
      case "ASSIGNED":
        return "Livreur Assigné";
        break;
      case "PICKEDUP":
        return "En cours de livraison";
        break;
      case "DELIVERED":
        return "Livré";
        break;
      default:
        return "Accepté";
        break;
    }
  };

  const goBack = () => {
    fetchOrdersDelivery();
    router.push("/livreuurProfil");
    fetchOrdersDelivery();
  };

  const limitOrders = () => {
    if (!user) return;
    
    // ✅ CORRECTION : Utiliser le tableau 'orders' et filtrer les commandes 'PICKEDUP' assignées à l'utilisateur actuel
    const activePickedUpOrders = orders.filter(
        (o) => o.status.current === "PICKEDUP" && o.deliveryPartnerId === user.uid
    );
    
    console.log("activePickedUpOrders.length", activePickedUpOrders.length);

    if (activePickedUpOrders.length > 0) {
      Alert.alert(
        "Limite atteinte",
        "Vous avez déjà une commande en cours de livraison. Veuillez la compléter avant d'en accepter une nouvelle."
      );
      router.push("/livreuurProfil");
      return;
    } else {
      handleAcceptOrder();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="green" style="light" />
      <View
        style={{
          flex: 1,

          // justifyContent: "space-between",
          backgroundColor: "whitesmoke",
        }}
      >
        <View
          style={{
            paddingTop: statusBarHeight,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "green",
          }}
        >
          <Pressable
            style={{ margin: 12 }}
            onPress={() => {
              goBack();
            }}
          >
            {" "}
            <AntDesign name="leftcircleo" size={24} color="white" />
          </Pressable>
          <View>
  <Text style={{ fontWeight: "bold", fontSize: 14, color: "white" }}>
    Informations de la réservation
  </Text>
  <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
    Livraison effectuée dans {time < 1 ? "moins d'une minute" : `${time.toFixed(0)} minutes`}
  </Text>
</View>

        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {order?.delivery?.address?.coordinates && (
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
              {order && (
                <Marker
                  coordinate={{
                    latitude: order?.delivery.address.coordinates.latitude,
                    longitude: order?.delivery.address.coordinates.longitude,
                  }}
                  title="Delivery Address"
                  pinColor="red"
                />
              )}

              {/* Partner Marker */}
              {partenerLocation && (
                <Marker
                  coordinate={partenerLocation}
                  title="Partener Location"
                  pinColor="blue"
                />
              )}
            </MapView>
          )}

          <View style={styles.content}>
            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}> Status courant:</Text>
              <Text style={[styles.statusText, styles[orderStatus]]}>
                {renderStatus()}
              </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
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
                      Vos détails de livraison
                    </Text>
                    <Text style={{ fontSize: 14, color: "gray" }}>
                      Détails de la réservation en cours
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
                  <View style={{ overflow: "scroll" }}>
                    <Text>Adresse de livraison</Text>

                    <Text
                      style={{
                        fontSize: 14,
                        color: "gray",
                        overflow: "scroll",
                      }}
                    >
                      {order.delivery.address.city} ,{" "}
                      {order.delivery.address.state} ,
                      {order.delivery.address.street}
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
                    <Text>
                      Numéro de téléphone{" "}
                      <Text style={{ color: "red", fontWeight: "bold" }}>
                        {order.phone}{" "}
                      </Text>{" "}
                    </Text>
                    <Text style={{ fontSize: 14, color: "gray" }}>
                      Contact du client
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ marginBottom: 20 }}></View>

              <View style={styles.view}>
                <View style={styles.icon}>
                  <SimpleLineIcons name="bag" size={24} color="black" />
                </View>
                <View>
                  <Text style={{ fontWeight: "bold" }}>
                    Récapitulatif de la résevation
                  </Text>
                  <Text
                    style={{ fontWeight: "bold", fontSize: 10 }}
                    numberOfLines={2}
                  >
                    Identifiant de la réservation{" "}
                    <Text style={{ fontWeight: "bold", color: "gray" }}>
                      *#{orderId}
                    </Text>{" "}
                  </Text>
                </View>
              </View>

              {order?.items?.map((x) => {
                return (
                  <View style={styles.view}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: x.imageUrl }}
                        style={styles.itemImage}
                        resizeMode="cover"
                      />
                    </View>
                    <View>
                      <Text>{x.name}</Text>
                    </View>
                    <View>
                      <Text style={{ fontWeight: "bold" }}>
                        {x.montant.toFixed(0)}{" "}
                        <Text style={{ fontSize: 14 }}>FCFA</Text>
                      </Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {x.nbre} <Text style={{ fontSize: 14 }}>FCFA</Text>
                      </Text>
                    </View>
                  </View>
                );
              })}

              <View style={styles.vie}>
                <View>
                  <Text style={{ fontWeight: "bold" }}>
                    Détails de la facture
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Octicons name="list-unordered" size={18} color="black" />{" "}
                    <Text> Total des réservations</Text>
                  </View>
                  <Text>
                    {order.pricing.subtotal.toFixed(0)}{" "}
                    <Text style={{ fontSize: 14 }}>FCFA</Text>
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <MaterialIcons
                      name="delivery-dining"
                      size={18}
                      color="black"
                    />{" "}
                    <Text>Frais de livraison</Text>
                  </View>
                  <Text>
                    2000 <Text style={{ fontSize: 14 }}>FCFA</Text>
                  </Text>
                </View>
              </View>

              <View style={[styles.view,{marginBottom: 50}]}>
                <Text style={{ fontWeight: "bold" }}>Grand total</Text>
                <Text style={{ fontWeight: "bold" }}>
                  {order.pricing.net.toFixed(0)}{" "}
                  <Text style={{ fontSize: 14 }}>FCFA</Text>
                </Text>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
        <View style={styles.bouton}>
          {!isAssignedPartner && order.status.current === "PENDING" && (
            <Button
              title="Accepter la réservation"
              onPress={() => limitOrders()}
              color="green"
            />
          )}

          {isAssignedPartner && (
            <>
              {order.status.current === "ASSIGNED" && (
                <Button
                  title="Commande récupérée"
                  onPress={() => {
                    handlePickUpOrder();
                  }}
                  color="#10b981"
                />
              )}

              {order.status.current === "PICKEDUP" && (
                <Button
                  title="commande livrée"
                  onPress={() => {
                    handleDeliverOrder();
                  }}
                  color="#10b981"
                />
              )}
            </>
          )}

          {isActiveOrder && !order?.partnerLocation && (
            <Text style={styles.warning}>
              Le suivi de localisation est requis pour la livraison de la commande.
            </Text>
          )}
        </View>
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
    height: 300,
  },
  content: {
    flex: 1,
    padding: 5,
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
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "whitesmoke",
  },
  itemImage: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },

  del: {
    backgroundColor: "white",
    marginTop: 2,
    marginLeft: 8,
    marginRight: 8,
    borderWidth: 1,
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderTopColor: "transparent",
    borderBottomColor: "gray",
    borderRadius: 8,
  },

  bouton: {
    position: "absolute",
    bottom: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
  },

  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    borderRadius: "100%",
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "whitesmoke",
  },
  view: {
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: 2,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 8,
    flex: 1,
    
  },
  vie: {
    padding: 10,
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "center",
    backgroundColor: "white",
    marginTop: 2,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 8,
    flex: 1,
  },
});
