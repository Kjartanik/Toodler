import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import UserService from '../../services/UserService';
import styles from './styles'; 

const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        //make sure evrething is correctly enterd
        if (!username || !password) {
            Alert.alert('Error', 'Please fill in both fields');
            return;
        }

        // Create the new user object
        const newUser = { username, password };

        // Store the new user in UserService
        UserService.setItem(newUser);
        
        //let the user know it was succesfully created adn move to log-in screen
        Alert.alert('Success', 'Account created successfully');
        navigation.navigate('LoginScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder='Username'
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity title='Sign up' onPress={handleSignUp} style={styles.button}>
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignUpScreen;
