import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import Icon from "./Icon";
import { Navigation } from "../types";

type AddNewTaskType = {
    navigation: Navigation
}

const AddNewTask = ({navigation}: AddNewTaskType) => {
    const handlePress = () => {
        navigation.navigate('TaskFormScreen')
        // navigation.navigate('TaskFormScreen', {params: {id: '123'}})
    }

    return (
        <Pressable onPress={handlePress}>
            <View style={styles.addButton}>
                <Icon name={'add'} size={30} color={'#fff'}/>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: '#002aff',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    }
})

export default AddNewTask;

