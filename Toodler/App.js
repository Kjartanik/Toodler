import 'react-native-gesture-handler';
import React from 'react';
import AppContainer from './src/routes';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
    return (
        <AuthProvider>
            <AppContainer />
        </AuthProvider>
    );
}



