import { Image, StyleSheet, Platform, Text, SafeAreaView, TouchableOpacity, View, TextInput, ScrollView, Button } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import Foundation from '@expo/vector-icons/Foundation';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

function DetailDelivery() {
    const {user}=useAuth();
    const params = useLocalSearchParams();
      const item = params.item ? JSON.parse(params.item) : null;
      console.log('item detail delivery :',item);
      const {createdAt,id,items,payement,pricing,restaurantId,userId,status,phone,aff}=item;
      const {itemId,name,price,quantity}=items;
      const {deliveryFree,net,subtotal,tax}=pricing;

      console.log('aff',aff);
    return (<>
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: 'whitesmoke' }}>

                <View style={{ position: 'fixed', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', height: 100, backgroundColor: 'green' }}>
                    <AntDesign name="left" size={24} color="black" />
                    <View>
                        <Text style={{ textAlign: 'center', color: 'black' }}>Start this order</Text>
                        <Text style={{ color: 'black', fontSize: 20, marginLeft: 50, fontWeight: 500 }}>Delivery in 10 minutes</Text>
                    </View>

                </View>
                <ScrollView>
                  <View style={{marginVertical:'30%'}}>
                    <View style={{ width: '95%', height: '18%', margin: 8, borderWidth: 1, borderColor: 'transparent', borderRadius: 5, backgroundColor: 'white', opacity: 1, marginHorizontal: 'auto'}}></View>
                    <View style={styles.del}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'transparent', borderRadius: '50%', backgroundColor: 'whitesmoke', height: 50, width: 50, margin: 5 }}>
                                <MaterialIcons name="delivery-dining" size={24} color="black" /></View>
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>Your delivery details</Text>
                                <Text style={{ fontSize: 14, color: 'gray' }}>Details of your current order</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.del}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'transparent', borderRadius: '50%', backgroundColor: 'whitesmoke', height: 50, width: 50, margin: 5 }}>
                                <Feather name="map-pin" size={24} color="black" /></View>
                            <View>
                                <Text>Delivery at Home</Text>
                                <Text style={{ fontSize: 14, color: 'gray' }}>645A/864.janki Vhar colory , jankpuram</Text>
                                <Text style={{ fontSize: 14, color: 'gray' }}>LUCKnow. Uttar Pradesh 226021, India</Text>
                            </View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 5 }}><View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'transparent', borderRadius: '50%', backgroundColor: 'whitesmoke', height: 50, width: 50, margin: 5 }}><Foundation name="telephone" size={24} color="black" /></View >
                            <View>  <Text>Rtix Prassad {phone}</Text>
                                <Text style={{ fontSize: 14, color: 'gray' }}>Receiver's contact no.</Text></View></View>
                    </View>

                    <View style={styles.del}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'transparent', borderRadius: '50%', backgroundColor: 'whitesmoke', height: 50, width: 50, margin: 5 }}>
                                <Ionicons name="bag-handle-outline" size={24} color="black" /></View>
                            <View>  <Text style={{ fontWeight: 500 }}>Order Summary</Text>
                                <Text style={{ fontSize: 14, color: 'gray' }}>Order ID.{id}</Text></View> </View>
                    </View>
                    <View style={styles.del}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent:'space-around' }}><View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'transparent', borderRadius: '50%', backgroundColor: 'whitesmoke', height: 50, width: 50, margin: 5 }}>
                            {/* <Image source={require('../../assets/images/milk.png')} /> */}
                        </View>
                        <View>
                                <Text style={{ fontWeight: 500 }}>{name}</Text>
                                <Text style={{ fontSize: 14, color: 'gray' }}>{status}</Text>
                            </View>
                            <View>
                                <Text>Prix unitaire: {price}</Text>
                                <Text>Quantité: {quantity}</Text>
                            </View>
                            </View>
                    </View>
                    <View style={{ borderWidth: 1, borderRadius: 5, borderColor: 'transparent', backgroundColor: 'white', margin: 10, padding: 5 }}>
                        <View><Text style={{ padding: 5, fontWeight: 500 }}>Bill Details</Text></View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}><FontAwesome name="list-alt" size={24} color="black" /><Text style={{ padding: 5 }}>items total</Text></View>
                            <View style={{ marginLeft: 160, display: 'flex', flexDirection: 'row', alignItems: 'center' }}><Entypo name="export" size={24} color="black" /><Text>{subtotal}</Text></View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><MaterialIcons name="delivery-dining" size={24} color="black" /> <Text style={{ padding: 5 }}>Delivery charge</Text></View>
                            <View style={{ marginLeft: 130, display: 'flex', flexDirection: 'row', alignItems: 'center' }}><Entypo name="export" size={24} color="black" /><Text>{deliveryFree}</Text></View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><FontAwesome name="list-alt" size={24} color="black" /> <Text style={{ padding: 5 }}>Handing charge</Text></View>
                            <View style={{ marginLeft: 125, display: 'flex', flexDirection: 'row', alignItems: 'center' }}><Entypo name="export" size={24} color="black" /><Text>{quantity}</Text></View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><Ionicons name="rainy-sharp" size={24} color="black" /> <Text style={{ padding: 5 }}>Surge charge</Text></View>
                            <View style={{ marginLeft: 140, display: 'flex', flexDirection: 'row', alignItems: 'center' }}><Entypo name="export" size={24} color="black" /><Text>{tax}</Text></View>
                        </View>
                    </View>
                    <View style={styles.del}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                            <View><Text style={{ fontWeight: 500, padding: 5 }}>Grand Total</Text></View>
                            <View style={{ marginLeft: 140, display: 'flex', flexDirection: 'row', alignItems: 'center' }}><Entypo name="export" size={24} color="black" /><Text>{net}</Text></View>
                        </View>
                    </View>
                    <View style={styles.dele}>
                        <View style={{ backgroundColor: 'green', borderWidth: 1, borderColor: 'transparent', borderRadius: 6, height: 60, margin: 4 }}>
                        <TouchableOpacity >   <Text style={{ color: 'white', textAlign: 'center', margin: 4, fontWeight: 600, }}>Accept Order</Text></TouchableOpacity> 
                        </View>
                    </View>
                    </View>  
                </ScrollView>
            </View>
        </SafeAreaView>
    </>)
}
export default DetailDelivery;
const styles = StyleSheet.create({
    del: {
        backgroundColor: 'white',
        margin: 5,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 5,

    },
    dele: {
        backgroundColor: 'white',
        margin: 5,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 5,
        bottom: 0,
    },
})