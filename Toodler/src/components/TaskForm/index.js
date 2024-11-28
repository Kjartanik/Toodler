import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './styles';

const TaskForm = ({ title, initialData = {}, onSubmit, onCancel }) => {
    const [taskName, setTaskName] = useState('');

    useEffect(() => {
        setTaskName(initialData.name || '');
    }, [initialData]);

    const handleSave = () => {
        if (taskName.trim() === '') {
            alert('Task name cannot be empty.');
            return;
        }
        onSubmit({ name: taskName });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                style={styles.input}
                placeholder="Task Name"
                value={taskName}
                onChangeText={setTaskName}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TaskForm;
