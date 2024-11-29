import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticationFlow from './AuthenticationFlow/index';
import MainAppFlow from './MainAppFlow/index';

const Routes = () => {
    const [isSignedIn, setIsSignedIn] = useState(false); 

    return (
        <NavigationContainer>
            {isSignedIn ? <MainAppFlow /> : <AuthenticationFlow setIsSignedIn={setIsSignedIn} />}
        </NavigationContainer>
    );
};

export default Routes;


