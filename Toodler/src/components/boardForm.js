import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const BoardForm = ({ styles, title, onSubmit, onCancel, initialData }) => {
    const [boardName, setBoardName] = useState(initialData.name || '');
    const [boardDescription, setBoardDescription] = useState(initialData.description || '');
    const [thumbnailPhoto, setThumbnailPhoto] = useState(initialData.thumbnailPhoto || null);

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

    const handleSave = () => {
        if (boardName.trim() === '') {
            alert('Please fill in the name!');
            return;
        }
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
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

export default BoardForm;
