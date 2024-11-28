import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
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
    addButton: {
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'pink', // Background color for the button
    },
});

export default styles;