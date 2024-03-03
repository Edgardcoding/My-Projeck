import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

const Profile = ({ route }) => {
  const { jsonData } = route.params;

  useEffect(() => {
    console.log('DATA YANG DIKIRIM DARI Home Screen:\n', jsonData);
  }, []);

  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '' + jsonData.nama,
    phoneNumber: '' + jsonData.no_handphone,
    address: '' + jsonData.alamat,
    email: '' + jsonData.email,
    role: '' + jsonData.role,
  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
  };

  const handleChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.labelHeaderProfile}>𝙼𝚢-𝙿𝚛𝚘𝚏</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Nama :</Text>
        {editing ? (
          <TextInput
            style={styles.valueInput}
            value={profileData.name}
            onChangeText={(text) => handleChange('name', text)}
          />
        ) : (
          <Text style={styles.value}>{profileData.name}</Text>
        )}
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>No_handphone :</Text>
        {editing ? (
          <TextInput
            style={styles.valueInput}
            value={profileData.phoneNumber}
            onChangeText={(text) => handleChange('phoneNumber', text)}
          />
        ) : (
          <Text style={styles.value}>{profileData.phoneNumber}</Text>
        )}
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Alamat :</Text>
        {editing ? (
          <TextInput
            style={styles.valueInput}
            value={profileData.address}
            onChangeText={(text) => handleChange('address', text)}
          />
        ) : (
          <Text style={styles.value}>{profileData.address}</Text>
        )}
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Email :</Text>
        {editing ? (
          <TextInput
            style={styles.valueInput}
            value={profileData.email}
            onChangeText={(text) => handleChange('email', text)}
          />
        ) : (
          <Text style={styles.value}>{profileData.email}</Text>
        )}
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Role :</Text>
        {editing ? (
          <TextInput
            style={styles.valueInput}
            value={profileData.role}
            onChangeText={(text) => handleChange('role', text)}
          />
        ) : (
          <Text style={styles.value}>{profileData.role}</Text>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2196F3',
  },
  profileInfo: {
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  labelHeaderProfile: {
    color: 'gold',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 50,

  },
  value: {
    color: 'black',
    fontSize: 16,
  },
  valueInput: {
    color: 'black',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
  },
  button: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: "row",
    height: 45,
    paddingHorizontal: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    backgroundColor: '#00008B',
  },
  title: {
    marginTop: 10,
    flexDirection: "row",
    height: 45,
    fontSize: 25,
    color: 'white',
  }

}); export default Profile;