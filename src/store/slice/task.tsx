import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from 'react-native-uuid';
import { TaskData } from "../../types";
import { mockTasks } from "./mockdata";

export type TaskType = {
    data: TaskData[];
    isLoading: boolean;
    error: boolean
}

const initialState: TaskType = {
    data: mockTasks, //[],
    isLoading: false,
    error: false
};

const Task = createSlice({
    name: 'task',
    initialState: initialState,
    reducers: {
        syncTask: (_, actions) => {
            return actions.payload;
        },
        addTask: (state, actions: PayloadAction<Omit<TaskData, 'id'>>) => {
            state.data.push({
                ...actions.payload,
                id: uuid.v4(),
            })
        },
        updateTask: (state, actions: PayloadAction<TaskData>) => {
            const index = state.data.findIndex(task => task.id === actions.payload.id);

            if(index !== -1) {
                state.data[index] = {
                    ...actions.payload
                }
            }
        },
        deleteTask: (state, actions) => {
            state.data = state.data.filter(task => task.id !== actions.payload);
        }
    }
});

export const { addTask, deleteTask, syncTask, updateTask } = Task.actions
export default Task.reducer;
