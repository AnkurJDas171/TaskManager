import React, { useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from './Icon';
import FilterMenu from './FilterMenu';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../store/slice/filters';

const Search = () => {
    const dispatch = useDispatch();
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleChange = (text: string) => {
        if(timerRef.current !== null) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            dispatch(updateFilter({searchText: text}))
        }, 250);
    }

    return (
        <View style={styles.container}>
            <Icon name={'search'} size={22}/>
            <TextInput
                placeholder='Search'
                placeholderTextColor={'#000'}
                onChangeText={handleChange}
                style={{width: 'auto', flexGrow: 1, marginLeft: 10}}
            />
            <FilterMenu />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderColor: '#787878',
        borderRadius: 20,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '100%'
    }
})

export default Search;
