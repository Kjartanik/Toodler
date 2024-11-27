import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import BoardCard from '../components/BoardCard';
import { addBoard, deleteBoard, getBoardById, updateBoard, updateTask } from '../services/dataService';
import globalStyles from '../styles/globalStyles';
import data from '../resources/data.json';
import { getListsForBoard, getTasksForList } from '../services/dataService';
import { CheckBox } from 'react-native-elements'; // Use CheckBox from react-native-elements



const Tasks = ({ navigation, route }) => {
    const { list } = route.params; // Get the board object from navigation parameters
    const [tasks, setTasks] = useState([]); // State to store lists
    const board = getBoardById(list.boardId);

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

        // Toggle the `isFinished` state for a task
    const toggleTaskCompletion = (taskId, currentStatus) => {
        // Update the task in the dataService
        const updatedTask = updateTask(taskId, { isFinished: !currentStatus });
        if (updatedTask) {
            // Update the state
            setTasks(prevTasks =>
                prevTasks.map(task => (task.id === taskId ? updatedTask : task))
            );
        }
    };
    
    const renderTask = ({ item: task }) => (
        <CheckBox
            title={task.name}
            checked={task.isFinished}
            onPress={() => toggleTaskCompletion(task.id, task.isFinished)}
            containerStyle={styles.taskContainer}
            textStyle={task.isFinished && styles.taskCompleted}
        />
    );
    

    // Render tasks for list
    useEffect(() => {
        const fetchedTasks = getTasksForList(list.id)
        setTasks(fetchedTasks);
    }, [list.id]);

    return (
        <View style={styles.container}>
            <View style={styles.boardHeader}>
                <Image source={{ uri: board.thumbnailPhoto }} style={styles.image} />
                <Text style={styles.boardTitle}>{board.name}</Text>
                <Text style={styles.boardDescription}>{board.description}</Text>
            </View>
            <View style={styles.listContainer}>
                <Text style={[styles.listTitle, { backgroundColor: list.color }]}>{list.name}</Text>
            </View>
            <FlatList
                data={tasks}
                keyExtractor={(task) => task.id.toString()}
                renderItem={renderTask}
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
    
    task: {
        fontSize: 16,
        marginLeft: 10,
    },
    taskCompleted: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
});

export default Tasks;