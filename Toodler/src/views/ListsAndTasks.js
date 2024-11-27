import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getListsForBoard, getTasksForList } from '../services/dataService'; // Import from the service layer

const ListsAndTasks = ({ route }) => {
  const { boardId } = route.params; // Get the board ID from navigation parameters
  const lists = getListsForBoard(boardId); // Fetch lists using the service

  const renderList = (list) => {
    const tasks = getTasksForList(list.id); // Fetch tasks for this list

    return (
      <View key={list.id} style={styles.listContainer}>
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
        renderItem={({ item }) => renderList(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles omitted for brevity (same as before)
});

export default ListsAndTasks;
