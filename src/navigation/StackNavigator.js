import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { auth } from '../../firebase';

import ListScreen from '../screens/Place/ListScreen'
import DetailScreen from '../screens/Place/DetailScreen'
import CreatePlaceScreen from '../screens/Place/CreatePlace/CreatePlaceScreen'
import FirstStep from "../screens/Place/CreatePlace/FirstStep";
import SecondStep from '../screens/Place/CreatePlace/SecondStep';
import CommentsScreen from '../screens/Place/CommentsScreen'
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })

        return unsubscribe;
    }, [])

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {
                user ? (
                    <>
                        <Stack.Screen name="List" component={ListScreen} />
                        <Stack.Screen name="Detail" component={DetailScreen} />
                        <Stack.Screen name="Comments" component={CommentsScreen} />
                        <Stack.Screen name="Create" component={CreatePlaceScreen} />
                        <Stack.Screen name="FirstStep" component={FirstStep} />
                        <Stack.Screen name="SecondStep" component={SecondStep} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                )
            }

        </Stack.Navigator>
    );
}

export default StackNavigator;