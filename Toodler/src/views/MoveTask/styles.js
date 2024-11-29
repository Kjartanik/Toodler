import { StyleSheet } from 'react-native';


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
  

export default styles;