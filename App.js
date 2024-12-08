import React from "react";
import Navigation from "./navigation";
import {View} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function inicio() {

    return (
        <View style={{width:'100%', height:'100%'}}>
            <StatusBar barStyle="auto" />
            <Navigation/>
        </View>
    );
}