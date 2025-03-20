import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AntDesign from '@expo/vector-icons/AntDesign';
import { firestore } from '@/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import Comming from '../comming';
import History from '../history';
import Cancelled from '../cancelled';
import Draft from '../draft';
import { useOrders } from '@/contexts/OrderContext';

function App() {
    // récupération des props envoyés
        const params = useLocalSearchParams();
      const {orders,loading}=useOrders();
console.log('orders reservation 12345:',orders.Comming);

    const [activeTab, setActiveTab] = useState('Comming');
   
    return (
        <SafeAreaView style={styles.area}>
            <StatusBar backgroundColor='green' style='light' />
            <View style={styles.containt}>
                <View style={styles.hidden}>
                    <Link href='/(tabs)' style={{margin:15}}>
                        <AntDesign name="left" size={24} color="white" />
                    </Link>
                    <View>
                        <Text style={{ marginLeft: 90, color: 'white', fontSize: 24 }}>Orders</Text>
                    </View>
                </View>
                <View style={styles.tabContainer}>
                <TouchableOpacity
  onPress={() => setActiveTab('Comming')}
  style={[styles.tabButton, activeTab === 'Comming' && styles.activeTab]}>
  <Text style={[styles.tabText, activeTab === 'Comming' && styles.activeTabText]}>Coming</Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={() => setActiveTab('History')}
  style={[styles.tabButton, activeTab === 'History' && styles.activeTab]}>
  <Text style={[styles.tabText, activeTab === 'History' && styles.activeTabText]}>History</Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={() => setActiveTab('Cancelled')}
  style={[styles.tabButton, activeTab === 'Cancelled' && styles.activeTab]}>
  <Text style={[styles.tabText, activeTab === 'Cancelled' && styles.activeTabText]}>Cancelled</Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={() => setActiveTab('Draft')}
  style={[styles.tabButton, activeTab === 'Draft' && styles.activeTab]}>
  <Text style={[styles.tabText, activeTab === 'Draft' && styles.activeTabText]}>Draft</Text>
</TouchableOpacity>
             </View>
             
                {activeTab === 'Comming' && <Comming a={orders.Comming} />} 
                {activeTab === 'History' && <History b={orders.Delivered} />}
                {activeTab === 'Cancelled' && <Cancelled c={orders.Cancelled} />}
                {activeTab === 'Draft' && <Draft />}
              
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
        backgroundColor: 'whitesmoke',
    },
    hidden: {
        width: '100%',
        top: 0,
        position: 'fixed',
        height: 100,
        backgroundColor: 'green',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
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
});
