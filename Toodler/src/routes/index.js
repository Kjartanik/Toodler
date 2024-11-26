import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import homeScreen from '../views/homeScreen';



const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="homeScreen">
            <Stack.Screen name="homeScreen" component={homeScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Routes;