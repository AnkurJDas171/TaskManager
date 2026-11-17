import { configureStore } from "@reduxjs/toolkit";
import Task, { TaskType } from "./slice/task";
import Filters, { FiltersType } from "./slice/filters";

export type StoreType = {
    Task: TaskType;
    Filters: FiltersType
}


const store = configureStore({
    reducer: {
        Task,
        Filters
    }
});

export default store;