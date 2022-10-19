import React, { useEffect } from "react";
import * as Location from "expo-location";

import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          longitude: route.params.location.coords.longitude,
          latitude: route.params.location.coords.latitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{
            longitude: route.params.location.coords.longitude,
            latitude: route.params.location.coords.latitude,
          }}
          title={route.params.title}
        ></Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  text: {
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto-Regular",
  },
});

export default MapScreen;
