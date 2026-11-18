import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from './Icon';
import { Navigation } from '../types';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../store/slice/task';

type EllipsisMenuProps = {
    id: string,
    navigation: Navigation
}

const EllipsisMenu = ({id, navigation}: EllipsisMenuProps) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsOpen(prev => !prev);
    }

    const handleEdit = () => {
        setIsOpen(false);
        setTimeout(() => {
            navigation.navigate('TaskFormScreen', { id })
        }, 100);
    }

    const handleDelete = () => {
        dispatch(deleteTask(id));
    }

    return (
        <View style={styles.container}>
            <Pressable
                onPress={handleToggleMenu}
                style={styles.verticalMenu}
                role="button"
                aria-label="Task options"
                aria-expanded={isOpen}
            >
                <Icon name={'ellipsis-menu'} size={22}/>
            </Pressable>
            {isOpen && (
                <View style={styles.menu}>
                    <Pressable onPress={handleEdit} style={styles.menuItem}>
                        <Icon name={'edit'} size={16} color={'#000'}/>
                        <Text style={styles.menuText}>Edit</Text>
                    </Pressable>
                    <Pressable onPress={handleDelete} style={styles.menuItem}>
                        <Icon name={'trash'} size={16} color={'#cf0202'}/>
                        <Text style={[styles.menuText, styles.deleteText]}>Delete</Text>
                    </Pressable>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '10%',
        zIndex: 1
    },
    verticalMenu: {
        alignItems: 'flex-end'
    },
    menu: {
        position: 'absolute',
        top: 28,
        right: 0,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#c9c9c9',
        borderRadius: 10,
        paddingVertical: 5,
        minWidth: 120,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 }
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    menuText: {
        fontSize: 16,
        color: '#000'
    },
    deleteText: {
        color: '#cf0202'
    }
})

export default EllipsisMenu;
