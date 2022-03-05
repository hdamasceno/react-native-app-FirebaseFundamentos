import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '@screens/LoginScreen';
import {HomeScreen} from '@screens/HomeScreen';
import {ImageScreen} from '@screens/ImageScreen';

const Stack = createNativeStackNavigator();

export function AppAuthRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Image">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Image" component={ImageScreen} />
        </Stack.Navigator>
    );
}
