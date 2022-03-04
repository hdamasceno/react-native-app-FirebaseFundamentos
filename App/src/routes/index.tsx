import React from 'react';
import {AppRoutes} from './app.routes';
import {AuthProvider} from '../hooks/useAuth';

export function Routes() {
    return (
        <>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </>
    );
}
