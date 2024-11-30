import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon
import styles from './styles'

const BoardCard = ({ board, onDelete, onModify, onPress, hideActions = false, showTrashIcon = false }) => {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress} // Navigate to Lists
        >
            <View style={styles.cardHeader}>
                <Image source={{ uri: board.thumbnailPhoto }} style={styles.image} />
            </View>
            <Text style={styles.description}>Description: {board.description || 'No description'}</Text>
            <View style={styles.iconContainer}>
                {!hideActions && (
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={onModify} // Call modify action
                    >
                        <Text style={styles.description}>
                            <Icon name="edit" size={24} color="pink" />
                        </Text>
                    </TouchableOpacity>
                )}
                {showTrashIcon && ( // Conditionally render the trashcan icon
                    <TouchableOpacity 
                        style={styles.icon} 
                        onPress={onDelete}
                    >
                        <Text style={styles.description} /* <Text> added to avoid rendering error */>
                            <Icon name="delete" size={24} color="pink" /> {/* Trashcan icon */}
                        </Text>

                    </TouchableOpacity>
                )}
            </View>
            <Text style={styles.title}>{board.name || 'Untitled'}</Text>
        </TouchableOpacity>
    );
};


export default BoardCard;
