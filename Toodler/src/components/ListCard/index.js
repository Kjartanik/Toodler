import React from 'react';
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
            <FlatList
                data={tasks}
                keyExtractor={(task) => task.id.toString()}
                renderItem={({ item: task }) => (
                    <Text style={styles.task}>
                        {`${task.name} - ${task.isFinished ? 'done' : 'not done'}`}
                    </Text>
                )}
            />

        </TouchableOpacity>
    );
};

export default ListCard;
