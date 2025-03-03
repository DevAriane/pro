import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button,FlatList, ActivityIndicator } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useOrders } from '@/contexts/OrderContext';



export default function Comming({ a }) {

  const [loading, setLoading] = useState(false);

  console.log("a", a);

  const Direction = (x) => {
    router.push({
      pathname: "/orders/[orderId]",
      params: { item: JSON.stringify(x) },
    });
  }


  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor='green' style='light' />
      <ScrollView style={styles.containt} showsVerticalScrollIndicator={false}>
       
          {/* {
            a.map((x) => {
              console.log('x.cov :', x);
              return (<>
                <View style={{ backgroundColor: 'white', alignItems: 'center', borderColor: 'transparent', borderWidth: 1, borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: 10 }}>

                  <View style={{ borderWidth: 1, padding: 5, margin: 5, borderColor: 'transparent', width: 50, height: 50, borderRadius:15 }}>
                    <Image source={{ uri: x.items.img }} style={{ width: '100%', height: '100%', borderColor: 'transparent', borderWidth: 1, borderRadius:5 }} resizeMode="cover" />
                  </View>

                  <View>
                    <Text style={{ fontSize: 16, padding: 2 }}>{x.items.name}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}> <Text style={{ color: 'gray', padding: 2 }}>quantité commandée: {x.items.quantity}</Text></View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: 'gray', padding: 2 }}>pix à payer: {`${x.pricing.net.toFixed(2)}`}</Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => { Direction(x) }}>  <Text style={{ color: 'white', borderWidth: 1, borderRadius: 5, backgroundColor: 'green', borderColor: 'transparent', width: 70, padding: 5, textAlign: "center" }}>
                      {loading && (<ActivityIndicator
                        size="small"
                        color="white"
                        style={styles.indicator}
                      />)}
                      Check</Text></TouchableOpacity>
                  </View>

                </View>

              </>)
            })
          } */}

<FlatList
        data={a}
        renderItem={({ item }) => (
          
          <View style={{ backgroundColor: 'white', alignItems: 'center', borderColor: 'transparent', borderWidth: 1, borderRadius: 5, display: 'flex', justifyContent: 'space-around', margin:5,padding:5 }}>

          <View style={{ borderWidth: 1, padding: 5, margin: 5, borderColor: 'transparent', width: 120, height: 100, borderRadius:"50" }}>
            <Image source={{ uri: item.items.img }} style={{ width: '100%', height: '100%', borderColor: 'transparent', borderWidth: 1, borderRadius:25 }} resizeMode="cover" />
          </View>

          <View>
            <Text style={{ fontSize: 16, padding: 2 ,textAlign:"center"}}>{item.items.name}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}> <Text style={{ color: 'gray', padding: 2 }}>quantité commandée: {item.items.quantity}</Text></View>
           
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',width:150 }}>
  <View>
    <Text style={{ color: 'gray', padding: 3, fontWeight: "bold", fontSize: 18 }}>
      ${`${item.pricing.net.toFixed(0)}`}
    </Text>
  </View>

  <TouchableOpacity onPress={() => { Direction(item) }}>
    <Text style={{ color: 'white', borderWidth: 1, borderRadius: 3, backgroundColor: 'green', borderColor: 'transparent', width: 60, padding: 3, textAlign: "center" }}>
      Check
    </Text>
  </TouchableOpacity>
</View>

        </View>
        )}
        keyExtractor={item => item.key}
        numColumns={2}
      />



       
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  area: {
    flex: 1,

  },
  containt: {

    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  indicator: { marginLeft: 10 },
  header: {
    width: '100%',
    position: 'fixed',
    height: 90,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'green',
    color: 'white',
    alignItems: 'center',
  },
  special: {
    height: 150,
    padding: 5,
    margin: 5,
    backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
  },
  day: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
    backgroundColor: 'white',
    padding: 5,
  },
  rest: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: '#f9c2ff',
    alignItems: 'center',
  },


});
