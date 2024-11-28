import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements';
import styles from './styles';

const ListCard = ({ board, list, tasks, onModifyTask, onToggleTask, onDeleteTask }) => {
    const renderTask = ({ item: task }) => (
        <View style={styles.taskContainer}>
            <CheckBox
                checked={task.isFinished}
                onPress={() => onToggleTask(task.id, task.isFinished)}
                containerStyle={styles.checkBoxContainer}
                textStyle={task.isFinished && styles.taskCompleted}
            />
            <Text style={styles.taskTitle}>{task.name}</Text>
            <View style={styles.taskIcons}>
                <TouchableOpacity onPress={() => onModifyTask(task)} style={styles.icon}>
                    <Icon name="edit" size={24} color="pink" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDeleteTask(task.id)} style={styles.icon}>
                    <Icon name="delete" size={24} color="pink" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.card}>
            <Text style={styles.boardTitle}>{board.name}</Text>
            <Text style={styles.listTitle}>{list.name}</Text>
            <FlatList
                data={tasks}
                keyExtractor={(task) => task.id.toString()}
                renderItem={renderTask}
            />
        </View>
    );
};


export default ListCard;
