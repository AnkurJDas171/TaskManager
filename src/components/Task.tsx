import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Navigation, TaskData } from '../types';
import EllipsisMenu from './EllipsisMenu';
import { updateTask } from '../store/slice/task';
import Icon from './Icon';

type TaskProps = TaskData & {
    navigation: Navigation
}

const Task = ({ id, title, description, priority, dueDate, isCompleted, navigation }: TaskProps) => {
    const dispatch = useDispatch();
    const handlePress = () => {
        dispatch(updateTask({
            id, 
            title, 
            description, 
            priority, 
            dueDate, 
            isCompleted: !isCompleted
        }))
    }

    return (
        <View style={styles.container}>
            <Pressable 
                onPressOut={handlePress}
                style={styles.radioButtonContainer}
            >
                <View 
                    style={[
                        styles.radioButton,
                        isCompleted && styles.radioButtonChecked
                    ]}
                >
                    {isCompleted && <Icon name={'check'} size={15} color={'#fff'}/>}
                </View>
            </Pressable>
            <View style={styles.taskDetailsContainer}>
                <View>
                    <Text 
                        style={[
                            styles.heading,
                            isCompleted && styles.textLineThrough
                        ]}
                    >{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
                <View style={styles.metaData}>
                    <Text 
                        style={[
                            styles.metaDataText,
                            priority === 'low' && styles.priorityLow,
                            priority === 'high' && styles.priorityHigh,
                            priority === 'medium' && styles.priorityMedium
                        ]}
                    >{priority}</Text>
                    <Text style={[styles.metaDataText]}>{dueDate}</Text>
                    <Text 
                        style={[
                            styles.metaDataText,
                            isCompleted ? styles.completed : styles.pending
                        ]}
                    >{isCompleted ? 'Completed' : 'pending'}</Text>
                </View>
            </View>
            <EllipsisMenu 
                id={id}
                navigation={navigation}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#c9c9c9',
        borderRadius: 20,
        padding: 15,
        width: '100%',
        marginVertical: 10
    },
    completed: {
        color: '#005219',
        backgroundColor: '#cff8d8',
        borderRadius: 20
    },
    pending: {
        color: '#353535',
        backgroundColor: '#dedede',
        borderRadius: 20
    },
    description: {
        fontSize: 16,
        color: '#4e4e4e',
        marginVertical: 10,
    }, 
    heading: {
        fontSize: 20,
        color: '#000',
        fontWeight: 600,
        textTransform: 'capitalize'
    },
    metaData: {
        flexDirection: 'row',
        textTransform: 'capitalize'
    },
    metaDataText: {
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 15,
        color: '#4e4e4e',
        fontWeight: 600,
        textTransform: 'capitalize'
    },
    priorityLow: {
        color: '#353535',
        backgroundColor: '#bebebe'
    },
    priorityMedium: {
        color: '#9d8b00',
        backgroundColor: '#ebedc6'
    },
    priorityHigh: {
        color: '#cf6202',
        backgroundColor: '#ffd8ba'
    },
    radioButton: {
        width: 20,
        height: 20,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 20
    },
    radioButtonChecked: {
        backgroundColor: '#2a0fd7',
        justifyContent: 'center',
        alignItems: 'center'
    },
    radioButtonContainer: {
        width: '10%'
    },
    taskDetailsContainer: {
        width: '80%'
    },
    textLineThrough: {
        textDecorationLine: 'line-through'
    },
    verticalMenu: {
        alignItems: 'flex-end',
        width: '10%'
    }
})

export default Task;
