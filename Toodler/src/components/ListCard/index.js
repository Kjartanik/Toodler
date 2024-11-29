import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements';
import styles from './styles';
import * as Progress from 'react-native-progress'

const ListCard = ({ list, tasks, onModify, onDelete, onToggleTask, onPress, progress, hideIcons=false }) => {
    const renderTask = ({ item: task }) => (
        <View style={styles.taskContainer}>
            <CheckBox
                checked={task.isFinished}
                onPress={() => onToggleTask(task.id, task.isFinished)}
                containerStyle={styles.checkBoxContainer}
                checkedColor='pink'
            />
            <Text style={[styles.taskTitle, task.isFinished && styles.taskCompleted]}>
                {task.name}
            </Text>
        </View>
    );

    return (
        <TouchableOpacity
            style={[styles.card, { borderColor: list.color || '#000' }]} // Default to black if no color is specified
            onPress={onPress}
        >
            <View style={styles.header}>
                <Text style={styles.listTitle}>{list.name}</Text> 

                {!hideIcons && ( // Conditionally render the trashcan icon
                <View>
                    <Text>
                        <Progress.Bar progress={progress} width={150} height={10} color={'pink'} />  {(Math.floor(progress * 100)).toString()}% done
                    </Text>
                        <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={onModify} style={styles.icon}>
                            <Text style={styles.description}>
                            <Icon name="edit" size={24} color="pink" />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onDelete} style={styles.icon}>
                            <Text style={styles.description}>
                            <Icon name="delete" size={24} color="pink" />
                            </Text>

                        </TouchableOpacity>
                    </View>
                </View>
                )}
                
            </View>
            <FlatList
                data={tasks}
                keyExtractor={(task) => task.id.toString()}
                renderItem={renderTask}
            />
        </TouchableOpacity>
    );
};

export default ListCard;
