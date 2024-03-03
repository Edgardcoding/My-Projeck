import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Button, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Input } from "../../components/atoms";

const SignUp = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');

    const handleRegistration = async () => {

        if (fullName === '' || phone === '' || address === '' || email === '' || password === '' || userType === '') {
            Alert.alert("Error", "Harap di isi semua kolom input.");
            return;
        }

        const registrationData = {
            fullName,
            phone,
            address,
            email,
            password,
            userType,
        };

        try {
            const response = await fetch('https://www.wastegps.online/fullstack/waste_gps/regis/data_regis.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            if (response.ok) {
                console.log('Registration successful');

                setFullName('');
                setPhone('');
                setAddress('');
                setEmail('');
                setPassword('');
                setUserType('');
            } else {
                console.log('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.form}>
                    <Input label="Full Name" placeholder="Enter fullname" value={fullName} onChangeText={text => setFullName(text)} />
                    <View style={{ height: 10 }} />
                    <Input label="Phone" placeholder="Enter phone" value={phone} onChangeText={text => setPhone(text)} />
                    <View style={{ height: 10 }} />
                    <Input label="Alamat" placeholder="Enter Alamat" value={address} onChangeText={text => setAddress(text)} />
                    <View style={{ height: 10 }} />
                    <Input label="Email" placeholder="Enter email" value={email} onChangeText={text => setEmail(text)} />
                    <View style={{ height:10 }} />
                    <Input label="Password" placeholder="Enter password" password value={password} onChangeText={text => setPassword(text)} />
                    <View style={{ height: 10 }} />
                    <Text style={styles.userTypeLabel}>Select User Type:</Text>
                    <TouchableOpacity
                        style={userType === 'pengepul' ? styles.selectedUserTypeButton : styles.userTypeButton}
                        onPress={() => setUserType('pengepul')}
                    >
                        <Text style={styles.userTypeButtonText}>Pengepul</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={userType === 'masyarakat' ? styles.selectedUserTypeButton : styles.userTypeButton}
                        onPress={() => setUserType('masyarakat')}
                    >
                        <Text style={styles.userTypeButtonText}>Masyarakat</Text>
                    </TouchableOpacity>
                    <View style={{ marginBottom: 30 }} />
                    <Button title="Create an account" onPress={handleRegistration} />
                    <View style={styles.textBottom}>
                        <Text style={styles.text1}>Have an account ?</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('SignIn');
                            }}>
                            <Text style={styles.text2}>Sign In here</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00008B',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
        flex: 1,
    },
    form: {
        paddingHorizontal: 25,
        flex: 1,
        paddingVertical: 25,
    },
    textBottom: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text1: {
        color: '#8C8787',
    },
    text2: {
        color: 'yellow',
        marginLeft: 5
    },
    userTypeLabel: {
        marginTop: 10,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    userTypeButton: {
        backgroundColor: 'grey',
        padding: 10,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    selectedUserTypeButton: {
        backgroundColor: 'green',
        padding: 10,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    userTypeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default SignUp;