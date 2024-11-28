import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import ListForm from '../../components/ListForm/index';
import { getListById, updateList } from '../../services/dataService';

const ModifyList = ({ navigation, route }) => {
    const { listId, modifyList } = route.params;
    const [list, setList] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchedList = getListById(listId);
        if (fetchedList) {
            setList(fetchedList);
        } else {
            Alert.alert('Error', 'List not found');
            navigation.goBack();
        }
        setLoading(false);
    }, [listId]);

    const handleSave = (listData, updatedTasks) => {
        const updatedList = {
            id: listId,
            ...listData,
        };
    
        const savedList = updateList(listId, updatedList);
    
        if (savedList) {
            modifyList(savedList); // Notify parent screen
            if (updatedTasks) {
                modifyTasks(updatedTasks); // Update tasks for the specific list
            }
            navigation.goBack(); // Navigate back
        } else {
            Alert.alert('Error', 'Failed to update list');
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
        <ListForm
            title="Modify List"
            onSubmit={handleSave}
            onCancel={() => navigation.goBack()}
            initialData={{
                name: list?.name || '',
                color: list?.color || '',
            }}
        />
    );
};

export default ModifyList;
