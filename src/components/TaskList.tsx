import React from  'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import Task from './Task';
import { StoreType } from '../store';
import { Navigation, TaskData } from '../types';
import useFilteredList from '../hooks/useFilteredList';

type TaskListProps = {
    navigation: Navigation
}

const TaskList = ({ navigation }: TaskListProps) => {
    const listData = useSelector((state: StoreType) => state.Task);
    const filters = useSelector((state: StoreType) => state.Filters);
    const filteredData = useFilteredList(listData.data, filters);


    const renderComponent = ({item}: {item: TaskData}) => {
        return (
            <Task
                id={item.id}
                title={item.title}
                description={item.description}
                priority={item.priority}
                dueDate={item.dueDate}
                isCompleted={item.isCompleted}
                navigation={navigation}
            />
        )
    }

    return (
        <FlatList
            data={filteredData}
            keyExtractor={item => item.id}
            renderItem={renderComponent}
            style={styles.list}
        />
    )
}

const styles = StyleSheet.create({
    list: {}
})

export default TaskList;
