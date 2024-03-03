import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';

const LaporPengepul = ({ navigation, route }) => {

  const { jsonData } = route.params;

  useEffect(() => {
    console.log("SKARANG DI SCREEN Lapor ");
    console.log("DATA YANG DIKIRIM DARI Home SCREEN:\n", jsonData);
  }, []);

  const [nama, setNama] = useState(jsonData.nama);
  const [nomor, setNomor] = useState(jsonData.no_handphone);
  const [lokasi, setLokasi] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );
  }, []);

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('Pengguna membatalkan pemilihan gambar');
      } else if (response.errorMessage) {
        console.log('Error:', response.errorMessage);
      } else {
        setFoto(response.assets[0]);
      }
    });
  };

  const submitLaporan = () => {
    if (!nama || !nomor || !lokasi || !keterangan) {
      Alert.alert('Peringatan', 'Semua data harus diisi.');
      return;
    }

    const dataLaporan = {
      nama,
      nomor,
      lokasi,
      keterangan,
    };

    fetch('https://www.wastegps.online/fullstack/waste_gps/lapor/log2.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataLaporan),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Data berhasil dikirim.');
          setNama('');
          setNomor('');
          setLokasi('');
          setKeterangan('');
        } else {
          console.error('Gagal mengirim data. Kode status: ' + response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      
      navigation.navigate('Lapor2', { jsonData });
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>𝙱𝚞𝚊𝚝 𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚜𝚒</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nama:</Text>
          <TextInput
            style={styles.textInput}
            value={nama}
            onChangeText={setNama}
            placeholder="Masukkan Nama"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nomor:</Text>
          <TextInput
            style={styles.textInput}
            value={nomor}
            onChangeText={setNomor}
            placeholder="Masukkan Nomor"
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (currentLocation) {
              setLokasi(`Lat: ${currentLocation.latitude}, Long: ${currentLocation.longitude}`);
            }
          }}
        >
          <Text style={styles.buttonText}>Ambil Lokasi</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Lokasi/Alamat:</Text>
          <TextInput
            style={styles.textInput}
            value={lokasi}
            onChangeText={setLokasi}
            placeholder="Masukkan Lokasi/Alamat"
          />
        </View>

        <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('TipeSampah')}>
      <Text style={styles.mapButtonText}>Lihat Tipe Sampah Plastik</Text>
    </TouchableOpacity>
          <Text style={styles.inputLabel}>Keterangan:</Text>
          <TextInput
            style={styles.textInput}
            value={keterangan}
            onChangeText={setKeterangan}
            placeholder="Masukkan Keterangan"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={submitLaporan}>
          <Text style={styles.buttonText}>Submit Laporan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginTop: 15,
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  button: {
    padding: 15,
    backgroundColor: '#1abc9c',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#1abc9c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  mapButtonText: {
    backgroundColor: '#1abc9c',
    padding: 1,
    borderRadius: 5,
    alignItems: 'center',
    color: '#FFF',
    fontSize: 18,
  },
});

export default LaporPengepul;




// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   SafeAreaView,
//   StyleSheet,
//   Alert,
//   FlatList,
// } from 'react-native';
// import { launchCamera } from 'react-native-image-picker';
// import Geolocation from '@react-native-community/geolocation';

// const LaporPengepul = ({ navigation, route }) => {
//   const { jsonData } = route.params;

//   useEffect(() => {
//     console.log("SKARANG DI SCREEN Lapor ");
//     console.log("DATA YANG DIKIRIM DARI Home SCREEN:\n", jsonData);
//   }, []);

//   const [nama, setNama] = useState(jsonData.nama);
//   const [nomor, setNomor] = useState(jsonData.no_handphone);
//   const [lokasi, setLokasi] = useState('');
//   const [foto, setFoto] = useState('');
//   const [keterangan, setKeterangan] = useState('');
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [selectedDataType, setSelectedDataType] = useState('');

//   const dataTypes = [
//     { id: 'type1', label: 'Type 1' },
//     { id: 'type2', label: 'Type 2' },
//     { id: 'type3', label: 'Type 3' },
//     { id: 'type4', label: 'Type 4' },
//     { id: 'type5', label: 'Type 5' },
//     // Add more data types as needed
//   ];

//   const renderDataTypeButton = ({ item }) => (
//     <TouchableOpacity
//       style={[
//         styles.dataTypeList,
//         { backgroundColor: selectedDataType === item.id ? '#3498db' : '#1abc9c'},
//       ]}
//       onPress={() => setSelectedDataType(item.id)}
//     >
//       <Text style={styles.dataTypeList}>{item.label}</Text>
//     </TouchableOpacity>
//   );

