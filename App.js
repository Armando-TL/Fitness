import React from "react";
import {StatusBar} from 'expo-status-bar';
import {Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

function iniciarSession() {
    return undefined;
}

export default function App() {

    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');


    let empty = user.trim().length > 5 && password.trim().length > 7;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Iniciar sesion
                </Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <StatusBar style="auto"/>
                <TextInput
                    style={styles.input}
                    onChangeText={setUser}
                    value={user}
                    placeholder='Correo'
                    placeholderTextColor='#515251'
                    keyboardType='email-address'/>
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder='Contraseña'
                    placeholderTextColor='#515251'
                    keyboardType='visible-password'
                    secureTextEntry={true}
                    autoCorrect={false}/>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {Alert.alert('Go')}}>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>Iniciar sesion</Text>
                </TouchableOpacity>
                <View style={styles.other}>
                    <View style={{flex: 1, height: 2, backgroundColor: '#313131'}} />
                    <Text style={{witdh: 50,color: 'white', padding: 5}}>O</Text>
                    <View style={{flex: 1, height: 2, backgroundColor: '#313131'}} />
                </View>
                <TouchableOpacity>
                    <Image source={require('./assets/loginGoogle.svg')} style={styles.image} />
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(23,23,23,255)',
        alignItems: 'center',
        justifyContent: 'center',

    },
    input: {
        backgroundColor: '#2e2e2e',
        width: 300,
        height: 40,
        margin: 5,
        color: '#fff',
        padding: 8,
        borderRadius: 10,
        elevation: 5,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {width: 0, height: 2},
        overflow: 'hidden',
    },
    button: {
        backgroundColor: '#4ade80',
        marginTop: 20,
        width: 250,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        padding: 12,
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },
    title: {
        color: 'white',
        fontSize: 40,
    },
    other: {
        width: 250,
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 189,
        height: 40,
    }
});
