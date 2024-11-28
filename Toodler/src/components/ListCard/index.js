import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles.js'

const ListCard = ({ list, tasks, onDelete, onModify, onPress }) => {
    const toggleTaskCompletion = (taskId, currentStatus) => {
        // Toggle the task's completion state
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].isFinished = !currentStatus;
        }
    };

    const renderTask = ({ item: task }) => (
        <View style={styles.taskContainer}>
            <CheckBox
                checked={task.isFinished}
                onPress={() => toggleTaskCompletion(task.id, task.isFinished)}
                containerStyle={styles.checkBoxContainer}
                textStyle={task.isFinished && styles.taskCompleted}
            />
            <Text style={styles.taskTitle}>{task.name}</Text>
        </View>
    );

    return (
        <TouchableOpacity
            style={[styles.card, { borderColor: list.color }]}
            onPress={onPress} // Navigate to another screen
        >
            <View style={{ position: 'relative' }}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={(e) => {
                            e.stopPropagation(); // Prevent event propagation
                            onDelete();
                        }}
                    >
                        <Icon name="delete" size={24} color="pink" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={(e) => {
                            e.stopPropagation(); // Prevent event propagation
                            onModify();
                        }}
                    >
                        <Icon name="edit" size={24} color="pink" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* List title */}
            <Text style={styles.title}>{list.name}</Text>

            {/* Task list */}
            <FlatList
                data={tasks}
                keyExtractor={(task) => task.id.toString()}
                renderItem={renderTask}
            />
        </TouchableOpacity>
    );
};



export default ListCard;
