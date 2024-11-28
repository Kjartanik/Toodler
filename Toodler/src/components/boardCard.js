import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon

const BoardCard = ({ board, onDelete, onModify, onPress, hideActions = false, showTrashIcon = true }) => {
    return (
        <TouchableOpacity
            key={board.id}
            style={styles.card}
            onPress={onPress} // Navigate to Lists
        >
            <View style={styles.cardHeader}>
                <Image source={{ uri: board.thumbnailPhoto }} style={styles.image} />
            </View>
            <Text style={styles.description}>Description: {board.description}</Text>
            <View style={styles.iconContainer}>
            {!hideActions && (
                <TouchableOpacity
                    style={styles.icon}
                    onPress={onModify} // Call modify action
                >
                <Icon name="edit" size={24} color="pink" />

                </TouchableOpacity>
            )}
            {showTrashIcon && ( // Conditionally render the trashcan icon
                <TouchableOpacity 
                    style={styles.icon} 
                    onPress={onDelete}
                >
                <Icon name="delete" size={24} color="pink" /> {/* Trashcan icon */}
                
                </TouchableOpacity>
                )}
            </View>
            <Text style={styles.title}>{board.name}</Text>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    trashIcon: {
        padding: 5,
    },
    title: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        marginTop: 5,
        fontSize: 10,
    },
    button: {
        marginTop: 5,
        padding: 10,
        backgroundColor: 'pink',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconContainer: {
        position: 'absolute', // Position icons in the top-right corner
        top: 10,
        right: 10,
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 10, // Spacing between icons
    },
});

export default BoardCard;
