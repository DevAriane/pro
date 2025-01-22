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

function Order() {
    // récupération des props envoyés
    //  const params = useLocalSearchParams();
     
      const {orders}=useOrders();
console.log('orders rese', orders);

    const [activeTab, setActiveTab] = useState('Comming');
   
    // const filteredOrders = orders.filter(order => order.status === 'PENDING');
    // console.log('filteredOrders',filteredOrders);

    return (
        <SafeAreaView style={styles.area}>
            <StatusBar backgroundColor='green' style='light' />
            <View style={styles.containt}>
                <View style={styles.hidden}>
                    <Link href='/(tabs)'>
                        <AntDesign name="left" size={24} color="white" />
                    </Link>
                    <View>
                        <Text style={{ marginLeft: 120, color: 'white', fontSize: 24 }}>Orders</Text>
                    </View>
                </View>
                <View style={styles.tabContainer}>
                    <TouchableOpacity onPress={() => setActiveTab('Comming')} style={[styles.tabButton, activeTab === 'Comming' && styles.activeTab]}>
                        <Text style={styles.tabText}>Coming</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveTab('History')} style={[styles.tabButton, activeTab === 'History' && styles.activeTab]}>
                        <Text style={styles.tabText}>History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveTab('Cancelled')} style={[styles.tabButton, activeTab === 'Cancelled' && styles.activeTab]}>
                        <Text style={styles.tabText}>Cancelled</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveTab('Draft')} style={[styles.tabButton, activeTab === 'Draft' && styles.activeTab]}>
                        <Text style={styles.tabText}>Draft</Text>
                    </TouchableOpacity>
                </View>
                {activeTab === 'Comming' && <Comming a={[orders]} />} 
                {activeTab === 'History' && <History />}
                {activeTab === 'Cancelled' && <Cancelled />}
                {activeTab === 'Draft' && <Draft />}
            </View>
        </SafeAreaView>
    );
}

export default Order;

const styles = StyleSheet.create({
    area: {
        flex: 1,
    },
    containt: {
        flex: 1,
        backgroundColor: 'whitesmoke',
    },
    hidden: {
        width:'100%',
        top: 0,
        position: 'fixed',
        height: 120,
        backgroundColor: 'green',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: '8%',
    },
    tabButton: {
        padding: 10,
        borderRadius: 5,
        color:'white',
    },
    activeTab: {
        color:'white',
        backgroundColor: 'green',
        
    },
    tabText: {
        color: 'gray',
        fontWeight: '500',
    },
});
