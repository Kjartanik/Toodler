import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { deleteBoard } from '../services/dataService'; // Import from the service layer

const DeleteBoard = ({ navigation, route }) => {
    const { boardId } = route.params; // Get the board ID

    const handleDelete = () => {
        deleteBoard(boardId); // Use the service to delete the board
        navigation.goBack(); // Navigate back to the Boards screen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Are you sure you want to delete this board?</Text>
            <TouchableOpacity style={styles.button} onPress={handleDelete}>
                <Text style={styles.buttonText}>Yes, Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    // Styles omitted for brevity (same as before)
});

export default DeleteBoard;
