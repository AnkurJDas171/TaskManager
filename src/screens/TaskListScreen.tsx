import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Search from '../components/Search';
import TaskList from '../components/TaskList';
import { Navigation } from '../types';
import AddNewTask from '../components/AddNewTask';



type TaskListScreenProps = {
    navigation: Navigation
}

const TaskListScreen = ({ navigation }: TaskListScreenProps) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={{ flex: 1, zIndex: 2 }}>
                <Search />
            </View>
            <View style={{ flex: 8 }}>
                <TaskList navigation={navigation} />
            </View>
            <View style={{ flex: 1 }}>
                <AddNewTask navigation={navigation}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20
    },
});

export default TaskListScreen;
