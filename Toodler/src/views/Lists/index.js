import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { getListsForBoard, getTasksForList, addListToBoard, deleteList, updateTask } from '../../services/dataService';
import BoardCard from '../../components/BoardCard/index';
import ListCard from '../../components/ListCard/index';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the plus icon


const Lists = ({ navigation, route }) => {
    const { board } = route.params;
    const [lists, setLists] = useState([]);
    const [tasks, setTasks] = useState({});

    // Fetch lists and tasks for the board when the component mounts
    useEffect(() => {
        const fetchedLists = getListsForBoard(board.id);
        setLists(fetchedLists);

        const fetchedTasks = {};
        fetchedLists.forEach((list) => {
            fetchedTasks[list.id] = getTasksForList(list.id);
        });
        setTasks(fetchedTasks);
    }, [board.id]);

    // Handle adding a new list
    const handleAddList = (newList) => {
        const updatedList = addListToBoard(board.id, newList); // Add the new list to the board in dataService
        setLists((prevLists) => [...prevLists, updatedList]); // Update the local state
    };

    // Handle deleting a list
    const handleDeleteList = (listId) => {
        const isDeleted = deleteList(listId);
        if (isDeleted) {
            setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
        } else {
            alert('Failed to delete the list. Please try again.');
        }
    };

    const handleModifyList = (updatedList) => {
        setLists((prevLists) =>
            prevLists.map((list) =>
                list.id === updatedList.id ? updatedList : list
            )
        );
    };

    const renderList = ({ item: list }) => {
        const listTasks = tasks[list.id] || []; // Ensure tasks are fetched for this list
    
        return (
            <ListCard
                board={board}
                list={list}
                tasks={listTasks}
                onModifyTask={(task) =>
                    navigation.navigate('ModifyTask', { task, listId: list.id })
                }
                onToggleTask={(taskId, isFinished) => {
                    const updatedTask = updateTask(taskId, { isFinished: !isFinished });
                    if (updatedTask) {
                        setTasks((prevTasks) => ({
                            ...prevTasks,
                            [list.id]: prevTasks[list.id].map((task) =>
                                task.id === taskId ? updatedTask : task
                            ),
                        }));
                    }
                }}
                onDeleteTask={(taskId) => {
                    const isDeleted = deleteTask(taskId);
                    if (isDeleted) {
                        setTasks((prevTasks) => ({
                            ...prevTasks,
                            [list.id]: prevTasks[list.id].filter((task) => task.id !== taskId),
                        }));
                    }
                }}
            />
        );
    };
        
    
    

    const renderFooter = () => (
        <View>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddList', { addList: handleAddList })}
            >
                <Text style={styles.container}>
                    <Icon name="add" size={30} color="black" /> {/* Plus icon */}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <BoardCard
                board={board}
                hideActions={true}
            />
            <FlatList
                data={lists}
                keyExtractor={(list) => list.id.toString()}
                renderItem={renderList}
                ListFooterComponent={renderFooter}
            />
            
        </View>

    );
};

export default Lists;
