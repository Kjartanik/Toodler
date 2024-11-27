import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import BoardCard from '../components/boardCard';
import { addBoard, deleteBoard, getBoardById, updateBoard } from '../services/dataService';
import globalStyles from '../styles/globalStyles';
import data from '../resources/data.json';
import { getListsForBoard, getTasksForList } from '../services/dataService';


const Tasks = ({ navigation, route }) => {
    const { list } = route.params; // Get the board object from navigation parameters
    const [lists, setLists] = useState([]); // State to store lists
    const board = getBoardById(list.boardId);

    //     // Fetch lists when the component mounts or board ID changes
    // useEffect(() => {
    //         const fetchedLists = getListsForBoard(board.id); // Fetch lists for the given board
    //         setLists(fetchedLists); // Update state with the fetched lists
    //     }, [board.id]);

    // Render the board details
    const renderBoard = () => (
        <View style={styles.boardHeader}>
            <Image source={{ uri: board.thumbnailPhoto }} style={styles.image} />
            <Text style={styles.boardTitle}>{board.name}</Text>
            <Text style={styles.boardDescription}>{board.description}</Text>
        </View>
    );

    const renderList = () => (
        
        <View style={styles.listContainer}>
            <Text style={[styles.listTitle, { backgroundColor: list.color }]}>{list.name}</Text>

        </View>
    );


    return (
        <View style={styles.container}>
        {/* Render the board details */}
        {renderBoard()}
        {renderList()}
        </View>
    )

    
};

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
});


export default Tasks;
