import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Boards from '../views/Boards';
import AddBoard from '../views/AddBoard';
import ModifyBoard from '../views/ModifyBoard';
import DeleteBoard from '../views/DeleteBoard';
import ListsAndTasks from '../views/ListsAndTasks';

const Stack = createStackNavigator();

const AppRoutes = () => (
    <Stack.Navigator>
        <Stack.Screen name="Boards" component={Boards} />
        <Stack.Screen name="AddBoard" component={AddBoard} />
        <Stack.Screen name="ModifyBoard" component={ModifyBoard} />
        <Stack.Screen name="DeleteBoard" component={DeleteBoard} />
        <Stack.Screen name="ListsAndTasks" component={ListsAndTasks} />
    </Stack.Navigator>
);

export default AppRoutes;
