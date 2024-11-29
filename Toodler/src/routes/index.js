import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../views/HomeScreen/index';
import ModifyBoard from '../views/ModifyBoard/index';
import Boards from '../views/Boards/index';
import AddBoard from '../views/AddBoard/index';
import Lists from '../views/Lists/index';
import Tasks from '../views/Tasks/index';
import AddList from '../views/AddList/index';
import ModifyList from '../views/ModifyList/index';
import LoginScreen from '../views/LogIn/index';
import SignUpScreen from '../views/SignUp/index';
import { AuthContext } from '../context/AuthContext';

import CustomHeader from '../components/CustomHeader';
import MoveTask from '../views/MoveTask/index';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const MainAppFlow = () => (
    <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={({ navigation }) => ({
            header: (props) => (
                <CustomHeader
                    title={props.options.title}
                    navigation={navigation}
                    canGoBack={navigation.canGoBack()}
                    displaySignOut={true}
                />
            ),
        })}
    >
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'My Boards' }} />
        <Stack.Screen name="ModifyBoard" component={ModifyBoard} options={{ title: 'Modify Board' }} />
        <Stack.Screen name="Boards" component={Boards} options={{ title: 'Boards Overview' }} />
        <Stack.Screen name="AddBoard" component={AddBoard} options={{ title: 'Add Board' }} />
        <Stack.Screen name="Lists" component={Lists} options={{ title: 'Lists View' }} />
        <Stack.Screen name="Tasks" component={Tasks} options={{ title: 'Task List' }} />
        <Stack.Screen name="AddList" component={AddList} options={{ title: 'Add New List' }} />
        <Stack.Screen name="ModifyList" component={ModifyList} options={{ title: 'Modify List' }} />
        <Stack.Screen name="MoveTask" component={MoveTask} options={{ title: 'Move Task' }} />
    </Stack.Navigator>
);

const AuthenticationFlow = () => (
   <Stack.Navigator
    initialRouteName="LoginScreen"
    screenOptions={({ navigation }) => ({
        header: (props) => (
            <CustomHeader
                title={props.options.title}
                navigation={navigation}
                canGoBack={navigation.canGoBack()}
                displaySignOut={false}
            />
        ),
    })}
>
        <Stack.Screen name="LoginScreen" component={LoginScreen}  />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen}  />
    </Stack.Navigator>
);

const Routes = () => {
    const { state } = useContext(AuthContext);

    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                {state.userToken ? (
                    <RootStack.Screen name="MainApp" component={MainAppFlow} />
                ) : (
                    <RootStack.Screen name="Auth" component={AuthenticationFlow} />
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
