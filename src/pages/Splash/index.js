import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ILogo } from "../../assets/icons";

const Splash = ({navigation}) => {
    useEffect (() => {
        setTimeout(() => {
            navigation.replace('SignIn');
        }, 3000);
    }, []);

    return (
        <View style={style.container}>

            <Image source={ILogo} style={style.logo}/>
            <Text style={style.name}>WasteGPS</Text>
            
        </View>
    );z
};

const style = StyleSheet.create({
    container : {
        backgroundColor: '#00008B', 
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 110,
        width: 110,
        marginBottom: 10,
    },
    name: {
        fontSize: 25, 
        fontWeight: '500', 
        color: '#FFF8DC',
    },
});

export default Splash;