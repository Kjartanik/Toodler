import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon
import styles from './styles'

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
            {}
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
            {}
            <Text style={styles.title}>{board.name}</Text>
        </TouchableOpacity>
    );
};


export default BoardCard;
