import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import BoardForm from '../../components/BoardForm/index';
import { getBoardById, updateBoard } from '../../services/dataService';

const ModifyBoard = ({ navigation, route }) => {
    const { boardId, modifyBoard } = route.params;
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchedBoard = getBoardById(boardId);
        if (fetchedBoard) {
            setBoard(fetchedBoard);
        } else {
            Alert.alert('Error', 'Board not found');
            navigation.goBack();
        }
        setLoading(false);
    }, [boardId]);

    const handleSave = (boardData) => {
        const updatedBoard = {
            id: boardId,
            ...boardData,
        };

        const savedBoard = updateBoard(boardId, updatedBoard);

        if (savedBoard) {
            modifyBoard(savedBoard); // Notify parent screen
            navigation.goBack(); // Navigate back
        } else {
            Alert.alert('Error', 'Failed to update board');
        }
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
                name: board?.name || '',
                description: board?.description || '',
                thumbnailPhoto: board?.thumbnailPhoto || null,
            }}
        />
    );
};

export default ModifyBoard;
