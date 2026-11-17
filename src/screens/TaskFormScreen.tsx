import React, { useReducer } from "react";

import { Navigation, Route, TaskData } from "../types";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addTask, TaskType, updateTask } from "../store/slice/task";
import { StoreType } from "../store";

export const SHEET_DETENT = 0.8;

type TaskFormScreenType = {
    navigation: Navigation;
    route: Route
};

type FormState = Omit<TaskData, 'id'>

type FormAction = {
    [K in keyof FormState]: { type: K; payload: FormState[K] };
}[keyof FormState];

const defaultState: FormState = {
    title: "",
    description: "",
    isCompleted: false,
    priority: 'low',
    dueDate: ''
};

const reducer = (state: FormState, action: FormAction): FormState => ({
    ...state,
    [action.type]: action.payload,
});

const getData = (list: TaskType, id: string | undefined): FormState => {
    if(list.data.length === 0 && (id === '' || id === undefined)) {
        return defaultState;
    }

    const index = list.data.findIndex((item: TaskData) => {
        return item.id === id
    });
    if(index === -1) {
        return defaultState;
    }

    return list.data[index];
}

const TaskFormScreen = ({ navigation, route }: TaskFormScreenType) => {
    const { height } = useWindowDimensions();
    const storeDispatch = useDispatch();
    const params = route.params || {};

    const taskData = useSelector((state: StoreType) => {
        return getData(state.Task, params?.id)
    })
    const [state, dispatch] = useReducer(reducer, taskData);

    const handleTitleChange = (title: string) => {
        dispatch({ type: "title", payload: title });
    }

    const handleDescriptionChange = (description: string) => {
        dispatch({ type: "description", payload: description });
    }

    const handleDateChange = (dueDate: string) => {
        dispatch({ type: "dueDate", payload: dueDate });
    }

    const handlePriorityButtonPress = (priority: 'low' | 'medium' | 'high') => {
        dispatch({ type: "priority", payload: priority });
    }

    const handleSavePress = () => {
        if(state.title === '' || state.description === '' || state.dueDate === '') return;
        if(params?.id) {
            storeDispatch(updateTask({id: params.id, ...state}));
        } else {
            storeDispatch(addTask(state));
        }
        setTimeout(() => {
            navigation.goBack()
        }, 100)
    }

    return (
        <View style={[styles.container, { height: height * SHEET_DETENT }]}>
            <View style={styles.textInputContainer}>
                <TextInput
                    placeholder="Heading"
                    value={state.title}
                    onChangeText={handleTitleChange}
                    style={styles.textInput}
                />
                <TextInput
                    placeholder="Description"
                    value={state.description}
                    onChangeText={handleDescriptionChange}
                    style={[styles.textInput, styles.description]}
                    multiline={true}
                />
                <TextInput
                    placeholder="Due date"
                    value={state.dueDate}
                    onChangeText={handleDateChange}
                    style={styles.textInput}
                />
            </View>

            <View style={styles.priorityButtonContainer}>
                <Pressable onPress={() => handlePriorityButtonPress('low')}>
                    <Text
                        style={[
                            styles.priorityButton,
                            state.priority === "low" && styles.selectedPriority,
                        ]}
                    >
                        Low
                    </Text>
                </Pressable>
                <Pressable onPress={() => handlePriorityButtonPress('medium')}>
                    <Text
                        style={[
                            styles.priorityButton,
                            state.priority === "medium" && styles.selectedPriority,
                        ]}
                    >
                        Medium
                    </Text>
                </Pressable>
                <Pressable onPress={() => handlePriorityButtonPress('high')}>
                    <Text
                        style={[
                            styles.priorityButton,
                            state.priority === "high" && styles.selectedPriority,
                        ]}
                    >
                        High
                    </Text>
                </Pressable>
            </View>

            <Pressable onPress={handleSavePress}>
                <Text style={styles.saveButton}>Save</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    textInput: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#c0c0c0',
        borderRadius: 10
    },
    description: {
        marginVertical: 10,
        height: 200,
    },
    priorityButton: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: "#e2e2e2",
        color: "#424242",
        fontWeight: 600,
        borderRadius: 20,
        marginRight: 10
    },
    selectedPriority: {
        backgroundColor: "#c2dbf9",
        color: "#01316c",
    },
    priorityButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '70%', 
        marginVertical: 20
    },
    saveButton: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        fontSize: 20,
        backgroundColor: '#2457d7',
        color: '#fff',
        borderRadius: 20
    },
    textInputContainer: {
        width: '100%',
        height:'auto'
    }
});

export default TaskFormScreen;
