import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Text } from 'react-native';
import styles from './styles';

const ListForm = ({ onSubmit, onCancel, initialData = {} }) => {
    const [listName, setListName] = useState('');
    const [listColor, setListColor] = useState('');
    const colors = [
        'white',
        '#FFD1DC', '#FFCCCB', '#FFABAB', '#FFC3A0', '#A4C8F0','#FFE4B5', 
        '#FDFD96', '#CBF3F0', '#B2F9FC', '#B8E1FF', 
        'purple', 'orange', '#90EE90', '#FF00FF', '#0000CD',
        '#FF4500', '#8B4513', 'black', 'red', 'beige', 'green', 'gold', 'silver'
    ];

    useEffect(() => {
        setListName(initialData.name || '');
        setListColor(initialData.color || 'pink');
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
            <TextInput
                style={styles.input}
                placeholder='List Name'
                value={listName}
                onChangeText={setListName}
            />
            <Text style={styles.label}>Select a Color:</Text>
            <View style={styles.colorGrid}>
                {colors.map((color) => (
                    <TouchableOpacity
                        key={color}
                        style={[
                            styles.colorOption,
                            { backgroundColor: color },
                            color === listColor && styles.selectedColorOption,
                        ]}
                        onPress={() => setListColor(color)}
                    />
                ))}
            </View>
            <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
                <Text style={styles.primaryButtonText}>Save</Text>
            </TouchableOpacity>
            
        </View>
    );
};

export default ListForm;
