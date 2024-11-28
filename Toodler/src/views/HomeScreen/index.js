import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { getBoards, addBoard, deleteBoard } from '../../services/dataService.js';
import BoardCard from '../../components/BoardCard/index';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the plus icon


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

    // Render each board using BoardCard
    const renderBoard = ({ item: board }) => (
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
                    onNavigateBack: () => navigation.navigate('HomeScreen'),
                })
            }
            onPress={() => navigation.navigate('Lists', { board })}
            hideActions={false} // Buttons will be displayed
        />

    );
    
    const renderFooter = () => (
        <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddBoard', { addBoard: handleAddBoard })} 
        >
            <View style={styles.icon}>
                <Text style={styles.text /* Note: Error {Text strings must be rendered within a <Text>} */}> 
                    <Icon name="add" size={30} color="black" /> {/* Plus icon */} 
                </Text>
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <FlatList
                data={boards}
                keyExtractor={(board) => board.id.toString()}
                renderItem={renderBoard}
                ListFooterComponent={renderFooter} // Add the "+" button below the last board
            />
        </View>
    );
};
export default HomeScreen;
