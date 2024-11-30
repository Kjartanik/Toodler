import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, FlatList } from 'react-native';
import ListForm from '../../components/ListForm/index';
import { getListById, updateList, getListsForBoard } from '../../services/dataService';
import styles from './styles';
import ListCard from '../../components/ListCard/index';


const MoveTask = ({ navigation, route}) => {
    const { taskId, moveTask, boardId } = route.params;
    const [lists, setLists] = useState([])

    useEffect(() => {
        const fetchedLists = getListsForBoard(boardId) || []; // Ensure valid lists array
        setLists(fetchedLists);
    }, [boardId]);

    const renderList = ({ item: list }) => {
        return (
            <ListCard
                list={list}
                onPress={() => {
                    moveTask(taskId, list.id); 
                    navigation.goBack(); 
                }}
                hideIcons={true}
            />
        );
    };

    return (<View style={styles.container}>
        <FlatList
            data={lists}
            keyExtractor={(list) => list.id.toString()}
            renderItem={renderList}
        />
    </View>);
};

export default MoveTask;
