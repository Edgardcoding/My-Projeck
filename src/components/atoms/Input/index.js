import React, { useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput,
    TouchableOpacity 
} from "react-native";


const Input = ({label, password, ...props}) => {
    const [isFocus, setIsFocus] = useState(false);
    const [hidePassword, setHidePassword] = useState(password);
    return (
        <View style={style.container}>
            <Text style={style.label}>{label}</Text>
            <View style={[style.inputContainer, {borderColor: isFocus ? 'blue' : '#DCDCDC'}]}>
                <TextInput 
                secureTextEntry={hidePassword}
                {...props} 
                style={style.textInput} 
                onFocus={() => {
                    setIsFocus(true);
                }}
                onBlur={() => {
                    setIsFocus(false);
                }}
                />
                {password && (
                    <TouchableOpacity 
                    style={style.showHide} 
                    onPress={() => {
                        setHidePassword(!hidePassword);
                    }}>
                    {hidePassword ? (
                    <Text style={style.textShowHide}>Show</Text>
                    ) : (
                    <Text style={style.textShowHide}>Hide</Text>
                    )}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: '#FFF8DC'
    },
    inputContainer: {
        borderRadius: 15,
        height: 55,
        backgroundColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    showHide: {
        marginRight: 10
    },
    textShowHide: {
        fontSize: 12,
        color: 'white',
        fontWeight: '600'
    },
    textInput: {
        marginLeft: 10,
        color: '#FFF8DC',
        flex: 1
    },
});

export default Input;