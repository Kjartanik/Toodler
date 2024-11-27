import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { getBoards, addBoard, deleteBoard } from '../../services/dataService.js';
import BoardCard from '../../components/BoardCard';

const HomeScreen = ({ navigation }) => {
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

    const handleModifyBoard = (updatedBoard) => {
        setBoards((prevBoards) =>
            prevBoards.map((board) =>
                board.id === updatedBoard.id ? updatedBoard : board
            )
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={boards}
                keyExtractor={(board) => board.id.toString()}
                renderItem={({ item: board }) => (
                    <BoardCard
                        board={board}
                        onDelete={() => handleDeleteBoard(board.id)}
                        onModify={() =>
                            navigation.navigate('ModifyBoard', {
                                boardId: board.id,
                                currentBoardName: board.name,
                                currentBoardDescription: board.description,
                                currentThumbnailPhoto: board.thumbnailPhoto,
                                modifyBoard: handleModifyBoard,
                            })
                        }
                        onPress={() => navigation.navigate('ListsAndTasks', { board })}
                    />
                )}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AddBoard', { addBoard: handleAddBoard })}
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
});

export default HomeScreen;
