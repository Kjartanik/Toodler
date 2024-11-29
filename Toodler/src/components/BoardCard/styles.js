import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        borderWidth: 2,
        borderColor:  "#dddddd",
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    trashIcon: {
        padding: 5,
    },
    title: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        marginTop: 5,
        fontSize: 10,
    },
    button: {
        marginTop: 5,
        padding: 10,
        backgroundColor: 'pink',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconContainer: {
        position: 'absolute', // Position icons in the top-right corner
        top: 10,
        right: 10,
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 10, // Spacing between icons
    },
});

export default styles;
