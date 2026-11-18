import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native';

import Task from '../store/slice/task';
import Filters from '../store/slice/filters';
import { StoreType } from '../store';
import { TaskData } from '../types';

export const sampleTasks: TaskData[] = [
    {
        id: 't1',
        title: 'Prepare sprint demo',
        description: 'Record the filter flow',
        priority: 'high',
        dueDate: '2026-11-17',
        isCompleted: false,
    },
    {
        id: 't2',
        title: 'Renew car insurance',
        description: 'Compare quotes',
        priority: 'medium',
        dueDate: '2026-11-15',
        isCompleted: true,
    },
    {
        id: 't3',
        title: 'Book dentist appointment',
        description: 'Morning slot',
        priority: 'low',
        dueDate: '2026-11-24',
        isCompleted: false,
    },
];

export const defaultFilters: StoreType['Filters'] = {
    searchText: '',
    isCompleted: null,
    priority: null,
};

export const makeStore = (preloaded: Partial<StoreType> = {}) => configureStore({
    reducer: { Task, Filters },
    preloadedState: {
        Task: { data: sampleTasks, isLoading: false, error: false },
        Filters: defaultFilters,
        ...preloaded,
    },
});

export type TestStore = ReturnType<typeof makeStore>;

export const renderWithStore = async (ui: React.ReactElement, store: TestStore = makeStore()) => {
    const StoreProvider = ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
    );
    const result = await render(ui, { wrapper: StoreProvider });
    return { store, ...result };
};

export const makeNavigation = () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
});
