import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import homeScreen from '../views/homeScreen';
import ModifyBoard from '../views/ModifyBoard';
import Boards from '../views/Boards';
import AddBoard from '../views/AddBoard'
import DeleteBoard from '../views/DeleteBoard'
import ListsAndTasks from '../views/ListsAndTasks';


const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="homeScreen">
            <Stack.Screen name="homeScreen" component={homeScreen} />
            <Stack.Screen name="ModifyBoard" component={ModifyBoard} />
            <Stack.Screen name="Boards" component={Boards} />
            <Stack.Screen name="DeleteBoard" component={DeleteBoard} />
            <Stack.Screen name="AddBoard" component={AddBoard} />
            <Stack.Screen name="ListsAndTasks" component={ListsAndTasks} />

            
        </Stack.Navigator>
    </NavigationContainer>
);

export default Routes;