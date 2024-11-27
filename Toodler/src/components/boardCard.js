import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const BoardCard = ({ board, onModify, onDelete, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image source={{ uri: board.thumbnailPhoto }} style={styles.image} />
        <Text style={styles.title}>{board.name}</Text>
        <TouchableOpacity style={styles.button} onPress={onModify}>
            <Text style={styles.buttonText}>Modify</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onDelete}>
            <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    title: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: 'bold',
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
});

export default BoardCard;
