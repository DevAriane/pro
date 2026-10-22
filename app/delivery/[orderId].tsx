// app/delivery/[orderId].tsx
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Button, Alert, Pressable, Image, StatusBar, Platform } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { firestore } from "@/firebase";
import MapView, { Marker } from "react-native-maps";
import { io } from "socket.io-client";
import * as Location from "expo-location";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import Foundation from "@expo/vector-icons/Foundation";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import { useOrders } from "@/contexts/OrderContext";
import { ScrollView } from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Octicons from "@expo/vector-icons/Octicons";

export default function PartnerOrderScreen() {
  const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;

  const { orderId } = useLocalSearchParams();
  const { updateOrder, fetchOrdersDelivery, orders } = useOrders();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [partenerLocation, setPartnerLocation] = useState(null);
  const [time, setTime] = useState(0);
  const [socket, setSocket] = useState(null);

  // Demande de permission de localisation
  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission refusée",
        "L'accès à la position est requis pour le suivi de livraison."
      );
      return false;
    }
    return true;
  };

  // Actions de changement de statut
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
            note: "Commande acceptée par le livreur",
          },
        ],
      },
    };
    await updateOrder(orderId, updates);
  };

  const handlePickUpOrder = async () => {
    const updates = {
      status: {
        current: "PICKEDUP",
        timeline: [
          ...order?.status?.timeline,
          {
            status: "PICKEDUP",
            timestamp: new Date(),
            note: "Commande récupérée",
          },
        ],
      },
    };
    await updateOrder(orderId, updates);
  };

  const handleDeliverOrder = async () => {
    const updates = {
      status: {
        current: "DELIVERED",
        timeline: [
          ...order?.status?.timeline,
          {
            status: "DELIVERED",
            timestamp: new Date(),
            note: "Commande livrée",
          },
        ],
      },
    };
    await updateOrder(orderId, updates);
  };

  // Écoute en temps réel de la commande (Firestore)
  useEffect(() => {
    if (!orderId) return;

    const orderRef = doc(firestore, "orders", orderId);
    const unsubscribe = onSnapshot(
      orderRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setOrder(docSnapshot.data());
          setLoading(false);
        } else {
          setError("Commande introuvable");
          setLoading(false);
        }
      },
      (err) => {
        setError("Échec du chargement de la commande");
        console.error("Erreur Firestore:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [orderId]);

  // Connexion WebSocket pour le suivi
  useEffect(() => {
    if (!orderId || !user) return;

    const newSocket = io(process.env.EXPO_PUBLIC_SOCKET_SERVER_URL, {
      auth: {
        token: user.accessToken,
        userId: user.uid,
      },
    });

    newSocket.on("connect", () => {
      console.log("Connecté au serveur de suivi");
      newSocket.emit("join_order", orderId);
    });

    newSocket.on("location_update", (data) => {
      setPartnerLocation(data.coordinates);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [orderId, user]);

  // Calcul de la distance (Haversine)
  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const toRad = (angle) => (angle * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
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

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Commande introuvable</Text>
      </View>
    );
  }

  const isAssignedPartner = order.deliveryPartnerId === user?.uid;
  const isActiveOrder = ["ASSIGNED", "PICKEDUP"].includes(order.status.current);
  const orderStatus = order.status.current.toLowerCase();

  const renderStatus = () => {
    switch (order.status.current.replace("_", " ").toUpperCase()) {
      case "PENDING": return "En attente";
      case "ASSIGNED": return "Livreur Assigné";
      case "PICKEDUP": return "En cours de livraison";
      case "DELIVERED": return "Livré";
      default: return "Accepté";
    }
  };

  const goBack = () => {
    fetchOrdersDelivery();
    router.push("/livreuurProfil");
    fetchOrdersDelivery();
  };

  const limitOrders = () => {
    if (!user) return;
    const activePickedUpOrders = orders.filter(
      (o) => o.status.current === "PICKEDUP" && o.deliveryPartnerId === user.uid
    );

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
      <View style={{ flex: 1, backgroundColor: "whitesmoke" }}>
        <View style={[styles.header, { paddingTop: statusBarHeight }]}>
          <Pressable style={{ margin: 12 }} onPress={() => goBack()}>
            <AntDesign name="leftcircleo" size={24} color="white" />
          </Pressable>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 14, color: "white" }}>
              Informations de la réservation
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
              Livraison dans {time < 1 ? "moins d'une minute" : `${time.toFixed(0)} minutes`}
            </Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {order?.delivery?.address?.coordinates && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: order.delivery.address.coordinates.latitude,
                longitude: order.delivery.address.coordinates.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: order.delivery.address.coordinates.latitude,
                  longitude: order.delivery.address.coordinates.longitude,
                }}
                title="Adresse de livraison"
                pinColor="red"
              />
              {partenerLocation && (
                <Marker
                  coordinate={partenerLocation}
                  title="Ma Position (Livreur)"
                  pinColor="blue"
                />
              )}
            </MapView>
          )}

          <View style={styles.content}>
            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>Statut courant:</Text>
              <Text style={[styles.statusText, styles[orderStatus]]}>
                {renderStatus()}
              </Text>
            </View>

            {/* Adresse & Contact */}
            <View style={styles.del}>
              <View style={styles.rowCentered}>
                <View style={styles.circleIconBg}>
                  <Feather name="map-pin" size={24} color="black" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text>Adresse de livraison</Text>
                  <Text style={{ fontSize: 14, color: "gray" }}>
                    {order.delivery.address.city}, {order.delivery.address.state}, {order.delivery.address.street}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.del}>
              <View style={styles.rowCentered}>
                <View style={styles.circleIconBg}>
                  <Foundation name="telephone" size={24} color="black" />
                </View>
                <View>
                  <Text>
                    Téléphone : <Text style={{ color: "red", fontWeight: "bold" }}>{order.phone}</Text>
                  </Text>
                  <Text style={{ fontSize: 14, color: "gray" }}>Contact du client</Text>
                </View>
              </View>
            </View>

            {/* Articles de la commande */}
            <View style={styles.view}>
              <View style={styles.icon}>
                <SimpleLineIcons name="bag" size={24} color="black" />
              </View>
              <View>
                <Text style={{ fontWeight: "bold" }}>Récapitulatif de la réservation</Text>
                <Text style={{ fontWeight: "bold", fontSize: 10, color: "gray" }}>
                  *#{orderId}
                </Text>
              </View>
            </View>

            {order?.items?.map((x, index) => (
              <View style={styles.view} key={index}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: x.imageUrl }} style={styles.itemImage} resizeMode="cover" />
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text>{x.name}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {x.montant?.toFixed(0) || 0} FCFA
                  </Text>
                  <Text style={{ color: "gray" }}>Qté: {x.nbre}</Text>
                </View>
              </View>
            ))}

            {/* Facture */}
            <View style={styles.vie}>
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Détails de la facture</Text>
              <View style={styles.invoiceRow}>
                <Text><Octicons name="list-unordered" size={16} color="black" /> Sous-total</Text>
                <Text>{order.pricing.subtotal.toFixed(0)} FCFA</Text>
              </View>
              <View style={styles.invoiceRow}>
                <Text><MaterialIcons name="delivery-dining" size={16} color="black" /> Frais de livraison</Text>
                <Text>2000 FCFA</Text>
              </View>
            </View>

            <View style={[styles.view, { marginBottom: 80 }]}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>Grand total</Text>
              <Text style={{ fontWeight: "bold", fontSize: 16, color: "red" }}>
                {order.pricing.net.toFixed(0)} FCFA
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Boutons d'action du livreur */}
        <View style={styles.bouton}>
          {!isAssignedPartner && order.status.current === "PENDING" && (
            <Button title="Accepter la réservation" onPress={() => limitOrders()} color="green" />
          )}

          {isAssignedPartner && (
            <>
              {order.status.current === "ASSIGNED" && (
                <Button title="Commande récupérée" onPress={() => handlePickUpOrder()} color="#10b981" />
              )}

              {order.status.current === "PICKEDUP" && (
                <Button title="Commande livrée" onPress={() => handleDeliverOrder()} color="#10b981" />
              )}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "green",
  },
  map: { width: "100%", height: 250 },
  content: { flex: 1, padding: 8 },
  statusContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10, paddingHorizontal: 8 },
  statusLabel: { fontSize: 16, color: "#6b7280", marginRight: 8 },
  statusText: { fontSize: 16, fontWeight: "600", paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8 },
  pending: { backgroundColor: "#fef3c7", color: "#d97706" },
  assigned: { backgroundColor: "#bfdbfe", color: "#1d4ed8" },
  pickedup: { backgroundColor: "#c7d2fe", color: "#4f46e5" },
  delivered: { backgroundColor: "#dcfce7", color: "#16a34a" },
  error: { color: "#dc2626", fontSize: 16, textAlign: "center", marginTop: 20 },
  imageContainer: { width: 50, height: 50, borderRadius: 25, overflow: "hidden", backgroundColor: "whitesmoke" },
  itemImage: { width: "100%", height: "100%" },
  circleIconBg: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "whitesmoke",
    height: 45,
    width: 45,
    marginRight: 10,
  },
  del: {
    backgroundColor: "white",
    marginVertical: 4,
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  rowCentered: { flexDirection: "row", alignItems: "center" },
  bouton: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    elevation: 5,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "whitesmoke",
    marginRight: 10,
  },
  view: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  vie: {
    padding: 12,
    backgroundColor: "white",
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  invoiceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
});