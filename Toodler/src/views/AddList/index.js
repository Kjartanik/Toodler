import React from 'react';
import ListForm from '../../components/ListForm';
import { addListToBoard } from '../../services/dataService';

const AddList = ({ navigation, route }) => {
    const { addList, boardId } = route.params;

    const handleSave = (listData) => {
        const newList = {
            ...listData,
            id: Date.now(),
            boardId,
        };
        addListToBoard(boardId, newList);
        addList(newList);
        navigation.goBack();
    };

    return (
        <ListForm
            onSubmit={handleSave}
            onCancel={() => navigation.goBack()}
            initialData={{ name: '', color: '' }}
            title='Create New List'
        />
    );
};

export default AddList;
