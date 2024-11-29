import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: 'pink',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
    icon: {
        margin: 5,
    },
    iconContainer: {
        marginTop: 10,
        alignSelf: 'center',
    },
    // addButton: {
    //     marginTop: 10,
    //     alignSelf: 'center',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: 48,
    //     height: 48,
    //     borderRadius: 24,
    //     backgroundColor: 'pink', 
    // },
});

export default styles;