import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
                        {task.name} - {task.isFinished ? 'done' : 'not done'}
                    </Text>
                )}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
        zIndex: 10, // Ensure the icons are above other elements
    },
    icon: {
        marginLeft: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    task: {
        fontSize: 14,
        marginTop: 5,
    },
});

export default ListCard;
