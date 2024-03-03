import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const Password = ({ navigation, route }) => {
  const { jsonData } = route.params;
  useEffect(() => {
    console.log("DATA YANG DIKIRIM DARI LOGIN SCREEN:\n", jsonData);
  }, []);

  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setOldPass('');
      setNewPass('');
      setConfirmNewPass('');
    }, [])
  );

  const handleChangePassword = () => {
    if (!oldPass.trim() || !newPass.trim() || !confirmNewPass.trim()) {
      Alert.alert(
        'Error Message',
        'Input fields cannot be empty or contain only spaces.'
      );
      return;
    }

    if (newPass !== confirmNewPass) {
      Alert.alert(
        'Error Message',
        'New password and confirm password must match.'
      );
      return;
    }

    const requestBody = {
      'email': jsonData.email,
      'oldPass': oldPass,
      'newPass': newPass,
    };

    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Request timed out.'));
      }, 5000);
    });

    Promise.race([
      fetch('https://www.wastegps.online/fullstack/waste_gps/changepassword/changepassword.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: Object.keys(requestBody)
          .map(
            key =>
              `${encodeURIComponent(key)}=${encodeURIComponent(
                requestBody[key]
              )}`
          )
          .join('&'),
      }),
      timeoutPromise,
    ])
      .then(response => response.text())
      .then(textData => {
        console.log(textData);

        if (textData.includes('ERROR')) {
          Alert.alert(
            'Error Message',
            'Sorry, change password failed. Please try again.'
          );
          return;
        }

        if (textData.includes('INCORRECT')) {
          Alert.alert(
            'Error Message',
            'Sorry, you put an incorrect old password. Please try again.'
          );
          return;
        }

        if (textData.includes('SUCCESS')) {
          Alert.alert(
            'Success',
            'Password berhasil diubah. Mohon login dengan password baru anda.'
          );
          navigation.navigate('SignIn');
        }
      })
      .catch(error => {
        Alert.alert('Error Message', error.message);
        return;
      });
  };

  const backToProfile = (email) => {
    jsonData.email = "" + email;
    navigation.navigate('SignIn', { jsonData });
  };

  return (
    <View style={style.container}>
      <View style={style.content}>
        <Text style={style.title}>𝙲𝚑𝚊𝚗𝚐𝚎 𝙿𝚊𝚜𝚜𝚠𝚘𝚛𝚍</Text>
        <TextInput
          style={style.input}
          placeholder="Password Lama"
          placeholderTextColor="#666666"
          value={oldPass}
          onChangeText={setOldPass}
        />
        <TextInput
          style={style.input}
          placeholder="Password Baru"
          placeholderTextColor="#666666"
          value={newPass}
          onChangeText={setNewPass}
        />
        <TextInput
          style={style.input}
          placeholder="Konfirmasi Password Baru"
          placeholderTextColor="#666666"
          value={confirmNewPass}
          onChangeText={setConfirmNewPass}
        />
        <TouchableOpacity style={style.button} onPress={handleChangePassword}>
          <Text style={style.buttonText}>𝚄𝚋𝚊𝚑 𝙿𝚊𝚜𝚜𝚠𝚘𝚛𝚍</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3',
  },
  backButton: {
    width: 30,
    height: 30,
    marginTop: 20,
    marginLeft: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  input: {
    width: '80%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    marginBottom: 20,
    fontSize: 16,
    color: 'white',
  },
  button: {
    width: '50%',
    backgroundColor: '#1abc9c',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Password;
