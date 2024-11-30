import React, { useState, useEffect } from 'react';
import { View, Platform, KeyboardAvoidingView, FlatList, TouchableOpacity, TextInput, Text, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getBoardById, getTasksForList, addTaskToList, updateTask, deleteTask, updateBoard, moveTaskToAnotherList, calculateProgress } from '../../services/dataService';
import styles from './styles';
import * as Progress from 'react-native-progress';

const Tasks = ({ navigation, route }) => {
    const { list } = route.params;
    const [tasks, setTasks] = useState([]);
    const [newTaskName, setNewTaskName] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskName, setEditingTaskName] = useState('');
    const [editingBoardName, setEditingBoardName] = useState(null);
    const [boardName, setBoardName] = useState('');
    const board = getBoardById(list.boardId);
    const progress = calculateProgress(list.id);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const fetchedTasks = getTasksForList(list.id);
            setTasks(fetchedTasks || []);
        });

        return unsubscribe;
    }, [navigation, list.id]);

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

    const handleMoveTask = (taskId, listId) => {
        setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== taskId)
        );
        moveTaskToAnotherList(taskId, listId);
    };

    const renderTask = ({ item: task }) => (
        <View style={styles.taskContainer}>
            <CheckBox
                checked={task.isFinished}
                onPress={() => toggleTaskCompletion(task.id, task.isFinished)}
                containerStyle={styles.checkBoxContainer}
                checkedColor={'pink'}
            />
            {editingTaskId === task.id ? (
                <TextInput
                    style={styles.editTaskTitle}
                    value={editingTaskName}
                    onChangeText={(text) => setEditingTaskName(text)}
                    onSubmitEditing={() => saveTaskTitle(task.id)}
                />
            ) : (
                <Text style={styles.taskTitle}>{task.name}</Text>
            )}
            <View style={styles.taskIcons}>
                {editingTaskId === task.id ? (
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => saveTaskTitle(task.id)}
                    >
                        <Text>
                            <Icon name="check" size={24} color="pink" />
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => startEditingTask(task.id, task.name)}
                        >
                            <Text>
                                <Icon name="edit" size={24} color="pink" />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => handleDeleteTask(task.id)}
                        >
                            <Text>
                                <Icon name="delete" size={24} color="pink" />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() =>
                                navigation.navigate('MoveTask', {
                                    taskId: task.id,
                                    moveTask: handleMoveTask,
                                    boardId: board.id,
                                })
                            }
                        >
                            <Text>
                                <Icon name="arrow-outward" size={24} color="pink" />
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );

    const renderFooter = () => (
        <View style={styles.taskContainer}>
            <CheckBox
                checked={false}
                containerStyle={styles.checkBoxContainer}
                checkedColor='pink'
            />
            <TextInput
                style={styles.taskTitle}
                placeholder="Enter new task name"
                value={newTaskName}
                onChangeText={(text) => setNewTaskName(text)}
            />
            
            <TouchableOpacity style={styles.addCircleButton} onPress={handleAddTask}>
                <Text>
                    <Icon name="add" size={24} color="pink" />
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 300 : 0}
        >            
            <View style={[styles.listContainer, { borderColor: list.color || '#000' }]}>
                <Text style={styles.listTitle}>{list.name}</Text>
                <Text>
                    <Progress.Bar progress={progress} width={150} height={10} color={'pink'} /> {(Math.floor(progress * 100)).toString()}% done
                </Text>
            </View>
            <View style={styles.taskContainer}>
                <FlatList
                    data={tasks.filter((task) => task && task.id)}
                    keyExtractor={(task) => task.id.toString()}
                    renderItem={renderTask}
                />
            </View>
            <View style={styles.addTaskContainer}>
                {renderFooter()};
            </View>
        </KeyboardAvoidingView>
    );
};

export default Tasks;
