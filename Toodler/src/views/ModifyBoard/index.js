import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import BoardForm from '../../components/BoardForm';
import { getBoardById, updateBoard} from '../../services/dataService';

const ModifyBoard = ({ navigation, route }) => {
    const { boardId, modifyBoard, onNavigateBack } = route.params; // Destructure parameters
    const [board, setBoard] = useState(null); // State to store the board details
    const [loading, setLoading] = useState(true); // Loading indicator

    useEffect(() => {
        // Fetch board details when the component mounts
        const fetchedBoard = getBoardById(boardId);
        if (fetchedBoard) {
            setBoard(fetchedBoard);
        } else {
            Alert.alert('Error', 'Board not found');
            navigation.goBack(); // Navigate back if board is not found
        }
        setLoading(false);
    }, [boardId]);

    const handleSave = (boardData) => {
        const updatedBoard = {
            id: boardId,
            ...boardData, // Include updated name, description, and thumbnailPhoto
        };

        modifyBoard(updatedBoard); // Call the modify function to update the board
        if (onNavigateBack) {
            onNavigateBack(updatedBoard); // Notify the parent screen about the update
        }
        navigation.goBack(); // Return to the previous screen
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <BoardForm
            title="Modify Board"
            onSubmit={handleSave}
            onCancel={() => navigation.goBack()}
            initialData={{
                name: board?.name || '', // Populate with existing data
                description: board?.description || '',
                thumbnailPhoto: board?.thumbnailPhoto || null,
            }}
        />
    );
};

export default ModifyBoard;