//   useEffect(() => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setCurrentLocation({ latitude, longitude });
//       },
//       (error) => {
//         console.error('Error getting current location:', error);
//       }
//     );
//   }, []);

//   // const openCamera = () => {
//   //   const options = {
//   //     mediaType: 'photo',
//   //     quality: 1,
//   //   };

//   //   launchCamera(options, (response) => {
//   //     if (response.didCancel) {
//   //       console.log('Pengguna membatalkan pemilihan gambar');
//   //     } else if (response.errorMessage) {
//   //       console.log('Error:', response.errorMessage);
//   //     } else {
//   //       setFoto(response.assets[0]);
//   //     }
//   //   });
//   // };

//   const submitLaporan = () => {
//     if (!nama || !nomor || !lokasi || !foto || !keterangan || !selectedDataType) {
//       Alert.alert('Peringatan', 'Semua data harus diisi.');
//       return;
//     }

//     const dataLaporan = {
//       nama,
//       nomor,
//       lokasi,
//       foto,
//       keterangan,
//       selectedDataType,
//     };

//     fetch('https://www.wastegps.online/fullstack/waste_gps/lapor/log2.php', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(dataLaporan),
//     })
//       .then((response) => {
//         if (response.status === 200) {
//           console.log('Data berhasil dikirim.');
//           setNama('');
//           setNomor('');
//           setLokasi('');
//           setFoto('');
//           setKeterangan('');
//           setSelectedDataType('');
//         } else {
//           console.error('Gagal mengirim data. Kode status: ' + response.status);
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });

//     navigation.navigate('Lapor2', { jsonData });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.contentContainer}>
//         <Text style={styles.header}>𝙱𝚞𝚊𝚝 𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚜𝚒</Text>
//         <View style={styles.inputContainer}>
//           <Text style={styles.inputLabel}>Nama:</Text>
//           <TextInput
//             style={styles.textInput}
//             value={nama}
//             onChangeText={setNama}
//             placeholder="Masukkan Nama"
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <Text style={styles.inputLabel}>Nomor:</Text>
//           <TextInput
//             style={styles.textInput}
//             value={nomor}
//             onChangeText={setNomor}
//             placeholder="Masukkan Nomor"
//           />
//         </View>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             if (currentLocation) {
//               setLokasi(`Lat: ${currentLocation.latitude}, Long: ${currentLocation.longitude}`);
//             }
//           }}
//         >
//           <Text style={styles.buttonText}>Ambil Lokasi</Text>
//         </TouchableOpacity>
//         <View style={styles.inputContainer}>
//           <Text style={styles.inputLabel}>Lokasi/Alamat:</Text>
//           <TextInput
//             style={styles.textInput}
//             value={lokasi}
//             onChangeText={setLokasi}
//             placeholder="Masukkan Lokasi/Alamat"
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <Text style={styles.inputLabel}>Keterangan:</Text>
//           <TextInput
//             style={styles.textInput}
//             value={keterangan}
//             onChangeText={setKeterangan}
//             placeholder="Masukkan Keterangan"
//           />
//         </View>
//         <FlatList
//           data={dataTypes}
//           renderItem={renderDataTypeButton}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.dataTypeList}
//         />
//         {/* <TouchableOpacity style={styles.button} onPress={openCamera}>
//           <Text style={styles.buttonText}>Ambil Gambar</Text>
//         </TouchableOpacity> */}

//         {foto && (
//           <View style={styles.imageContainer}>
//             <Image source={{ uri: foto.uri }} style={styles.image} />
//           </View>
//         )}

//         <TouchableOpacity style={styles.submitButton} onPress={submitLaporan}>
//           <Text style={styles.buttonText}>Submit Laporan</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   contentContainer: {
//     padding: 20,
//   },
//   header: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#333',
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   inputLabel: {
//     fontSize: 16,
//     color: '#333',
//   },
//   textInput: {
//     height: 40,
//     borderColor: '#ccc',
//     borderBottomWidth: 1,
//     paddingHorizontal: 10,
//   },
//   button: {
//     padding: 15,
//     backgroundColor: '#1abc9c',
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 18,
//   },
//   imageContainer: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     resizeMode: 'cover',
//     borderRadius: 10,
//   },
//   submitButton: {
//     backgroundColor: '#1abc9c',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   dataTypeList: {
//     marginBottom : 10,
//     color: '#FFF',
//     fontSize: 18,
//     padding: 4,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
// });

// export default LaporPengepul;
