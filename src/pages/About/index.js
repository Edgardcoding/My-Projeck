import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import backgroundImage from "../Home/Image/beground.png";

const AboutUs = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={backgroundImage} style={styles.backgroundImage} />
      
      <View style={styles.header}>
      <Text></Text>
      </View>
      
      <Text style={styles.title}>Tentang Kami !</Text>
      <Text style={styles.description}>
      Aplikasi Wastegps: Solusi Inovatif untuk Bisnis Jual Beli Sampah Plastik
      Selamat datang di Aplikasi Kami! Aplikasi Wastegps adalah sebuah inovasi yang muncul sebagai jawaban atas sejumlah tantangan dalam bisnis jual beli sampah plastik yang telah lama ada.
      Bisnis jual beli sampah plastik adalah salah satu sektor terpenting dalam upaya pelestarian lingkungan dan daur ulang bahan baku.
      Namun, selama bertahun-tahun, bisnis ini telah menghadapi sejumlah masalah, seperti logistik yang tidak efisien, pengelolaan sumber daya yang kurang optimal, dan kesulitan dalam menghubungkan pengepul dengan masyarakat.
      </Text>
      <Text style={styles.description}>
      Mengatasi Tantangan Logistik dengan Monitoring Geolokasi
      Salah satu tantangan utama dalam bisnis jual beli sampah plastik adalah logistik yang kompleks. 
      Pengepul harus merencanakan rute pengambilan sampah plastik dari berbagai lokasi, dan ini sering kali menghasilkan pemborosan waktu dan sumber daya. 
      Wastegps hadir untuk mengatasi masalah ini dengan memberikan kemampuan monitoring geolokasi yang akurat.
      Dengan aplikasi ini, pengepul dapat melihat di mana saja di wilayah tertentu ada sampah plastik yang bisa diambil, sehingga mereka dapat merencanakan rute pengambilan yang lebih efisien.
      Hal ini tidak hanya mengurangi pemborosan waktu, tetapi juga membantu dalam pengelolaan inventaris dan peningkatan efisiensi operasional secara keseluruhan.
      </Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}>𝟚𝟘𝟚𝟛 © 𝖂𝖆𝖘𝖙𝖊𝕲𝖕𝖘</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  backgroundImage: {
    position: "absolute",
    width: "125%",
    height: "114%",
    zIndex: -1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '7%',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AboutUs;