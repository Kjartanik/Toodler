import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the back button icon

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

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'pink', // Match gradient background
    },
    headerContainer: {
        paddingHorizontal: 10,
        paddingTop: 20, // Prevent overlapping with the notch
        paddingBottom: 15,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Distribute back button, title, and logo
    },
    backButton: {
        marginLeft: 10,
        padding: 5,
        marginRight: '5%',
    },
    placeholder: {
        width: '19%', // Same width as the back button to maintain alignment
    },
    titleWrapper: {
        flex: 1,
        alignItems: 'center', // Center the title
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    logoWrapper: {
        marginRight: 10,
    },
    companyName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default CustomHeader;
