import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles'

const BoardForm = ({title, onSubmit, onCancel, initialData = {} }) => {
    const [boardName, setBoardName] = useState('');
    const [boardDescription, setBoardDescription] = useState('');
    const [thumbnailPhoto, setThumbnailPhoto] = useState(null);

    useEffect(() => {
        // Load initial data into form fields
        setBoardName(initialData.name || '');
        setBoardDescription(initialData.description || '');
        setThumbnailPhoto(initialData.thumbnailPhoto || null);
    }, [initialData]);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setThumbnailPhoto(result.assets[0].uri);
        } else {
            alert('Image selection was canceled or failed.');
        }
    };
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        if (loading) return; // Prevent further actions if already saving
        if (boardName.trim() === '') {
            alert('Please provide a board name!');
            return;
        }
        setLoading(true); // Set loading to true
    
        onSubmit({
            name: boardName,
            description: boardDescription,
            thumbnailPhoto,
        });
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                style={styles.input}
                placeholder="Board Name"
                value={boardName}
                onChangeText={setBoardName}
            />
            <TextInput
                style={styles.input}
                placeholder="Board Description"
                value={boardDescription}
                onChangeText={setBoardDescription}
            />
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                <Text style={styles.imagePickerText}>
                    {thumbnailPhoto ? 'Change Image' : 'Select Image'}
                </Text>
            </TouchableOpacity>
            {thumbnailPhoto && (
                <Image source={{ uri: thumbnailPhoto }} style={styles.thumbnailPreview} />
            )}
            {/* <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save'}</Text>
            </TouchableOpacity>

        </View>
    );
};

export default BoardForm;
