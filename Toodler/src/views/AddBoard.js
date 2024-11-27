import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import { addBoard } from '../services/dataService';

export default function AddBoard({ navigation, route }) {
    const { addBoard } = route.params;
    const [boardName, setBoardName] = useState('');
    const [thumbnailPhoto, setThumbnailPhoto] = useState(null); // store the selected image URI

    const handleSaveBoard = () => {
        if (boardName.trim() === '' || !thumbnailPhoto) {
            alert('Please fill in both fields!');
            return;
        }

        addBoard({
            id: Date.now(),  //TODO: breyta í board.length + 1
            name: boardName,
            thumbnailPhoto,
        });

        navigation.goBack(); // navigate back to the Boards screen
    };

    const pickImage = async () => {
        // request permission to access the media library
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync(); // þá kemur svona 'allow access'
        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            return;
        }

        // launch the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
            allowsEditing: true, // allow cropping the image
            aspect: [4, 3], // fann þetta idk
            quality: 1, // fann þetta idk
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setThumbnailPhoto(result.assets[0].uri); // save the selected image URI
        } else {
            alert('Image selection was canceled or failed.'); // handle edge cases
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create New Board</Text>
            <TextInput
                style={styles.input}
                placeholder="Board Name"
                value={boardName}
                onChangeText={setBoardName}
            />
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                <Text style={styles.imagePickerText}>
                    {thumbnailPhoto ? 'Change Image' : 'Select Image'}
                </Text>
            </TouchableOpacity>
            {thumbnailPhoto && (
                <Image source={{ uri: thumbnailPhoto }} style={styles.thumbnailPreview} />
            )}
            <TouchableOpacity style={styles.button} onPress={handleSaveBoard}>
                <Text style={styles.buttonText}>Save Board</Text>
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
