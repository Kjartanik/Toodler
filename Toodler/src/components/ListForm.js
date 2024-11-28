import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const ListForm = ({ title, onSubmit, onCancel, initialData = {} }) => {
    const [listName, setListName] = useState('');
    const [listColor, setListColor] = useState('');

    useEffect(() => {
        // Load initial data into form fields
        setListName(initialData.name || '');
        setListColor(initialData.color || '');
    }, [initialData]);

    const handleSave = () => {
        if (listName.trim() === '') {
            alert('Please provide a list name!');
            return;
        }

        onSubmit({
            name: listName,
            color: listColor,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                style={styles.input}
                placeholder="List Name"
                value={listName}
                onChangeText={setListName}
            />
            <TextInput
                style={styles.input}
                placeholder="List Color (e.g., #ff0000)"
                value={listColor}
                onChangeText={setListColor}
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: 'pink',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    cancelButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
});

export default ListForm;
