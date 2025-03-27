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
  SafeAreaView,
  Pressable,
  StatusBar,
} from "react-native";
import { Link, router } from "expo-router";
import CheckBox from "@react-native-community/checkbox";
import Utilisateur from "./utilisateur";
import Livreur from "./livreur";
import { useEffect, useState } from "react";
import LoadingIndicator from "./loading";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useAuth } from "@/contexts/AuthContext";
function App() {
  const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;
  const { loading } = useAuth();
  const [affiche, setAffiche] = useState(true);
  const [color, setColor] = useState(true);

  useEffect(() => {

    if (affiche === true) {
      setColor(true);
    } else if (affiche === false) {
      setColor(false);
    }
  }, [affiche]);

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor="green" style="light" />
      <View style={styles.containt}>
        <View style={[styles.hidden, { marginTop: statusBarHeight }]}>
          <Pressable onPress={()=>router.push("/option")} style={{marginLeft:10}} >
            {" "}
            <AntDesign name="left" size={24} color="white" />
          </Pressable>
          <View style={{ marginHorizontal: "auto" }}>
            {" "}
            <Text style={{ color: "white", fontSize: 20,fontWeight:"bold" }}>Connexion</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: "2%",
          }}
        >
          <TouchableOpacity   onPress={() => {
                setAffiche(true);
              }}>
          <View
            style={[styles.text, { backgroundColor: color ? "green" : "gray" }]}
          >
            <Text
            
              style={{ textAlign: "center", color: "white", fontWeight:"bold"}}
            >
              Clients
            </Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => {
                setAffiche(false);
              }}>
          <View
            style={[
              styles.text,
              { backgroundColor: !color ? "green" : "gray" },
            ]}
          >
            <Text
             
              style={{ textAlign: "center", color: "white", fontWeight:"bold" }}
            >
              Livreurs
            </Text>
          </View>
          </TouchableOpacity>
        </View>

        {affiche ? <Utilisateur /> : <Livreur />}
      </View>
    </SafeAreaView>
  );
}
export default App;
const styles = StyleSheet.create({
  vert: { backgroundColor: "green" },
  grise: { backgroundColor: "gray" },
  input: {
    backgroundColor: "white",
    fontSize: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    height: 40,
    width: 300,
    padding: 5,
    marginHorizontal: "auto",
    margin: 5,
  },
  vet: {
    justifyContent: "space-around",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  area: {
    flex: 1,
  },
  containt: {
    flex: 1,

    backgroundColor: "whitesmoke",
  },
  vie: {
    marginVertical: "auto",
    marginHorizontal: "auto",
  },
  hidden: {
    width: "100%",
    top: 0,
    position: "fixed",
   // height: 100,
    backgroundColor: "green",
    display: "flex",
    flexDirection: "row",
    color: "white",
    alignItems: "center",
    padding:10,
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
    display:'flex',
    justifyContent:"center",
    alignItems:"center",
  },
  sign: {
    height: 40,
    width: 300,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
    color: "green",
    backgroundColor: "white",
    padding: 5,
    textAlign: "center",
    marginHorizontal: "auto",
    margin: 5,
  },
  ali: {
    height: 40,
    width: 300,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "white",
    padding: 5,
    textAlign: "center",
    marginHorizontal: "auto",
    margin: 5,
    justifyContent: "center",
    marginVertical: 10,
  },
});
