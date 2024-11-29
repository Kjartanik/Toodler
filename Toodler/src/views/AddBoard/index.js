import React, { useState} from 'react';
import BoardForm from '../../components/BoardForm/index';
import styles from './styles';

const AddBoard = ({ navigation, route }) => {
    const { addBoard } = route.params;

    const [isSaving, setIsSaving] = useState(false); // Use state to manage saving status

    const handleSave = (boardData) => {
        if (isSaving) return; // Prevent multiple triggers
        setIsSaving(true); // Set saving flag to true

        addBoard(boardData); // Add the board using the provided function
        navigation.goBack(); // Navigate back to the previous screen

        setIsSaving(false);
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
