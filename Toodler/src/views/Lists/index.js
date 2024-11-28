import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { getListsForBoard, getTasksForList, addListToBoard, deleteList } from '../../services/dataService';
import BoardCard from '../../components/BoardCard';
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
    const renderList = ({ item: list }) => {
        const listTasks = tasks[list.id] || [];
    
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Tasks', { list })} // Navigate to Tasks screen
                style={[styles.listContainer, { borderColor: list.color }]} // Add border color dynamically
            >
                {/* Icons in the top-right corner */}
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        onPress={() => handleDeleteList(list.id)}
                        style={styles.icon}
                    >
                        <Icon name="delete" size={24} color="pink" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ModifyList', { list })}
                        style={styles.icon}
                    >
                        <Icon name="edit" size={24} color="pink" />
                    </TouchableOpacity>
                </View>
    
                {/* List title */}
                <Text style={styles.listTitle}>
                    {list.name}
                </Text>
    
                {/* List of tasks */}
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
        );
    };
    
    

    const renderFooter = () => (
        <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddList', { addList: handleAddList })}
        >
            <Icon name="add" size={30} color="black" /> {/* Plus icon */}
        </TouchableOpacity>
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
