import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Icon from './Icon';
import { StoreType } from '../store';
import { FiltersType, updateFilter } from '../store/slice/filters';

type FilterOption = {
    label: string,
    filter: Partial<FiltersType>
}

const PRIORITY_OPTIONS: FilterOption[] = [
    { label: 'Low', filter: { priority: 'low' } },
    { label: 'Medium', filter: { priority: 'medium' } },
    { label: 'High', filter: { priority: 'high' } }
];

const STATUS_OPTIONS: FilterOption[] = [
    { label: 'Pending', filter: { isCompleted: false } },
    { label: 'Completed', filter: { isCompleted: true } }
];

const FilterMenu = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state: StoreType) => state.Filters);
    const [isOpen, setIsOpen] = useState(false);

    const isSelected = ({ filter }: FilterOption) => {
        if(filter.priority !== undefined) return filters.priority === filter.priority;
        return filters.isCompleted === filter.isCompleted;
    }

    const handleSelect = (option: FilterOption) => {
        if(!isSelected(option)) {
            dispatch(updateFilter(option.filter));
        } else if(option.filter.priority !== undefined) {
            dispatch(updateFilter({ priority: null }));
        } else {
            dispatch(updateFilter({ isCompleted: null }));
        }
    }

    const renderOption = (option: FilterOption) => {
        const selected = isSelected(option);
        return (
            <Pressable
                key={option.label}
                onPress={() => handleSelect(option)}
                style={[styles.menuItem, selected && styles.menuItemSelected]}
            >
                <Text style={[styles.menuText, selected && styles.menuTextSelected]}>{option.label}</Text>
                {selected && <Icon name={'check'} size={16} color={'#2a0fd7'}/>}
            </Pressable>
        )
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={() => setIsOpen(prev => !prev)} hitSlop={10}>
                <Icon name={'menu'} size={22}/>
            </Pressable>
            {isOpen && (
                <View style={styles.menu}>
                    <Text style={styles.groupHeading}>Priority</Text>
                    {PRIORITY_OPTIONS.map(renderOption)}
                    <View style={styles.divider}/>
                    <Text style={styles.groupHeading}>Status</Text>
                    {STATUS_OPTIONS.map(renderOption)}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        zIndex: 1
    },
    menu: {
        position: 'absolute',
        top: 32,
        right: -10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#c9c9c9',
        borderRadius: 10,
        paddingVertical: 5,
        minWidth: 160,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 }
    },
    groupHeading: {
        fontSize: 12,
        fontWeight: 600,
        color: '#787878',
        textTransform: 'uppercase',
        paddingHorizontal: 15,
        paddingTop: 8,
        paddingBottom: 4
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    menuItemSelected: {
        backgroundColor: '#eeebff'
    },
    menuText: {
        fontSize: 16,
        color: '#000'
    },
    menuTextSelected: {
        color: '#2a0fd7',
        fontWeight: 600
    },
    divider: {
        height: 1,
        backgroundColor: '#e4e4e4',
        marginVertical: 5
    }
})

export default FilterMenu;
