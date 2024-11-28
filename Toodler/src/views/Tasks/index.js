import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text, TextInput, Image, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import ListForm from '../../components/ListForm';
import { getBoardById, getTasksForList, addTaskToList, updateTask, deleteTask } from '../../services/dataService';
import styles from './styles';

const Tasks = ({ route }) => {
    const { list } = route.params;
    const [tasks, setTasks] = useState([]);
    const [newTaskName, setNewTaskName] = useState('');
    const board = getBoardById(list.boardId);

    // Fetch tasks for the list when the component mounts
    useEffect(() => {
        const fetchedTasks = getTasksForList(list.id);
        setTasks(fetchedTasks);
    }, [list.id]);

    // Add a new task
    const handleAddTask = () => {
        if (newTaskName.trim() === '') {
            alert('Please enter a task name.');
            return;
        }

        const newTask = { name: newTaskName, isFinished: false };
        const updatedTask = addTaskToList(list.id, newTask);
        setTasks((prevTasks) => [...prevTasks, updatedTask]);
        setNewTaskName(''); // Clear the input field
    };

    // Render footer with the add container (memoized to prevent re-creation)
    const renderFooter = useCallback(() => (
        <View style={styles.taskContainer}>
            <CheckBox
                checked={false} // Non-functional checkbox for consistency
                containerStyle={styles.checkBoxContainer}
            />
            <TextInput
                style={styles.taskTitle}
                placeholder="Enter new task name"
                value={newTaskName}
                onChangeText={setNewTaskName} // Properly update state
            />
            <TouchableOpacity style={styles.addCircleButton} onPress={handleAddTask}>
                <Icon name="add" size={24} color="white" />
            </TouchableOpacity>
        </View>
    ), [newTaskName]); // Depend on `newTaskName` to avoid unnecessary re-renders

    // Toggle task completion
    const toggleTaskCompletion = (taskId, currentStatus) => {
        const updatedTask = updateTask(taskId, { isFinished: !currentStatus });
        if (updatedTask) {
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
            );
        }
    };

    // Delete a task
    const handleDeleteTask = (taskId) => {
        const isDeleted = deleteTask(taskId);
        if (isDeleted) {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        }
    };

    const handleSave = (taskData) => {
        const updatedTask = {
            id: taskId,
            ...taskData,
        };

        const savedTask = updateTask(taskId,updatedTask);

        if (savedTask) {
            modifyTask(savedTask);
        navigation.goBack();
        }
        else {
            Alert.alert('Error', 'Failed to update task');
        }
    };

    const handleModifyTask = (task) => {
        return (
            <ListForm
                onChangeText={handleSave}
                initialData= {{
                    name: task?.name || '',
                }}
            />
        );
        
    };

    // Render a single task
    const renderTask = ({ item: task }) => (
        <View style={styles.taskContainer}>
            <CheckBox
                checked={task.isFinished}
                onPress={() => toggleTaskCompletion(task.id, task.isFinished)}
                containerStyle={styles.checkBoxContainer}
                textStyle={task.isFinished && styles.taskCompleted}
            />
            <Text style={styles.taskTitle}>{task.name}</Text>
            <View style={styles.taskIcons}>
                <TouchableOpacity onPress={() => handleDeleteTask(task.id)} style={styles.icon}>
                    <Icon name="delete" size={24} color="pink" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleModifyTask(task)} 
                    style={styles.icon}
                >
                    <Icon name="edit" size={24} color="pink" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Board and List Header */}
            <View style={styles.boardHeader}>
                <Image source={{ uri: board.thumbnailPhoto }} style={styles.image} />
                <Text style={styles.boardTitle}>{board.name}</Text>
                <Text style={styles.boardDescription}>{board.description}</Text>
            </View>
            <View style={[styles.listContainer, { borderColor: list.color }]}>
                <Text style={styles.listTitle}>{list.name}</Text>
            </View>

            {/* Tasks List */}
            <FlatList
                data={tasks}
                keyExtractor={(task) => task.id.toString()}
                renderItem={renderTask}
                ListFooterComponent={renderFooter} // Footer component with add container
            />
        </View>
    );
};

export default Tasks;
