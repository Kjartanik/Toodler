import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import UserService from '../../services/UserService';
import styles from './styles';

const LoginScreen = ({ navigation, setIsSignedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const users = UserService.getAllUsers();

        const user = Object.values(users).find(
            (storedUser) => storedUser.username === username && storedUser.password === password
        );

        if (user) {
            UserService.setCurrentUser(user); 
            setIsSignedIn(true); 
            navigation.navigate('HomeScreen'); 
        } 
        else {
            Alert.alert('Invalid credentials', 'Please check your username and password');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log in</Text>
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
            <TouchableOpacity style={styles.button} title="Login" onPress={handleLogin}>
                <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
            <View style={styles.signUpContainer}>
            <Text style={styles.text}>Don't have an account?</Text>

            <TouchableOpacity style={styles.button} title="Sign Up" onPress={() => navigation.navigate('SignUpScreen')}>
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};


export default LoginScreen;
