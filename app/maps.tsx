import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const Map = () => {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    // Demande la permission d'accéder à la géolocalisation
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission refusée pour accéder à la localisation.');
        return;
      }

      // Obtient la position actuelle
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  if (!region) {
    return null; // Attendre que la région soit disponible
  }

  return (
    <View style={styles.container}>
      {/* <MapView style={styles.map} region={region}   mapType="satellite">
        <Marker coordinate={region} title="Vous êtes ici" />
      </MapView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Map;
