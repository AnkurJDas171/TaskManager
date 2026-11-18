import React from 'react';
import { screen, userEvent } from '@testing-library/react-native';

import Task from '../Task';
import { makeNavigation, renderWithStore, sampleTasks } from '../../test/utils';

describe('Task', () => {
    test('task details should be visible', async () => {
        await renderWithStore(<Task {...sampleTasks[0]} navigation={makeNavigation()} />);

        expect(screen.getByText('Prepare sprint demo')).toBeOnTheScreen();
        expect(screen.getByText('Record the filter flow')).toBeOnTheScreen();
        expect(screen.getByText('high')).toBeOnTheScreen();
        expect(screen.getByText('2026-11-17')).toBeOnTheScreen();
        expect(screen.getByText('pending')).toBeOnTheScreen();
        expect(screen.getByRole('checkbox', { name: 'Prepare sprint demo' })).not.toBeChecked();
    });

    test('should be able to press check box to mark as complete', async () => {
        const user = userEvent.setup();
        const { store } = await renderWithStore(<Task {...sampleTasks[0]} navigation={makeNavigation()} />);

        await user.press(screen.getByRole('checkbox', { name: 'Prepare sprint demo' }));

        expect(store.getState().Task.data.find(task => task.id === 't1')?.isCompleted).toBe(true);
    });

    test('Should be able to uncheck a completed task', async () => {
        const user = userEvent.setup();
        const { store } = await renderWithStore(<Task {...sampleTasks[1]} navigation={makeNavigation()} />);

        expect(screen.getByRole('checkbox', { name: 'Renew car insurance' })).toBeChecked();
        await user.press(screen.getByRole('checkbox', { name: 'Renew car insurance' }));

        expect(store.getState().Task.data.find(task => task.id === 't2')?.isCompleted).toBe(false);
    });

    test('Should be able to delete a task from menu', async () => {
        const user = userEvent.setup();
        const { store } = await renderWithStore(<Task {...sampleTasks[0]} navigation={makeNavigation()} />);

        await user.press(screen.getByRole('button', { name: 'Task options' }));
        await user.press(screen.getByText('Delete'));

        expect(store.getState().Task.data.map(task => task.id)).toEqual(['t2', 't3']);
    });

    test('should be able to open edit task from menu', async () => {
        jest.useFakeTimers();
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const navigation = makeNavigation();
        await renderWithStore(<Task {...sampleTasks[0]} navigation={navigation} />);

        await user.press(screen.getByRole('button', { name: 'Task options' }));
        await user.press(screen.getByText('Edit'));
        jest.runOnlyPendingTimers();

        expect(navigation.navigate).toHaveBeenCalledWith('TaskFormScreen', { id: 't1' });
        jest.useRealTimers();
    });
});
