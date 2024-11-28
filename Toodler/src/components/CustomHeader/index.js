import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the back button icon
import styles from './styles';

const CustomHeader = ({ title, navigation, canGoBack }) => {
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
                        <View style={styles.placeholder} /> // Placeholder for alignment
                    )}

                    {/* Page Title */}
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{title}</Text>
                    </View>

                    {/* Company Name */}
                    <View style={styles.logoWrapper}>
                        <Text style={styles.companyName}>Toodle</Text>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default CustomHeader;
