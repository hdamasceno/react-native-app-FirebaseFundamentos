import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AppLoginRoutes} from './app.login.routes';
import {AppAuthRoutes} from './app.auth.routes';
import {useAuth} from '../hooks/useAuth';

type UserProps = {
    uid: string;
};

export function AppRoutes() {
    const [user, setUser] = useState<UserProps | null>(null);
    const {authenticatedUser} = useAuth();

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(userInfo => {
            setUser(userInfo);
        });

        return subscriber;
    }, []);

    useEffect(() => {
        if (authenticatedUser?.id !== undefined) {
            setUser({uid: authenticatedUser.id});
        }
    }, [authenticatedUser]);

    return (
        <NavigationContainer>
            {user ? <AppAuthRoutes /> : <AppLoginRoutes />}
        </NavigationContainer>
    );
}
