import React from 'react';
import ListForm from '../../components/ListForm';
import { addListToBoard } from '../../services/dataService';
import styles from './styles';

const AddList = ({ navigation, route }) => {
    const { addList } = route.params;

    const handleSave = (listData) => {
        addListToBoard({
            ...listData,
            id: Date.now(), // Generate a unique ID for the new board TODO: breyta þessu í annað en date now! annars kemur identical key error og það getur tvöfaldast
        });
        navigation.goBack();
    };

    return (
        <ListForm
            styles={styles}
            onSubmit={handleSave}
            onCancel={() => navigation.goBack()}
            initialData={{ name: '', color: ''}} // TODO: skrá BoardId hjá boardinu sem stateið er í þegar við bætum við nýtt list
            title="Create New List"
        />
    );
};

export default AddList;
