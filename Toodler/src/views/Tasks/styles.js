import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    boardHeader: {
        marginBottom: 20,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    boardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    boardDescription: {
        fontSize: 15,
    },
    listContainer: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    taskContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    taskCompleted: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
});

export default styles;
