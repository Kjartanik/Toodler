import React, {useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the back button icon
import styles from './styles';
import { AuthContext } from '../../context/AuthContext';


const CustomHeader = ({ title, navigation, canGoBack, displaySignOut }) => {
    const { authContext } = useContext(AuthContext); // Access the AuthContext

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient
                colors={['pink', 'white']} // Gradient colors
                style={styles.headerContainer}
            >
                <View style={styles.headerContent}>
                    {/* Back Button (only visible if canGoBack is true) */}
                    {canGoBack ? (
                        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
                            <Icon name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.placeholderBack} /> // Placeholder for alignment
                    )}

                    {/* Page Title */}
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    
                    <View style={styles.signOutWrapper}>
                        {displaySignOut ? (
                            <TouchableOpacity style={styles.signOutWrapper} onPress={() => authContext.signOut()}>
                                <Text style={styles.signOut}>Sign out</Text>
                            </TouchableOpacity>
                        )
                            : ( <View style={styles.placeholderSignOut}/>)

                        }
                    </View>
                    
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default CustomHeader;
