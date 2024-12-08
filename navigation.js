import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";

//Screen
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name = "HomeScreen" component={HomeScreen} />
            <Tab.Screen name = "LoginScreen" component={LoginScreen} />
        </Tab.Navigator>
    )
}

function AuthStack() {
   return (
       <Stack.Navigator initialRouteName = "LoginScreen">
           <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
       </Stack.Navigator>
   );
}

export default function Navigation() {



    return (
        <NavigationContainer>
            {/*<MyTabs />*/}
            <AuthStack/>
        </NavigationContainer>
    )
}