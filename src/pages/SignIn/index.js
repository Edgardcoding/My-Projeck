import React, { useState } from "react";
import { View, Alert, Text, StyleSheet, Image, Button, ScrollView, TouchableOpacity } from "react-native";
import { ILogo } from "../../assets/icons";
import { Input } from "../../components/atoms";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (!email.trim() && !password.trim()) {
      Alert.alert('Error Message', 'Input email and password fields cannot be empty or contain only spaces.');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Error Message', 'Input email field cannot be empty or contain only spaces.');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Error Message', 'Input password field cannot be empty or contain only spaces.');
      return;
    }

    const requestBody = {
      'email': email,
      'password': password
    };

    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Request timed out'));
      }, 10000);
    });

    Promise.race([
      fetch('https://www.wastegps.online/fullstack/waste_gps/login/handle_login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: Object.keys(requestBody).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(requestBody[key])}`).join('&')
      }),
      timeoutPromise
    ])
      .then(response => response.text())
      .then(textData => {
        console.log(textData);

        if (textData.includes("ERROR")) {
          Alert.alert('Error Message', 'Sorry, login failed. Please try again.');
          return;
        }

        if (textData.includes("SUCCESS LOGIN")) {
          Alert.alert('Login Success', 'Welcome to WasteGPS apps');
          const dataArray = textData.split("SUCCESS LOGIN");
          const jsonString = dataArray[1];
          const jsonData = JSON.parse(jsonString);

          if (jsonData.role === "masyarakat") {
            navigation.navigate('Home', { jsonData });
          } else if (jsonData.role === "pengepul") {
            navigation.navigate('Home1', { jsonData });
          } else {
            Alert.alert('Error Message', 'Invalid user role');
          }
        }
      })
      .catch(error => {
        Alert.alert('Error Message', error.message);
        return;
      });
  };

  const handleForgotPassword = () => {
  };

  return (
    <ScrollView style={style.container}>
      <View style={style.wrapper}>
        <Image source={ILogo} style={style.logo} />
        <Text style={style.name}>𝚂𝚒𝚐𝚗 𝙸𝚗 𝚆𝚊𝚜𝚝𝚎𝙶𝚙𝚜 𝙽𝚘𝚠!</Text>
      </View>

      <View style={style.dk}>
      <Input
        label="Email"
        placeholder="Masukan email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={{ marginBottom: 25 }} />
      <Input
        label="Password"
        placeholder="Masukan password"
        password
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      </View>

      {/* <TouchableOpacity onPress={() => {
            navigation.navigate('ChangePassword');
          }}>
        <Text style={style.forgotPassword}>Forgot password</Text>
      </TouchableOpacity> */}
      
      <View style={{ marginBottom: 40 }} />
      <Button title="SIGN IN" onPress={handleSignIn} />
      <View style={style.textBottom}>
        <Text style={style.text1}>Haven't an account ?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text style={style.text2}>Sign Up here</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#00008B',
    display: 'flex',
    alignContent: 'center',
  },
  wrapper: {
    marginTop: 55,
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    height: 85,
    width: 99,
    marginTop: 20,
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF8DC',
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: '500',
    color: 'red',
    marginBottom: 10,
    marginTop: 20,
  },
  textBottom: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    color: '#8C8787',
    marginBottom: 10,
  },
  text2: {
    color: 'yellow',
    marginLeft: 5,
    marginBottom: 10,
  },
});

export default SignIn;