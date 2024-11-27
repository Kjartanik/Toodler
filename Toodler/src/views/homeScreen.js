import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { getBoards, addBoard, deleteBoard, updateBoard } from '../services/dataService.js';



const homeScreen = ({ navigation }) => {
    const [boards, setBoards] = useState([]);

    
    // Fetch boards when the component mounts
    useEffect(() => {
        const fetchedBoards = getBoards(); // Fetch boards from dataService
        setBoards(fetchedBoards);
    }, []);

    // Handle adding a new board
    const handleAddBoard = (newBoard) => {
        const addedBoard = addBoard(newBoard); // Use addBoard from dataService
        setBoards((prevBoards) => [...prevBoards, addedBoard]); // Update local state with the new board
    };


    // Handle deleting a board
    const handleDeleteBoard = (boardId) => {
        deleteBoard(boardId); // Call deleteBoard from dataService
        setBoards((prevBoards) => prevBoards.filter((board) => board.id !== boardId)); // Remove board from local state
    };

    // Render each board item
    const renderBoard = (board) => (
        <TouchableOpacity
            key={board.id}
            style={styles.boardCard}
            onPress={() => navigation.navigate('BoardCard', { boardId: board.id })} // Navigate to the board details screen
        >
            <Image source={{ uri: board.thumbnailPhoto }} style={styles.image} />
            <Text style={styles.boardTitle}>{board.name}</Text>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteBoard(board.id)} // Handle delete
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={boards}
                keyExtractor={(board) => board.id.toString()}
                renderItem={({ item }) => renderBoard(item)} // Render each board
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AddBoard', { addBoard : handleAddBoard})} // Navigate to AddBoard screen
            >
                <Text style={styles.buttonText}>Add Board</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    boardCard: {
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
    boardTitle: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: 'grey',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default homeScreen;