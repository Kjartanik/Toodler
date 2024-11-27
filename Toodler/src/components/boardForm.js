import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const BoardForm = ({ initialName = '', initialThumbnail = null, onSubmit, onCancel }) => {
  const [boardName, setBoardName] = useState(initialName);
  const [thumbnailPhoto, setThumbnailPhoto] = useState(initialThumbnail);

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
    if (boardName.trim() === '' || !thumbnailPhoto) {
      alert('Please fill in all fields!');
      return;
    }
    onSubmit({ name: boardName, thumbnailPhoto });
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Board Name"
        value={boardName}
        onChangeText={setBoardName}
      />
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text>{thumbnailPhoto ? 'Change Image' : 'Select Image'}</Text>
      </TouchableOpacity>
      {thumbnailPhoto && <Image source={{ uri: thumbnailPhoto }} style={styles.thumbnail} />}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: { /* Add styles */ },
  button: { /* Add styles */ },
  cancelButton: { /* Add styles */ },
  thumbnail: { /* Add styles */ },
});

export default BoardForm;
