import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import UserService from '../../services/UserService';
import { AuthContext } from '../../context/AuthContext';
import styles from './styles';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { authContext } = useContext(AuthContext);

  const handleLogin = () => {
    const users = UserService.getAllUsers();
    const user = Object.values(users).find(
      (storedUser) => storedUser.username === username && storedUser.password === password
    );

    if (user) {
      UserService.setCurrentUser(user);
      authContext.signIn('dummy-auth-token');
    } else {
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
