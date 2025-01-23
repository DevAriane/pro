import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const MyMapComponent = () => {
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  //   useEffect(() => {
  //     const getLocation = async () => {
  //       let { status } = await Location.requestPermissionsAsync();
  //       if (status === 'granted') {
  //         let location = await Location.getCurrentPositionAsync({});
  //         setLocation(location.coords);
  //       }
  //     };
  //     getLocation();
  //   }, []);

  //   if (!location) {
  //     return <View style={styles.container}><Text>Loading...</Text></View>;
  //   }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={location}
        zoomEnabled={true}
      >
        <Marker coordinate={location}
          title={"Marker Title"}
          description={"Marker Description"} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MyMapComponent;
