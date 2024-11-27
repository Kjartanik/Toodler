import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getListsForBoard, getTasksForList } from '../services/dataService'; // Import from the service layer

const ListsAndTasks = ({ route }) => {
  const { boardId } = route.params; // Get the board ID from navigation parameters
  const [lists, setLists] = useState([]); // State to store lists

  useEffect(() => {
    const fetchedLists = getListsForBoard(boardId); // Fetch lists for the given board
    setLists(fetchedLists); // Update state with the fetched lists
  }, [boardId]); // Re-fetch lists if boardId changes

  const renderList = ({ item: list }) => {
    const tasks = getTasksForList(list.id); // Fetch tasks for this list

    return (
      // TODO: Rendera boardið með
      <View style={styles.listContainer}>
        <Text style={[styles.listTitle, { backgroundColor: list.color }]}>{list.name}</Text>
        <FlatList
          data={tasks}
          keyExtractor={(task) => task.id.toString()}
          renderItem={({ item }) => <Text style={styles.task}>{item.name}</Text>}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        keyExtractor={(list) => list.id.toString()}
        renderItem={renderList} // Use renderList to render each list
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
  listContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    color: '#fff',
  },
  task: {
    fontSize: 16,
    marginVertical: 5,
    paddingLeft: 20,
  },
});

export default ListsAndTasks;
