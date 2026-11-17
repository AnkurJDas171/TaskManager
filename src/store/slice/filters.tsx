import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FiltersType = {
    searchText: string;
    isCompleted: boolean | null;
    priority: 'low' | 'medium' | 'high' | null
}

const initialState: FiltersType = {
    searchText: '',
    isCompleted: null,
    priority: null
};

const Filters = createSlice({
    name: 'task',
    initialState: initialState,
    reducers: {
        updateFilter: (state, actions: PayloadAction<Partial<FiltersType>>) => {
            return {
                ...state,
                ...actions.payload
            }
        }
    }
});

export const { updateFilter } = Filters.actions
export default Filters.reducer;
