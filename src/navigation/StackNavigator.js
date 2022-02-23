import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen'
import ListScreen from '../screens/ListScreen'
import DetailScreen from '../screens/DetailScreen'
import CreatePlaceScreen from '../screens/create_place_screens/CreatePlaceScreen'
import FirstStep from "../screens/create_place_screens/FirstStep";
import SecondStep from '../screens/create_place_screens/SecondStep';
import AuthScreen from "../screens/AuthScreen";
import LoginScreen from '../screens/LoginScreen';
import CommentsScreen from '../screens/CommentsScreen'

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="List" component={ListScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="Comments" component={CommentsScreen} />
            <Stack.Screen name="Create" component={CreatePlaceScreen} />
            <Stack.Screen name="FirstStep" component={FirstStep} />
            <Stack.Screen name="SecondStep" component={SecondStep} />
        </Stack.Navigator>
    );
}

export default StackNavigator;