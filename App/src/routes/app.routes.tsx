import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
//import auth from '@react-native-firebase/auth';
import {AppLoginRoutes} from './app.login.routes';
import {AppAuthRoutes} from './app.auth.routes';
import {useAuth} from '../hooks/useAuth';

export function AppRoutes() {
    const {authenticatedUser} = useAuth();

    /*
    useEffect(() => {

        const subscriber = auth().onAuthStateChanged(userInfo => {
            console.log('userFirebase:', userInfo);
        });

        return subscriber;
    }, []);
    */

    useEffect(() => {
        //console.log('userAuth:', authenticatedUser);

        if (authenticatedUser?.id !== undefined) {
            //setUser({uid: authenticatedUser.id});
        }
    }, [authenticatedUser]);

    return (
        <NavigationContainer>
            {authenticatedUser?.id !== undefined ? (
                <AppAuthRoutes />
            ) : (
                <AppLoginRoutes />
            )}
        </NavigationContainer>
    );
}
