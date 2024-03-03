import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';

const HomePengepul = ({ navigation, route }) => {

    const { jsonData } = route.params;
        
    useEffect(() => {
        console.log("DATA YANG DIKIRIM DARI LOGIN SCREEN:\n", jsonData);
      }, []);

  const handleButtonPress = () => {
    Alert.alert(
      'Confirm Dialog',
      'Are you sure you want to exit?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            console.log('Keluar Dilanjutkan dari HomeScreen.');
            navigation.navigate('SignIn');
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
 
      <View style={styles.header}>
      <Text style={styles.headerText}>✧ 𝕎𝕖𝕝𝕝𝕔𝕠𝕞𝕖 𝕋𝕠 𝕎𝕒𝕤𝕥𝕖𝕘𝕡𝕤 ✧</Text>
  
  <TouchableOpacity onPress={handleButtonPress}>
    <Image
      source={require('../Home/Image/logout.png')}
      style={styles.exitImage}
    />
  </TouchableOpacity>
</View>

<View style={styles.userProfile}>
        <View style={styles.userProfileLeft}>
        <Image
      source={require('../Home/Image/profile.png')}
      style={styles.userProfileImage}
    />
          <View>
            <Text style={styles.userProfileFullName}>{jsonData.nama}</Text>
            <Text style={styles.userProfileText}>{jsonData.alamat}</Text>
            <Text style={styles.userProfileText}>{jsonData.no_handphone}</Text>
          </View>
        </View>

      </View>

        <View style={styles.content}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Lapor2', {jsonData})}>
          <Image source={require('../Home/Image/laporan.png')} style={styles.menuItemImage} />
          <Text style={styles.menuItemText}>𝙱𝚞𝚊𝚝 𝙸𝚗𝚏𝚘</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Maps')}>
          <Image source={require('../Home/Image/maps.png')} style={styles.menuItemImage} />
          <Text style={styles.menuItemText}>𝙻𝚘𝚔𝚊𝚜𝚒</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('information_P')}>
          <Image source={require('../Home/Image/informasi.png')} style={styles.menuItemImage} />
          <Text style={styles.menuItemText}>𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚜𝚒</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Chat', {jsonData})}>
          <Image source={require('../Home/Image/no4.png')} style={styles.menuItemImage} />
          <Text style={styles.menuItemText}>𝙿𝚎𝚜𝚊𝚗</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile', {jsonData})}>
          <Image source={require('../Home/Image/tes.png')} style={styles.menuItemImage} />
          <Text style={styles.menuItemText}>𝙿𝚛𝚘𝚏𝚒𝚕𝚎</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ChangePassword', {jsonData})}>
          <Image source={require('../Home/Image/Change.png')} style={styles.menuItemImage} />
          <Text style={styles.menuItemText}>𝙿𝚊𝚜𝚜𝚠𝚘𝚛𝚍</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('About')}>
          <Image source={require('../Home/Image/about.jpg')} style={styles.menuItemImage} />
          <Text style={styles.menuItemText}>𝙰𝚋𝚘𝚞𝚝</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>𝟚𝟘𝟚𝟛 © 𝕎𝕒𝕤𝕥𝕖𝔾ℙ𝕊</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3',
  },
  header: {
    backgroundColor: '#00008B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 90,
    marginBottom: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerText: {
    color: 'gold',
    fontSize: 19,
    fontWeight: 'bold',
  },
  userProfile: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 30,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    top: 60,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 20,
  },
  userProfileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userProfileText: {
    color: '#05375a',
    marginLeft: 10,
    fontSize: 14,
  },
  userProfileEmail: {
    color: '#05375a',
    marginLeft: 10,
    fontSize: 11,
  },
  userProfileFullName: {
    color: '#05375a',
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  userProfileRight: {
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 70,
  },
  menuItem: {
    width: '30%',
    height: 120,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItemImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  menuItemText: {
    color: '#05375a',
    marginTop: 10,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '5%',
    backgroundColor: '#00008B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  userProfileImage: {
    width: 60,
    height: 60,
    left: 0,
    right: 0,
    borderRadius: 50,
  },
  exitImage: {
    width: 37,
    height: 37,
    margin: 7, 
  },
  
});
export default HomePengepul;
