import React from "react";
import {StatusBar} from 'expo-status-bar';
import {Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from "@react-native-async-storage/async-storage";

//id web: 432007234672-23m7c0op9psh0t3g32non3okm8a5u4fe.apps.googleusercontent.com
//id android: 432007234672-oqqgs6gtbgti5v25m0vivg3h7k8v8f6d.apps.googleusercontent.com

//https://auth.expo.io/@armando3652/Fitness
WebBrowser.maybeCompleteAuthSession();

export default function App() {

    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [userInfo, setUserInfo] = React.useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "390079309516-m127jlhq6kpq8q1ehillpgicaabg89vb.apps.googleusercontent.com",
        webClientId: "390079309516-9isa00bmlngp3a126s4j37apv9sdr32n.apps.googleusercontent.com"
    });

    React.useEffect(() => {
        iniciarSession();
    }, [response]);

    async function iniciarSession() {
        const user = await getLocalUser();
        if (!user) {
            if(response?.type === "success") {
                getUserInfo(response.authentication.accessToken);
            }
        }else {
            setUserInfo(user);
        }
    }

    const getLocalUser = async () => {
        const data = await AsyncStorage.getItem('@user');
        if (!data) null;
        return JSON.parse(data);
    }

    const getUserInfo = async (token) => {
        if (!token) return null;
        try {
            const response = await fetch("https://www.googleapis.com/userinfo/v2/me",
                {headers: {Authorization: 'Bearer ' + token}}
            );
            const user = await response.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Iniciar sesión
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
                    keyboardType='password'
                    secureTextEntry={true}
                    autoCorrect={false}/>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        Alert.alert('Go')
                    }}>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>Iniciar sesion</Text>
                </TouchableOpacity>
                <View style={styles.other}>
                    <View style={{flex: 1, height: 2, backgroundColor: '#313131'}}/>
                    <Text style={{witdh: 50, color: 'white', padding: 5}}>O</Text>
                    <View style={{flex: 1, height: 2, backgroundColor: '#313131'}}/>
                </View>
                <TouchableOpacity
                    disabled={!request}
                    onPress={() => {
                        promptAsync();
                    }}>
                    <Image source={require('../assets/loginGoogle.png')} style={styles.image}/>
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
        paddingLeft: 10,
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
        marginTop: 40,
        width: 189,
        height: 40,
    }
});
