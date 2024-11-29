import React, { useState} from 'react';
import BoardForm from '../../components/BoardForm/index';
import styles from './styles';

const AddBoard = ({ navigation, route }) => {
    const { addBoard } = route.params;

    const [isSaving, setIsSaving] = useState(false); 

    const handleSave = (boardData) => {
        console.log('Adding board in AddBoard.js')
        if (isSaving) return; 
        setIsSaving(true);

        addBoard(boardData);
        console.log('before go back')
        navigation.goBack();
        console.log('second status saved');

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
