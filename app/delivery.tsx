import { useOrders } from "@/contexts/OrderContext";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  
  StatusBar,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

function ENC({ delivered }) {
  return (
    <SafeAreaView style={styles.area}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{gap:20, paddingHorizontal:15}}>
        {delivered.map((x) => {
          return (
            <TouchableOpacity style={styles.all}>
              {x.items.map((i) => {
                return (
                  <View style={styles.items}>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 5,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        source={{ uri: i.imageUrl }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 5,
                        }}
                      />
                    </View>
                    <View style={{ flex: 1, margin: 3 }}>
                      <Text style={{ fontWeight: "bold" }}>{i.name}</Text>
                      <Text
                        numberOfLines={3}
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          color: "gray",
                        }}
                      >
                        {i.description}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontWeight: "bold",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        x{i.nbre}
                      </Text>
                     
                    </View>
                  </View>
                );
              })}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
export default ENC;
const styles = StyleSheet.create({
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
    display: "flex",
    justifyContent: "space-between",
    margin: 10,
    backgroundColor: "white",
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 15,
  },
  av: {
    backgroundColor: "white",
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 5,
    display: "flex",
    justifyContent: "space-around",
    margin: 10,
  },
  items: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    margin: 5,
    padding: 5,
    borderRadius: 8,
    borderColor: "transparent",
    borderWidth: 1,
  },
  all: {
    backgroundColor: "lightgray",
    padding: 5,
    borderRadius: 8,
    borderColor: "transparent",
    borderWidth: 1,
  },
});
