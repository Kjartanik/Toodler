import React from 'react';
import BoardForm from '../../components/BoardForm';
import styles from './styles';

const AddBoard = ({ navigation, route }) => {
    const { addBoard } = route.params;

    const handleSave = (boardData) => {
        addBoard({
            ...boardData,
            id: Date.now(), // Generate a unique ID for the new board
        });
        navigation.goBack();
    };

    return (
        <BoardForm
            styles={styles}
            onSubmit={handleSave}
            onCancel={() => navigation.goBack()}
            initialData={{ name: '', description: '', thumbnailPhoto: null }}
            title="Create New Board"
        />
    );
};

export default AddBoard;
