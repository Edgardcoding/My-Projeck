import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Button, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const MapScreen = () => {
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [mapReady, setMapReady] = useState(false);
  const [locations, setLocations] = useState([]);
  const [locationError, setLocationError] = useState(null);
  const [destination, setDestination] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchUserLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const newUserLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocation(newUserLocation);

          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude: newUserLocation.latitude,
              longitude: newUserLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }
        }
      );
    };

    const fetchLocationData = () => {
      axios.get('https://www.wastegps.online/fullstack/waste_gps/lapor/lokasi.php')
        .then((response) => {
          if (response.status === 200) {
            const dataWithBR = response.data;
            const lines = dataWithBR.split("<br>");
            const fetchedLocations = [];

            for (let i = 0; i < lines.length; i += 2) {
              if (lines[i] && lines[i + 1]) {
                const latitude = parseFloat(lines[i].replace('Latitude: Lat: ', ''));
                const longitude = parseFloat(lines[i + 1].replace('Longitude: Long: ', ''));

                if (!isNaN(latitude) && !isNaN(longitude)) {
                  fetchedLocations.push({ latitude, longitude });
                }
              }
            }

            if (fetchedLocations.length > 0) {
              setLocations(fetchedLocations);
            } else {
              console.error('No valid location data found in the response:', response.data);
            }
          } else {
            console.error('Error fetching data. Status code:', response.status);
          }
        })
        .catch((error) => {
          console.error('Error fetching data from the API:', error);
        });
    };

    fetchUserLocation();
    fetchLocationData();
  }, []);

  const onMapReady = () => {
    setMapReady(true);
  };

  const viewAllLocations = () => {
    if (mapRef.current && locations.length > 0) {
      const coordinates = locations.map(location => location);
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100},
        animated: true,
      });
    }
  };

  const onMarkerPress = (location) => {
    setDestination(location);

    if (location) {
      setUserLocation(location);
    }
  };

  const updateUserLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const newUserLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserLocation(newUserLocation);

        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude: newUserLocation.latitude,
            longitude: newUserLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        onMapReady={onMapReady}
      >
        {mapReady && (
          <Marker
            coordinate={userLocation}
            title="User Location"
            description="This is the user's location."
            pinColor="blue"
          />
        )}

        {locations && locations.length > 0 && locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={location}
            title={`Location ${index + 1}`}
            description="Description of the location"
            pinColor="red"
            onPress={() => onMarkerPress(location)}
          />
        ))}

        {destination && (
          <Marker
            coordinate={destination}
            title="Tujuan Rute"
            description="Deskripsi tujuan rute"
            pinColor="green"
          />
        )}
      </MapView>
      {locationError && (
        <Text style={styles.errorText}>{locationError}</Text>
      )}
      {locations.length === 0 && !mapReady && !locationError && (
        <ActivityIndicator style={styles.loader} />
      )}

      <View style={styles.Button}>
      <Button title="Zoom Locations" onPress={viewAllLocations} />
      <Button title="Update Location" onPress={updateUserLocation} />
      </View>

      <Text style={styles.locationText}>
        Latitude: {userLocation.latitude.toFixed(6)}
      </Text>
      <Text style={styles.locationText}>
        Longitude: {userLocation.longitude.toFixed(6)}
      </Text>
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
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  locationText: {
    textAlign: 'center',
    fontSize: 16,
  },
  Button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

export default MapScreen;