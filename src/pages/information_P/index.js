import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InfoMasyarakat = () => {
  const [infoData, setInfoData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://www.wastegps.online/fullstack/waste_gps/lapor/log.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch report data');
        }
        return response.json();
      })
      .then((data) => {
        const infoDataWithSelesai = data.map((item) => ({ ...item, selesai: false }));
        setInfoData(infoDataWithSelesai);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleMapButtonPress = (data) => {
    if (!data.selesai) {
      navigation.navigate('Maps', { locationData: data });
    }
  };

  const handleSelesaiButtonPress = (item) => {

    Alert.alert(
      'Confirmation',
      'Are you sure you want to mark this item as completed?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {

            fetch(`https://www.wastegps.online/fullstack/waste_gps/lapor/log.php?id=${item.id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Failed to delete data');
                }

                const updatedInfoData = infoData.filter((data) => data.id !== item.id);
                setInfoData(updatedInfoData);
              })
              .catch((error) => {
                console.error('Error deleting data:', error);
                setError(error.message);
              });
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.god}>𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚜𝚒</Text>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {infoData.map((data, index) => (
        <View style={[styles.card, data.selesai ? styles.diDatangiCard : null]} key={data.id}>
          <View style={styles.infoContainer}>
            <View style={styles.imageContainer}>
			
            {data.foto_uri ? (
				  <Image source={{ uri: data.foto_uri }} style={styles.image} />
				) : (
				  <Text style={styles.infoText}>Image Not Available</Text>
				)}

            </View>
            <View style={styles.textContainer}>
              <Text style={styles.Nomor}>Data: {index + 1}</Text>
              <Text style={styles.infoText}>Name : {data.nama}</Text>
              <Text style={styles.infoText}>Number : {data.nomor}</Text>
              <Text style={styles.infoText}>Keterangan : {data.keterangan}</Text>
              <TouchableOpacity
                style={styles.mapButton}
                onPress={() => handleMapButtonPress(data)}
                disabled={data.selesai}
              >
                <Text style={styles.mapButtonText}>Maps</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.selesaiButton,
                  { backgroundColor: data.selesai ? 'grey' : '#E74C3C' },
                ]}
                onPress={() => handleSelesaiButtonPress(data)}
              >
                <Text style={styles.selesaiButtonText}>Selesai</Text>
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
    backgroundColor: 'grey',
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
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  selesaiButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  selesaiButtonText: {
    color: 'white',
    textAlign: 'center',
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
});

export default InfoMasyarakat;
