import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, TextInput, Text, Alert } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getBoardById, getTasksForList, addTaskToList, updateTask, deleteTask, updateBoard, moveTaskToAnotherList } from '../../services/dataService';
import styles from './styles';

const Tasks = ({ navigation, route }) => {
    const { list } = route.params;
    const [tasks, setTasks] = useState([]);
    const [newTaskName, setNewTaskName] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskName, setEditingTaskName] = useState('');
    const [editingBoardName, setEditingBoardName] = useState(null);
    const [boardName, setBoardName] = useState('');
    const board = getBoardById(list.boardId);

    useEffect(() => {
        const fetchedTasks = getTasksForList(list.id);
        setTasks(fetchedTasks);
        setBoardName(board.name);
    }, [list.id, board.name]);
    
    const handleAddTask = () => {
        if (newTaskName.trim() === '') {
            Alert.alert('Error', 'Please enter a task name.');
            return;
        }
        const newTask = { name: newTaskName, isFinished: false };
        const updatedTask = addTaskToList(list.id, newTask);
        setTasks((prevTasks) => [...prevTasks, updatedTask]);
        setNewTaskName('');
    };

    const toggleTaskCompletion = (taskId, currentStatus) => {
        const updatedTask = updateTask(taskId, { isFinished: !currentStatus });
        if (updatedTask) {
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
            );
        }
    };

    const startEditingTask = (taskId, currentName) => {
        setEditingTaskId(taskId);
        setEditingTaskName(currentName);
    };

    const handleMoveTask = (taskId, listId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id !== taskId
            )
        );
        moveTaskToAnotherList(taskId, listId)
    };

    const saveTaskTitle = (taskId) => {
        if (editingTaskName.trim() === '') {
            Alert.alert('Error', 'Task name cannot be empty.');
            return;
        }
        const updatedTask = updateTask(taskId, { name: editingTaskName });
        if (updatedTask) {
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
            );
            setEditingTaskId(null);
            setEditingTaskName('');
        } else {
            Alert.alert('Error', 'Failed to update task.');
        }
    };

    const handleDeleteTask = (taskId) => {
        const isDeleted = deleteTask(taskId);
        if (isDeleted) {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        }
    };

    const startEditingBoard = () => {
        setEditingBoardName(boardName);
    };

    const saveBoardName = () => {
        if (editingBoardName.trim() === '') {
            Alert.alert('Error', 'Board name cannot be empty.');
            return;
        }
        const updatedBoard = updateBoard(board.id, { name: editingBoardName });
        if (updatedBoard) {
            setBoardName(updatedBoard.name);
            setEditingBoardName(null);
        } else {
            Alert.alert('Error', 'Failed to update board.');
        }
    };

    const renderFooter = useCallback(() => (
        <View style={styles.taskContainer}>
            <CheckBox checked={false} containerStyle={styles.checkBoxContainer} />
            <TextInput
                style={styles.taskTitle}
                placeholder="Enter new task name"
                value={newTaskName}
                onChangeText={setNewTaskName}
            />
            <TouchableOpacity style={styles.addCircleButton} onPress={handleAddTask}>
                <Icon name="add" size={24} color="pink" />
            </TouchableOpacity>
        </View>
    ), [newTaskName]);

    const renderTask = ({ item: task }) => (
        <View style={styles.taskContainer}>
            <CheckBox
                checked={task.isFinished}
                onPress={() => toggleTaskCompletion(task.id, task.isFinished)}
                containerStyle={styles.checkBoxContainer}
            />
            {editingTaskId === task.id ? (
                <TextInput
                    style={styles.taskTitle}
                    value={editingTaskName}
                    onChangeText={setEditingTaskName}
                    onSubmitEditing={() => saveTaskTitle(task.id)}
                />
            ) : (
                <Text style={styles.taskTitle}>{task.name}</Text>
            )}
            <View style={styles.taskIcons}>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => startEditingTask(task.id, task.name)}
                >
                    <Icon name="edit" size={24} color="pink" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => handleDeleteTask(task.id)}
                >
                    <Icon name="delete" size={24} color="pink" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => navigation.navigate(
                        'MoveTask', 
                        {taskId: task.id, 
                        moveTask: handleMoveTask, 
                        boardId: board.id}
                        )
                    }
                >
                    <Icon name='arrow-outward' size={24} color='pink' />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            
            <View style={[styles.listContainer, { borderColor: list.color || '#000' }]}>
                <Text style={styles.listTitle}>{list.name}</Text>
            </View>
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
