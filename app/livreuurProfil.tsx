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
import { io } from "socket.io-client";
import * as Location from "expo-location";
import Available from "./available";
import Delivery from "./delivery";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrderContext";
import ENC from "./encours";


function LivreurProfil() {
  const socket = io("http://192.168.1.148:5000"); // Replace with your server URL

  const { orders} =useOrders();
  const { user } = useAuth();

 const [activeTab, setActiveTab] = useState('Available');

 console.log('orders.encours liv:',orders.Encours);
 console.log('orders.delivered liv:',orders.Delivered);
const trackDriverLocation = async () => {
  console.log('yo location');
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return;

  await Location.watchPositionAsync(
    { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
    (location) => {
      socket.emit('location_update', {partnerId:user.uid,  location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
     
      });
    }
  );
};
 

  const orderId = "ORDER_123"; // Get from props/state
  const partnerId = "PARTNER_456"; // Get from auth


  useEffect(() => {
    trackDriverLocation();
  }, []);

  // useEffect(() => {
  //   let watchId;

  //   const startTracking = async () => {
  //     const hasPermission = await Location.requestForegroundPermissionsAsync();
  //     if (!hasPermission) return;

  //     watchId = await Location.watchPositionAsync(
  //       {
  //         accuracy: Location.Accuracy.High,
  //         distanceInterval: 100, // Meters
  //         timeInterval: 10000, // Milliseconds
  //       },
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         socket.emit("location_update", {
  //           orderId,
  //           partnerId,
  //           location: { latitude, longitude },
  //         });
  //       }
  //     );
  //   };

  //   startTracking();

  //   return () => {
  //     if (watchId) Location.removeWatch(watchId);
  //   };
  // }, [partnerId]); // Add dependencies

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.containt}>
        <View style={styles.header}>
          <View
            style={{
              borderRadius: "50%",
              borderWidth: 1,
              borderColor: "transparent",
            }}
          >
            <Link href='/liv'>
            <Image
              source={require("../assets/images/telecharge.jpeg")}
              style={{
                width: 50,
                height: 50,
                borderWidth: 1,
                borderColor: "transparent",
                borderRadius: 30,
              }}
            /></Link>
          </View>
          <View>
            <Text style={{ color: "white", fontSize: 20 }}>Hello {user.nom} !</Text>
            <Text style={{ color: "white", fontSize: 16 }}>
              {user.email}
            </Text>
          </View>
          <AntDesign name="right" size={24} color="white" />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}> 
        
                        <View style={styles.tabContainer}>
                          <TouchableOpacity
            onPress={() => setActiveTab('Available')}
            style={[styles.tabButton, activeTab === 'Available' && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === 'Available' && styles.activeTabText]}>Disponible</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setActiveTab('Encours')}
            style={[styles.tabButton, activeTab === 'Encours' && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === 'Encours' && styles.activeTabText]}>Encours</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setActiveTab('Delivered')}
            style={[styles.tabButton, activeTab === 'Delivered' && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === 'Delivered' && styles.activeTabText]}>Livré</Text>
          </TouchableOpacity>
          
                          </View>
                {activeTab === 'Available' && <Available reservationVenant={orders.Comming}/>} 
                {activeTab === 'Encours' && <ENC encours={orders.Encours} />}
                {activeTab === 'Delivered' && <Delivery delivered={orders.Delivered}/>}
             

        </ScrollView>
               </View>
    </SafeAreaView>
  );
}
export default LivreurProfil;
const styles = StyleSheet.create({
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: '4%',
    color: 'white',
},
tabButton: {
    padding: 10,
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
},
activeTab: {
    backgroundColor: 'green', // Fond blanc pour l'onglet actif
},
activeTabText: {
    color: 'white', // Couleur du texte vert lorsque l'onglet est actif
},
tabText: {
    color: 'gray',
    fontWeight: 'bold',
},
  area: {
    flex: 1,
  },
  containt: {
    flex: 1,
    justifyContent: "space-between",
    borderRadius: 50,
    // borderWidth:1,
    // borderColor:'transparent',
    backgroundColor: "whitesmoke",
  },
  header: {
    width: "100%",
    position: "fixed",
    height: 120,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "green",
    color: "white",
    alignItems: "center",
  },
  vie: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  c: {
    margin: 5,
    backgroundColor: "white",
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 15,
  },
  text: {
    height: 40,
    width: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
    color: "white",
    backgroundColor: "green",
    padding: 5,
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: "auto",
    margin: 5,
  },
});
