import {StyleSheet} from 'react-native';

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
    listContainer: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        color: '#fff',
    },
    task: {
        fontSize: 16,
        marginVertical: 5,
        paddingLeft: 20,
    },
    boardDescription: {
        fontSize: 15,
    },
    button: {
        marginTop: 5,
        padding: 10,
        width: 100,
        backgroundColor: 'pink',
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export default styles;