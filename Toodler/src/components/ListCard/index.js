import React from 'react';
<<<<<<< HEAD
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
=======
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles'

const ListCard = ({ list, tasks, onDelete, onModify, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.card, { borderColor: list.color }]}
            onPress={onPress} // Navigate to Tasks screen
        >
            {/* Icons in the top-right corner */}
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

            {/* List of tasks */}
>>>>>>> parent of 4f57701 (chek boxes lists)
            <FlatList
                data={tasks}
                keyExtractor={(task) => task.id.toString()}
                renderItem={({ item: task }) => (
                    <Text style={styles.task}>
                        {`${task.name} - ${task.isFinished ? 'done' : 'not done'}`}
                    </Text>
                )}
            />
<<<<<<< HEAD
        </View>
    );
};


=======

        </TouchableOpacity>
    );
};

>>>>>>> parent of 4f57701 (chek boxes lists)
export default ListCard;
