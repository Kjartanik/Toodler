import React from 'react';
import ListForm from '../../components/ListForm';
import { addListToBoard } from '../../services/dataService';
import styles from './styles';

const AddList = ({ navigation, route }) => {
    const { addList } = route.params;

    const handleSave = (listData) => {
        const newList = {
            ...listData,
            id: Date.now(), // Generate a unique ID for the new list
        };
        addList(newList); // Call the addList function passed via route params
        navigation.goBack(); // Navigate back to the Lists screen
    };

    return (
        <ListForm
            onSubmit={handleSave}
            onCancel={() => navigation.goBack()}
            initialData={{ name: '', color: '#00ff00' }}
            title="Create New List"
        />
    );
};

export default AddList;

