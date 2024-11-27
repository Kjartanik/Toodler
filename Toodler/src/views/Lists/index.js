import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { getListsForBoard, getTasksForList, addListToBoard, deleteList } from '../../services/dataService';
import BoardCard from '../../components/BoardCard';
import styles from './styles';

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

    const renderList = ({ item: list }) => {
        const listTasks = tasks[list.id] || [];
        return (
            <View style={styles.listContainer}>
                <TouchableOpacity
                    style={styles.listCard}
                    onPress={() => navigation.navigate('Tasks', { list })}
                >
                    <Text style={[styles.listTitle, { backgroundColor: list.color }]}>
                        {list.name}
                    </Text>
                    <FlatList
                        data={listTasks}
                        keyExtractor={(task) => task.id.toString()}
                        renderItem={({ item: task }) => (
                            <Text style={styles.task}>
                                {task.name} - {task.isFinished ? 'done' : 'not done'}
                            </Text>
                        )}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'red', marginTop: 10 }]}
                    onPress={() => handleDeleteList(list.id)}
                >
                    <Text style={styles.buttonText}>Delete List</Text>
                </TouchableOpacity>
            </View>
        );
    };

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
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    navigation.navigate('AddList', { addList: handleAddList })
                }
            >
                <Text style={styles.buttonText}>Add List</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Lists;
