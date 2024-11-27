import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import HomeScreen from '../views/HomeScreen/index';
import ModifyBoard from '../views/ModifyBoard/index';
import Boards from '../views/Boards/index';
import AddBoard from '../views/AddBoard/index'
import Lists from '../views/Lists/index';
import Tasks from '../views/Tasks/index';
import AddList from '../views/AddList/index';


const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ModifyBoard" component={ModifyBoard} />
            <Stack.Screen name="Boards" component={Boards} />
            <Stack.Screen name="AddBoard" component={AddBoard} />
            <Stack.Screen name="Lists" component={Lists} />
            <Stack.Screen name="Tasks" component={Tasks} />
            <Stack.Screen name="AddList" component={AddList} />
            
        </Stack.Navigator>
    </NavigationContainer>
);

export default Routes;