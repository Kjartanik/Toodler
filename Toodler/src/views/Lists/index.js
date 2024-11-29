import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { getListsForBoard, getTasksForList, addListToBoard, deleteList, updateTask, calculateProgress } from '../../services/dataService';
import ListCard from '../../components/ListCard/index';
import BoardCard from '../../components/BoardCard/index'; // Import BoardCard component
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Lists = ({ navigation, route }) => {
    const { board } = route.params; // Get board details from navigation
    const [lists, setLists] = useState([]);
    const [tasks, setTasks] = useState({}); // Map of listId to tasks array

    // Fetch lists and tasks for the board when the component mounts
    useEffect(() => {
        const fetchedLists = getListsForBoard(board.id) || []; // Ensure valid lists array
        setLists(fetchedLists);

        const fetchedTasks = {};
        fetchedLists.forEach((list) => {
            fetchedTasks[list.id] = getTasksForList(list.id) || []; // Ensure tasks array
        });
        setTasks(fetchedTasks);
    }, [board.id]);

    // Toggle task completion
    const handleToggleTask = (listId, taskId, isFinished) => {
        const updatedTask = updateTask(taskId, { isFinished: !isFinished });
        if (updatedTask) {
            setTasks((prevTasks) => ({
                ...prevTasks,
                [listId]: prevTasks[listId].map((task) =>
                    task.id === taskId ? updatedTask : task
                ),
            }));
        }
    };

    // Modify list details
    const handleModifyList = (updatedList) => {
        setLists((prevLists) =>
            prevLists.map((list) =>
                list.id === updatedList.id ? updatedList : list
            )
        );
    };
    // Delete a list
    const handleDeleteList = (listId) => {
        const isDeleted = deleteList(listId);
        if (isDeleted) {
            setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
            setTasks((prevTasks) => {
                const newTasks = { ...prevTasks };
                delete newTasks[listId];
                return newTasks;
            });
        } else {
            alert('Failed to delete the list. Please try again.');
        }
    };

    // Render a single list and its tasks
    const renderList = ({ item: list }) => {
        const listTasks = tasks[list.id] || []; // Get tasks for this list

        return (
            <ListCard
                list={list}
                tasks={listTasks}
                onModify={() =>
                    navigation.navigate('ModifyList', {listId: list.id,modifyList: handleModifyList,})
                }
                onDelete={() => handleDeleteList(list.id)}
                onToggleTask={(taskId, isFinished) => handleToggleTask(list.id, taskId, isFinished)}
                onPress={() =>
                    navigation.navigate('Tasks', { list }) // Navigate to the tasks page
                }
                progress={calculateProgress(list.id)}
            />
        );
    };



    const renderFooter = () => (
        <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddList', { addList: (newList) => {
                const addedList = addListToBoard(board.id, newList);
                setLists((prevLists) => [...prevLists, addedList]);
            }})}
        >
            <View style={styles.iconContainer}>
                <Text style={styles.description /* Note: Error {Text strings must be rendered within a <Text>} */}> 
                    <Icon name="add" size={30} color="pink" /> {/* Plus icon */} 
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Render BoardCard at the top */}
            <BoardCard
                board={board}
                hideActions={true} // Disable actions (add/modify/delete) for the board
            />
            <FlatList
                data={lists}
                keyExtractor={(list) => list.id.toString()}
                renderItem={renderList}
                ListFooterComponent={renderFooter} // Add new list button
            />
        </View>
    );
};

export default Lists;
