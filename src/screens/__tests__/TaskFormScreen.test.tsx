import React from 'react';
import { act, screen, userEvent } from '@testing-library/react-native';

import TaskFormScreen from '../TaskFormScreen';
import { makeNavigation, makeStore, renderWithStore, sampleTasks } from '../../test/utils';

describe('TaskFormScreen', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('creates a new task and closes the form', async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const navigation = makeNavigation();
        const { store } = await renderWithStore(
            <TaskFormScreen navigation={navigation} route={{}} />,
            makeStore({ Task: { data: [], isLoading: false, error: false } })
        );

        await user.type(screen.getByPlaceholderText('Heading'), 'Write tests');
        await user.type(screen.getByPlaceholderText('Description'), 'Cover the reducers');
        await user.type(screen.getByPlaceholderText('Due date'), '2026-12-01');
        await user.press(screen.getByText('High'));
        await user.press(screen.getByText('Save'));
        await act(() => jest.runOnlyPendingTimers());

        expect(store.getState().Task.data).toEqual([
            {
                id: expect.any(String),
                title: 'Write tests',
                description: 'Cover the reducers',
                dueDate: '2026-12-01',
                priority: 'high',
                isCompleted: false,
            },
        ]);
        expect(navigation.goBack).toHaveBeenCalledTimes(1);
    });

    test('does not save when a required field is empty', async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const navigation = makeNavigation();
        const { store } = await renderWithStore(<TaskFormScreen navigation={navigation} route={{}} />);

        await user.type(screen.getByPlaceholderText('Heading'), 'Missing description');
        await user.type(screen.getByPlaceholderText('Due date'), '2026-12-01');
        await user.press(screen.getByText('Save'));
        await act(() => jest.runOnlyPendingTimers());

        expect(store.getState().Task.data).toEqual(sampleTasks);
        expect(navigation.goBack).not.toHaveBeenCalled();
    });

    test('edits an existing task', async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const navigation = makeNavigation();
        const { store } = await renderWithStore(
            <TaskFormScreen navigation={navigation} route={{ params: { id: 't1' } }} />
        );

        const heading = screen.getByPlaceholderText('Heading');
        expect(heading).toHaveDisplayValue('Prepare sprint demo');

        await user.clear(heading);
        await user.type(heading, 'Present sprint demo');
        await user.press(screen.getByText('Save'));
        await act(() => jest.runOnlyPendingTimers());

        const state = store.getState().Task.data;
        expect(state).toHaveLength(sampleTasks.length);
        expect(state[0]).toEqual({ ...sampleTasks[0], title: 'Present sprint demo' });
        expect(navigation.goBack).toHaveBeenCalledTimes(1);
    });
});
