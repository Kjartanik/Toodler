import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 2, // Increase border width for better visibility
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    iconContainer: {
        position: 'absolute', // Position icons in the top-right corner
        right: 5,
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 10, // Spacing between icons
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333', // Dark color for better readability
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    checkBoxContainer: {
        margin: 0,
        padding: 0,
    },
    taskTitle: {
        flex: 1,
        fontSize: 14,
        marginLeft: 10,
    },
    // taskCompleted: {
    //     color: '#aaa',
    // },
    description: {
        marginTop: 5,
        fontSize: 10,
    },
});

export default styles;
