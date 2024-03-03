
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import fetch from 'node-fetch'; 

const ChatPengepul = ({ navigation, route }) => {
  const { jsonData } = route.params;

  useEffect(() => {
    console.log("SKARANG DI LIST CHAT SCREEN ");
    console.log("DATA YANG DIKIRIM DARI Home SCREEN:\n", jsonData);
  }, []);

  const [infoData, setInfoData] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [infoResponse, messageResponse] = await Promise.all([
          fetch('https://www.wastegps.online/fullstack/waste_gps/lapor/log.php'),
          fetch('https://www.wastegps.online/fullstack/waste_gps/message/viewmessage.php')
        ]);

        if (!infoResponse.ok) {
          throw new Error('Gagal mengambil data laporan');
        }

        if (!messageResponse.ok) {
          throw new Error('Gagal mengambil data pesan');
        }

        const infoText = await infoResponse.text();

        console.log('Info Response Text:', infoText);

        const infoData = JSON.parse(infoText);
        setInfoData(infoData);


        const messageText = await messageResponse.text();

        console.log('Message Response Text:', messageText);

        const messageData = JSON.parse(messageText);
        setMessageData(messageData);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleChatButtonPress = (nama, nomor, pesan) => {
    jsonData.namemasyarakat = "" + nama;
    jsonData.nomormsyarakat = "" + nomor;
    jsonData.messageData = "" + pesan;

    navigation.navigate('messagemasyarakat', { jsonData, messageData });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.god}>Chat Masyarakat</Text>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {infoData.map((data, index) => {
        const relatedMessage = messageData.find(
          (message) => message.nomor_pengirim === data.nomor || message.nomor_penerima === data.nomor
        );

        return (
          <View style={styles.card} key={data.id}>
            <Image source={require('../Home/Image/profile.png')} style={styles.profileImage} />
            <Text style={styles.nomor}>No : {index + 1}</Text>
            <Text style={styles.infoText}>{data.nama}</Text>
            <Text style={styles.infoText}>{data.nomor}</Text>
			
            <TouchableOpacity
              style={styles.mapButton}
              onPress={() => handleChatButtonPress(data.nama, data.nomor)}
            >
              <Text style={styles.mapButtonText}>Chat</Text>
            </TouchableOpacity>
			
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3',
  },
  god: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
  card: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    elevation: 20,
    padding: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 7,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mapButton: {
    backgroundColor: '#1abc9c',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  mapButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    margin: 20,
    backgroundColor: '#f9e5e5',
    padding: 10,
    borderRadius: 8,
  },
  nomor: {
    fontWeight: 'bold',
    marginLeft: 9,
    marginTop: 3,
  }
});

export default ChatPengepul;