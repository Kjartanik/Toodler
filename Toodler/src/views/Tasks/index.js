import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text, TextInput, Image, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { getBoardById, getTasksForList, addTaskToList, updateTask, deleteTask } from '../../services/dataService';
import styles from './styles';

const Tasks = ({ route }) => {
    const { list } = route.params;
    const [tasks, setTasks] = useState([]);
    const [newTaskName, setNewTaskName] = useState('');
    const board = getBoardById(list.boardId);

    const [editingTaskId, setEditingTaskId] = useState(null); // Track the task being edited
    const [editingTaskName, setEditingTaskName] = useState(''); // Track the new name during editing

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

    const startEditingTask = (taskId, currentName) => {
        setEditingTaskId(taskId); // Set the task being edited
        setEditingTaskName(currentName); // Initialize the input field with the current task name
    };

    const saveTaskTitle = (taskId) => {
        if (editingTaskName.trim() === '') {
            alert('Task name cannot be empty.');
            return;
        }

        const updatedTask = updateTask(taskId, { name: editingTaskName });
        if (updatedTask) {
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
            );
            setEditingTaskId(null); // Exit editing mode
            setEditingTaskName(''); // Clear the input field
        } else {
            alert('Failed to update task.');
        }
    };

    const toggleTaskCompletion = (taskId, currentStatus) => {
        const updatedTask = updateTask(taskId, { isFinished: !currentStatus });
        if (updatedTask) {
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
            );
        }
    };

    const handleDeleteTask = (taskId) => {
        const isDeleted = deleteTask(taskId);
        if (isDeleted) {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        }
    };

    const renderTask = ({ item: task }) => (
        <ListCard
            board={board}
            list={list}
            tasks={[task]} // Pass the task as a single-item array
            onModifyTask={(task) => startEditingTask(task.id, task.name)}
            onToggleTask={(taskId, isFinished) => toggleTaskCompletion(taskId, isFinished)}
            onDeleteTask={(taskId) => handleDeleteTask(taskId)}
        />
    );
    
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
    ), [newTaskName]);

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
                ListFooterComponent={renderFooter}
            />
        </View>
    );
};

export default Tasks;
