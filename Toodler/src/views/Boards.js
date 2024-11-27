import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import BoardCard from '../components/BoardCard';
import { addBoard, deleteBoard, updateBoard } from '../services/dataService';
import globalStyles from '../styles/globalStyles';
import data from '../resources/data.json';

const Boards = ({ navigation }) => {
    const [boards, setBoards] = useState(data.boards);

    const handleAddBoard = (newBoard) => {
        const updatedBoards = addBoard(boards, newBoard);
        setBoards(updatedBoards);
    };

    const handleDeleteBoard = (id) => {
        const updatedBoards = deleteBoard(boards, id);
        setBoards(updatedBoards);
    };

    const handleModifyBoard = (updatedBoard) => {
        const updatedBoards = updateBoard(boards, updatedBoard);
        setBoards(updatedBoards);
    };

    const navigateToModifyBoard = (board) => {
        navigation.navigate('ModifyBoard', {
            boardId: board.id,
            currentBoardName: board.name,
            currentBoardDescription: board.description,
            currentThumbnailPhoto: board.thumbnailPhoto,
            modifyBoard: handleModifyBoard,
        });
    };

    const navigateToAddBoard = () => {
        navigation.navigate('AddBoard', { addBoard: handleAddBoard });
    };

    const navigateToListsAndTasks = (boardId) => {
        navigation.navigate('ListsAndTasks', { boardId });
    };

    return (
        <View style={globalStyles.container}>
            <FlatList
                data={boards}
                keyExtractor={(board) => board.id.toString()}
                renderItem={({ item: board }) => (
                    <BoardCard
                        board={board}
                        onModify={() => navigateToModifyBoard(board)}
                        onDelete={() => handleDeleteBoard(board.id)}
                        onPress={() => navigateToListsAndTasks(board.id)}
                    />
                )}
            />
            <TouchableOpacity
                style={globalStyles.button}
                onPress={navigateToAddBoard}
            >
                <Text style={globalStyles.buttonText}>Add Board</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Boards;
