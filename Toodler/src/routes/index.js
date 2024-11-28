import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../views/HomeScreen/index';
import ModifyBoard from '../views/ModifyBoard/index';
import Boards from '../views/Boards/index';
import AddBoard from '../views/AddBoard/index';
import Lists from '../views/Lists/index';
import Tasks from '../views/Tasks/index';
import AddList from '../views/AddList/index';
import CustomHeader from '../components/CustomHeader';

const Stack = createStackNavigator();

const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={({ navigation, route }) => ({
                header: (props) => (
                    <CustomHeader
                        title={props.options.title}
                        navigation={navigation}
                        canGoBack={navigation.canGoBack()}
                    />
                ),
            })}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'My Boards' }} />
            <Stack.Screen name="ModifyBoard" component={ModifyBoard} options={{ title: 'Change Board' }} />
            <Stack.Screen name="Boards" component={Boards} options={{ title: 'Boards' }} />
            <Stack.Screen name="AddBoard" component={AddBoard} options={{ title: 'Create New Board' }} />
            <Stack.Screen name="Lists" component={Lists} options={{ title: 'Lists' }} />
            <Stack.Screen name="Tasks" component={Tasks} options={{ title: 'Tasks' }} />
            <Stack.Screen name="AddList" component={AddList} options={{ title: 'Create New List' }} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Routes;
