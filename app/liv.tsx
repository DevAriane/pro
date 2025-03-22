import {
  Image,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";
import Octicons from "@expo/vector-icons/Octicons";
import { StatusBar } from "expo-status-bar";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "@/contexts/AuthContext";
function App() {
  const { logout,user } = useAuth();
console.log("user profile ar",user);
  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.containt}>
        <View
          style={{
            position: "fixed",
            width: "100%",
            height: 80,
            backgroundColor: "green",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              textAlign: "center",
              marginHorizontal: "auto",
              fontWeight:'bold'
            }}
          >
            Mon compte
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "transparent",
                backgroundColor: "white",
                margin: 10,
                padding: 5,
              }}
            >
             <View
  style={{
    borderWidth: 1,
    borderRadius: 50, // Utiliser une valeur en pixels
    borderColor: "transparent",
    width: 100,
    height: 100,
    overflow: "hidden", // Assurez-vous que le contenu ne dépasse pas les bordures arrondies
  }}
>
  <Image
    source={require('../assets/images/delivery.png')}
    style={{
      width: "100%",
      height: "100%",
      resizeMode: 'cover', // L'image remplira le conteneur en couvrant toute la surface
    }}
  />
</View>

              <View>
                <Text style={{ padding: 5, textAlign: "center" }}>
                  {user.name}
                </Text>
              </View>
              <View>
                <Text style={{ color: "gray", padding: 5, textAlign: "center" }}>
                  {user.email}
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                alignContent: "flex-start",
                justifyContent: "flex-start",
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "transparent",
                backgroundColor: "white",
                margin: 10,
                padding: 5,
              }}
            >
              <View>
                <Text style={{ padding: 5, fontWeight: 500 }}>Mon compte</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Octicons name="person-add" size={24} color="black" />
                <Text style={{ padding: 5, margin: 2 }}>
                  Informations personnelles
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
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
                  <MaterialIcons name="language" size={15} color="black" />
                  <Text style={{ padding: 5, margin: 2 }}>Langue</Text>
                </View>
                <View>
                  <Text style={{ color: "gray", marginLeft: 150 }}>
                    Francais (FRA)
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <AntDesign name="find" size={15} color="black" />
                <Text style={{ padding: 5, margin: 2 }}>Politique Privée</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <SimpleLineIcons name="settings" size={15} color="black" />
                <Text style={{ padding: 5, margin: 2 }}>Réglages</Text>
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
                  Notifications
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
                    justifyContent: 'space-between',
                    width:"100%"
                  }}
                >
                 <View style={{display: "flex",
                    flexDirection: "row",
                    alignItems: "center", justifyContent: 'flex-start',}}> <Fontisto name="bell" size={15} color="black" />
                  <Text style={{ padding: 5 }}>Envoie de notications</Text></View>
                  <View>
                  <Feather name="toggle-right" size={24} color="green" />
                </View>
                </View>
               
              </View>
              <View
                style={{
                  display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: 'space-between',
                    width:"100%"
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: 'flex-start',
                  }}
                >
                  <Fontisto name="bell" size={15} color="black" />
                  <Text style={{ padding: 5 }}>Notifications promotionelles </Text>
                </View>
                <View >
                  <Feather name="toggle-left" size={24} color="gray" />
                </View>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                alignContent: "flex-start",
                justifyContent: "flex-start",
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "transparent",
                backgroundColor: "white",
                margin: 10,
                padding: 5,
              }}
            >
              <View>
                <Text style={{ padding: 5, fontWeight: 500 }}>Plus</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Entypo name="info-with-circle" size={15} color="black" />
                <Text style={{ padding: 5 }}>Aide</Text>
              </View>
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
                onPress={() => {
                 logout();
                }}
              >
                <Entypo name="log-out" size={15} color="red" />
                <Text style={{ padding: 5, color: "red",fontWeight:'bold' }}>Déconnexion</Text>
              </TouchableOpacity>
            </View>
          
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
export default App;
const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  containt: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "whitesmoke",
  },
});
