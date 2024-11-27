import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { getListsForBoard, getTasksForList } from '../services/dataService';

const ListsAndTasks = ({ route }) => {
    const { board } = route.params; // Get the board object from navigation parameters
    const [lists, setLists] = useState([]); // State to store lists

    // Fetch lists when the component mounts or board ID changes
    useEffect(() => {
        const fetchedLists = getListsForBoard(board.id); // Fetch lists for the given board
        setLists(fetchedLists); // Update state with the fetched lists
    }, [board.id]);

    // Render the board details
    const renderBoard = () => (
        <View style={styles.boardHeader}>
            <Image source={{ uri: board.thumbnailPhoto }} style={styles.image} />
            <Text style={styles.boardTitle}>{board.name}</Text>
        </View>
    );

    // Render each list with its tasks
    const renderList = ({ item: list }) => {
        const tasks = getTasksForList(list.id); // Fetch tasks for this list

        return (
            <View style={styles.listContainer}>
                <Text style={[styles.listTitle, { backgroundColor: list.color }]}>{list.name}</Text>
                <FlatList
                    data={tasks}
                    keyExtractor={(task) => task.id.toString()}
                    renderItem={({ item }) => <Text style={styles.task}>{item.name}</Text>}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Render the board details */}
            {renderBoard()}

            {/* Render the lists and tasks */}
            <FlatList
                data={lists}
                keyExtractor={(list) => list.id.toString()}
                renderItem={renderList} // Use renderList to render each list
            />
        </View>
    );
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
});

export default ListsAndTasks;
