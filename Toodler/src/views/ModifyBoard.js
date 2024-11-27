import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import data from '../resources/data.json';
import * as ImagePicker from 'expo-image-picker';



export default function ModifyBoard({ navigation, route }) {
    const {boardId, currentBoardName, currentBoardDescription,currentThumbnailPhoto, modifyBoard } = route.params; // Get modifyBoard function and board details
    const [boardName, setBoardName] = useState(currentBoardName); // Initialize with current name
    const [boardDescription, setBoardDescription] = useState(currentBoardDescription);
    const [thumbnailPhoto, setThumbnailPhoto] = useState(currentThumbnailPhoto); // Initialize with current thumbnail
  
    const handleModifyBoard = () => {
        if (boardName.trim() === '') {
            alert('Please fill in all fields!');
            return;
        }
    
        // Call the modifyBoard function to update the board
        modifyBoard({
            id: boardId, // Keep the same ID
            name: boardName,
            description: boardDescription,
            thumbnailPhoto,
        });
    
        navigation.goBack(); // Navigate back to the Home screen
    };
    

    const pickImage = async () => {
        // Request permission to access the media library
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            return;
        }
    
        // Launch the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        // Handle the selected image
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setThumbnailPhoto(result.assets[0].uri); // Update the thumbnail
        } else {
            alert('Image selection was canceled or failed.');
        }
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modify Board</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleModifyBoard}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
}


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
    imagePicker: {
        backgroundColor: 'pink',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    imagePickerText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
    thumbnailPreview: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginVertical: 10,
        borderRadius: 5,
    },
});
  