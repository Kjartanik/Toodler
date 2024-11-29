import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
        zIndex: 10, // Ensure the icons are above other elements
    },
    icon: {
        marginLeft: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    task: {
        fontSize: 14,
        marginTop: 5,
    },
});

export default styles;
