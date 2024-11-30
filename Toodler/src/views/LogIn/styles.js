import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    signUpContainer: {
        borderColor: 'pink',
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
        marginTop: 50,
    },
    button: {
        backgroundColor: 'pink',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '30%',
        marginTop: 50,
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
    },
    text: {
        fontSize: 14,
    },

});

export default styles;
