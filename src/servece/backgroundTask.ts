import { useEffect } from 'react';
import { AppState } from 'react-native';
import { useStore } from 'react-redux';
import { useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';

import { TaskData } from '../types';
import { StoreType } from '../store';

type TaskRow = Omit<TaskData, 'isCompleted'> & { isCompleted: number };

const SYNC_DELAY_MS = 500;

export const loadTasks = async (db: SQLiteDatabase): Promise<TaskData[]> => {
    const rows = await db.getAllAsync<TaskRow>(
        'SELECT id, title, description, priority, dueDate, isCompleted FROM tasks'
    );

    return rows.map(row => ({ ...row, isCompleted: row.isCompleted === 1 }));
}

export const saveTasks = async (db: SQLiteDatabase, tasks: TaskData[]) => {
    await db.withExclusiveTransactionAsync(async txn => {
        await txn.runAsync('DELETE FROM tasks');

        const statement = await txn.prepareAsync(
            'INSERT INTO tasks (id, title, description, priority, dueDate, isCompleted) VALUES ($id, $title, $description, $priority, $dueDate, $isCompleted)'
        );

        try {
            for (const task of tasks) {
                await statement.executeAsync({
                    $id: task.id,
                    $title: task.title,
                    $description: task.description,
                    $priority: task.priority,
                    $dueDate: task.dueDate,
                    $isCompleted: task.isCompleted ? 1 : 0,
                });
            }
        } finally {
            await statement.finalizeAsync();
        }
    });
}

export const useTaskSync = () => {
    const db = useSQLiteContext();
    const store = useStore<StoreType>();

    useEffect(() => {
        let lastSaved = store.getState().Task.data;
        let timer: ReturnType<typeof setTimeout> | undefined;
        let pending = Promise.resolve();

        const flush = () => {
            clearTimeout(timer);
            timer = undefined;

            const tasks = store.getState().Task.data;
            if (tasks === lastSaved) return;
            lastSaved = tasks;

            pending = pending
                .then(() => saveTasks(db, tasks))
                .catch(error => console.error('Failed to save tasks', error));
        };

        const unsubscribe = store.subscribe(() => {
            if (store.getState().Task.data === lastSaved) return;
            clearTimeout(timer);
            timer = setTimeout(flush, SYNC_DELAY_MS);
        });

        const appStateListener = AppState.addEventListener('change', nextState => {
            if (nextState !== 'active') flush();
        });

        return () => {
            clearTimeout(timer);
            unsubscribe();
            appStateListener.remove();
        };
    }, [db, store]);
}

export const TaskSync = () => {
    useTaskSync();
    return null;
}
