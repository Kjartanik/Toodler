import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    boardHeader: {
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    boardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    boardDescription: {
        fontSize: 14,
        color: '#666',
    },
    listContainer: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 2, // Add border width
        backgroundColor: '#fff',
        borderColor: 'transparent', // Default; dynamically set in the component
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
    },
    checkBoxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
    },
    taskTitle: {
        flex: 1,
        fontSize: 15,
        color: '#000',
    },
    taskIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 10,
    },
    taskCompleted: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    // addCircleButton: {
    //     width: 40,
    //     height: 40,
    //     borderRadius: 20,
    //     backgroundColor: 'pink',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
});

export default styles;
