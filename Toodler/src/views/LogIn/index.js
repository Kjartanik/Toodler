import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import UserService from '../../services/UserService';

const LoginScreen = ({ navigation, setIsSignedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // get all users from UserService
        const users = UserService.getAllUsers();

        // Find the user that matches the entered input
        const user = Object.values(users).find(
            (storedUser) => storedUser.username === username && storedUser.password === password
        );

        if (user) {
            //if the enterd user info maches the user, then sign in and move to the homescreen
            UserService.setCurrentUser(user); 
            setIsSignedIn(true); 
            navigation.navigate('HomeScreen'); 
        } 
        //if the enterd user info dosent mach then let user know that it isint correct
        else {
            Alert.alert('Invalid credentials', 'Please check your username and password');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Sign Up" onPress={() => navigation.navigate('SignUpScreen')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default LoginScreen;
