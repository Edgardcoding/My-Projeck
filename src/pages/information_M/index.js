import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InfoPengepul = () => {
  const [infoData, setInfoData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://www.wastegps.online/fullstack/waste_gps/lapor/log2.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gagal mengambil data laporan');
        }
        return response.json();
      })
      .then((data) => {
        setInfoData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleMapButtonPress = (data) => {
    navigation.navigate('Maps1', { locationData: data });
  };

  const filteredInfoData = infoData.filter((data) =>
    data.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.god}>𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚜𝚒</Text>
      </View>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      {filteredInfoData.map((data, index) => (
        <View style={[styles.card, data.diDatangi ? styles.diDatangiCard : null]} key={data.id}>
          <View style={styles.infoContainer}>
            <View style={styles.imageContainer}>

            </View>
            <View style={styles.textContainer}>
              <Text style={styles.Nomor}>Data : {index + 1}</Text>
              <Text style={styles.infoText}>Nama : {data.nama}</Text>
              <Text style={styles.infoText}>Nomor : {data.nomor}</Text>
              <Text style={styles.infoText}>Keterangan : {data.keterangan}</Text>
              <TouchableOpacity
                style={styles.mapButton}
                onPress={() => handleMapButtonPress(data)}
              >
                <Text style={styles.mapButtonText}>Maps</Text>
              </TouchableOpacity>

    <TouchableOpacity style={styles.view} onPress={() => navigation.navigate('TipeSampah')}>
      <Text style={styles.viewbutton}>Tipe Sampah Plastik</Text>
    </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3',
  },
  card: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    elevation: 20,
    padding: 20,
  },
  diDatangiCard: {
    backgroundColor: 'green',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  infoText: {
    fontSize: 15,
    marginVertical: 5,
  },
  mapButton: {
    backgroundColor: '#1abc9c',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  mapButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    margin: 20,
  },
  god: {
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  Nomor: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  view : {
    backgroundColor: '#1abc9c',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  viewbutton : {
    color: 'white',
    textAlign: 'center',
  },
});

export default InfoPengepul;
