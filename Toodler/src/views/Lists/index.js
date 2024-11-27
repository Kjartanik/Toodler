import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { getListsForBoard, getTasksForList } from '../../services/dataService';
import BoardCard from '../../components/BoardCard';
import styles from './styles';

const Lists = ({ navigation, route }) => {
    const { board } = route.params; // Get the board object from navigation parameters
    const [lists, setLists] = useState([]); // State to store lists
    const [tasks, setTasks] = useState({}); // State to store tasks for each list

    // Fetch lists and tasks when the component mounts or board ID changes
    useEffect(() => {
        const fetchedLists = getListsForBoard(board.id);
        setLists(fetchedLists);

        const fetchedTasks = {};
        fetchedLists.forEach(list => {
            fetchedTasks[list.id] = getTasksForList(list.id);
        });
        setTasks(fetchedTasks);
    }, [board.id]);

    // Render each list
    const renderList = ({ item: list }) => {
        const listTasks = tasks[list.id] || []; // Retrieve tasks for the list

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
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Display the board header using BoardCard */}
            <BoardCard
                board={board}
                onDelete={() => {}}
                onModify={() =>
                    navigation.navigate('ModifyBoard', {
                        boardId: board.id,
                        currentBoardName: board.name,
                        currentBoardDescription: board.description,
                        currentThumbnailPhoto: board.thumbnailPhoto,
                        modifyBoard: (updatedBoard) => {
                            // Optional: Update lists or other local state if needed
                            setLists((prevLists) =>
                                prevLists.map((list) =>
                                    list.id === updatedBoard.id ? updatedBoard : list
                                )
                            );
                        },
                        onNavigateBack: () => navigation.navigate('Lists', { board }),
                    })
                }
                onPress={() => {}}
            />
            {/* Display the lists */}
            <FlatList
                data={lists}
                keyExtractor={(list) => list.id.toString()}
                renderItem={renderList}
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Add List</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Lists;
