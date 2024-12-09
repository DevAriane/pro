

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AntDesign from '@expo/vector-icons/AntDesign';
import Comming from '../comming';
import History from '../history';
import Cancelled from '../cancelled';
import Draft from '../draft';

function App() {
    const [activeTab, setActiveTab] = useState('Comming');

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
                {activeTab === 'Comming' && <Comming />}
                {activeTab === 'History' && <History />}
                {activeTab === 'Cancelled' && <Cancelled />}
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
        marginVertical: 20,
    },
    tabButton: {
        padding: 10,
        borderRadius: 5,
        color:'white',
    },
    activeTab: {
        backgroundColor: 'green',
        color:'white',
    },
    tabText: {
        color: 'gray',
        fontWeight: '500',
    },
});
