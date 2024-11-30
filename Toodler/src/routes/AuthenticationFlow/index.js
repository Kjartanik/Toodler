import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../views/LogIn/index';
import SignUpScreen from '../../views/SignUp/index';

const Stack = createStackNavigator();

const AuthenticationFlow = ({ setIsSignedIn }) => (
    <Stack.Navigator>
        <Stack.Screen name='LoginScreen'>
            {(props) => <LoginScreen {...props} setIsSignedIn={setIsSignedIn} />}
        </Stack.Screen>
        <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
    </Stack.Navigator>
);

export default AuthenticationFlow;
