import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TipeSampah = () => {
  useState([]);
  useState(null);
  useState('');
  useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.god}>Tipe Sampah & Harga Jual</Text>
      </View>

      <View style={styles.backgroundColor}>
      <View style={styles.imageTextContainer}>
         <Image
            source={require('../Home/Image/botolbening.png')}
            style={styles.image}
        />
      </View>
      <Text style={styles.imageText}>Tipe 1 = Botol Bening</Text>
      </View>

      <View style={styles.backgroundColor}>
      <View style={styles.imageTextContainer}>
         <Image
            source={require('../Home/Image/gelasplastik.jpg')}
            style={styles.image}
          />
      </View>
      <Text style={styles.imageText}>Tipe 2 = Gelas Plastik</Text>
      </View>

      <View style={styles.backgroundColor}>
      <View style={styles.imageTextContainer}>
         <Image
            source={require('../Home/Image/botolberwarna.jpg')}
            style={styles.image}
          />
      </View>
      <Text style={styles.imageText}>Tipe 3 = Botol Berwarna</Text>
      </View>

      <View style={styles.backgroundColor}>
      <View style={styles.imageTextContainer}>
         <Image
            source={require('../Home/Image/botololi.jpg')}
            style={styles.image}
          />
      </View>
      <Text style={styles.imageText}>Tipe 4 = Botol Oli</Text>
      </View>

      <View style={styles.backgroundColor}>
      <View style={styles.imageTextContainer}>
         <Image
            source={require('../Home/Image/potbunga.jpg')}
            style={styles.image}
          />
      </View>
      <Text style={styles.imageText}>Tipe 5 = Pot Bunga</Text>
      </View>
      
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
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '150%',
    height: '150%',
  },
  god: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'gold',
    textAlign: 'center',
    marginTop: 10,
  },
  imageTextContainer: {
    margin: 25,
    width: 100,
    height: 100,
  },
  imageText: {
    padding: 25,
    fontSize: 17,
    marginVertical: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'black',
  },
  backgroundColor : {
    marginTop: 35,
    backgroundColor : 'white',
    borderRadius: 25,
    margin: 20,
  }
});

export default TipeSampah;

