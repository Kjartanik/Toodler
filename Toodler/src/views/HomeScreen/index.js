import React, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { getBoards, addBoard, deleteBoard } from '../../services/dataService.js';
import BoardCard from '../../components/BoardCard/index';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { AuthContext } from '../../context/AuthContext';

const HomeScreen = ({ navigation }) => {
    console.log('Homescreen')
    const [boards, setBoards] = useState([]);
    const { authContext } = useContext(AuthContext); // Access the AuthContext

    // Fetch boards when the component mounts
    useEffect(() => {
        const fetchedBoards = getBoards(); // Fetch boards from dataService
        console.log('Fetched boards:', fetchedBoards);
        setBoards(fetchedBoards);
      }, []); // Only runs on mount
      

    // Handle adding a new board
    const handleAddBoard = (newBoard) => {
        const addedBoard = addBoard(newBoard);
        setBoards((prevBoards) => {
          const isDuplicate = prevBoards.some((board) => board.id === addedBoard.id);
          if (isDuplicate) {
            console.warn('Duplicate board detected:', addedBoard.id);
            return prevBoards; // No state update if duplicate
          }
          return [...prevBoards, addedBoard];
        });
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
            showTrashIcon={true}
        />
    );

    const renderFooter = () => (
        <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddBoard', { addBoard: handleAddBoard })}
        >
            <View style={styles.iconContainer}>
                <Text style={styles.text}>
                    <Icon style={styles.icon} name="add" size={30} color="pink" /> {/* Plus icon */}
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
            {/* <TouchableOpacity style={styles.button} onPress={() => authContext.signOut()}>
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity> */}
        </View>
    );
};

export default HomeScreen;
