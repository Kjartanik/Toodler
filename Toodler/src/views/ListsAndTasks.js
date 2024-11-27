import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { getListsForBoard, getTasksForList } from '../services/dataService';
import BoardCard from '../components/BoardCard';

const ListsAndTasks = ({ navigation, route }) => {
    const { board } = route.params; // Get the board object from navigation parameters
    const [lists, setLists] = useState([]); // State to store lists
    const [tasks, setTasks] = useState({}); // State to store tasks for each list

    // Fetch lists when the component mounts or board ID changes
    useEffect(() => {
        const fetchedLists = getListsForBoard(board.id); // Fetch lists for the given board
        setLists(fetchedLists); // Update state with the fetched lists

        // Initialize tasks state for each list
        const fetchedTasks = {};
        fetchedLists.forEach(list => {
            fetchedTasks[list.id] = getTasksForList(list.id);
        });
        setTasks(fetchedTasks);
    }, [board.id]);

     // Render each list with its tasks
     const renderList = ({ item: list }) => {
    
        const tasks = getTasksForList(list.id); // Fetch tasks for this list
        

        return (
            <View style={styles.listContainer}>
                    <TouchableOpacity
            key={board.id}
            style={styles.boardCard}
            onPress={() => navigation.navigate('Tasks', { list })}
        >
                <Text style={[styles.listTitle, { backgroundColor: list.color }]}>{list.name}</Text>
                <FlatList
                    data={tasks}
                    keyExtractor={(task) => task.id.toString()}
                    renderItem={({ item: task }) => (
                        <Text style={styles.task}>
                            {task.name} - {task.isFinished ? 'done' : 'not done'} {/* TODO: uppfæra þetta þegar ýtt á checkbox í Tasks.js eða hægt að checka hér líka? */}
                        </Text>
                    )}
                />
                </TouchableOpacity>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            {/* Use BoardCard to display the board */}
            <BoardCard
                board={board}
                onDelete={() => {} /* No delete here */}
                onModify={() => {} /* No modify here */}
                onPress={() => {} /* No navigation from here */}
            />

            {/* Render the lists and tasks */}
            <FlatList
                data={lists}
                keyExtractor={(list) => list.id.toString()}
                renderItem={renderList} // Use renderList to render each list
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Add list</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    button: {
        backgroundColor: 'grey',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
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

export default ListsAndTasks;
