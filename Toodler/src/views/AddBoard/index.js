import React from 'react';
import BoardForm from '../../components/BoardForm';
import styles from './styles';

const AddBoard = ({ navigation, route }) => {
    const { addBoard } = route.params;

    let isSaving = false;

    const handleSave = (boardData) => {
        if (isSaving) return; // Prevent multiple triggers
        isSaving = true;

        addBoard(boardData); // Add the board using the provided function
        navigation.goBack();

        isSaving = false; // Reset the flag after navigation
    };


    return (
        <BoardForm
            title="Create New Board"
            styles={styles}
            onSubmit={handleSave}
            onCancel={() => navigation.goBack()}
            initialData={{ name: '', description: '', thumbnailPhoto: null }}
        />
    );
};

export default AddBoard;
