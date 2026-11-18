import React from 'react';
import { act, screen, userEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import TaskListScreen from '../TaskListScreen';
import { makeNavigation, renderWithStore } from '../../test/utils';

const safeAreaMetrics = {
    frame: { x: 0, y: 0, width: 390, height: 844 },
    insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const renderScreen = (navigation = makeNavigation()) => renderWithStore(
    <SafeAreaProvider initialMetrics={safeAreaMetrics}>
        <TaskListScreen navigation={navigation} />
    </SafeAreaProvider>
);

describe('TaskListScreen', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('should render screen', async () => {
        await renderScreen();

        expect(screen).toMatchSnapshot();
    })

    test('Should render every task', async () => {
        await renderScreen();

        expect(screen.getByText('Prepare sprint demo')).toBeOnTheScreen();
        expect(screen.getByText('Renew car insurance')).toBeOnTheScreen();
        expect(screen.getByText('Book dentist appointment')).toBeOnTheScreen();
    });

    test('Search filter should work', async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        await renderScreen();

        await user.type(screen.getByPlaceholderText('Search'), 'dentist');
        await act(() => jest.advanceTimersByTime(250));

        expect(screen.getByText('Book dentist appointment')).toBeOnTheScreen();
        expect(screen.queryByText('Prepare sprint demo')).not.toBeOnTheScreen();
        expect(screen.queryByText('Renew car insurance')).not.toBeOnTheScreen();
    });

    test('should only completed task be visible on completed filter select', async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        await renderScreen();

        await user.press(screen.getByRole('button', { name: 'Filter tasks' }));
        await user.press(screen.getByRole('checkbox', { name: 'Completed' }));

        expect(screen.getByText('Renew car insurance')).toBeOnTheScreen();
        expect(screen.queryByText('Prepare sprint demo')).not.toBeOnTheScreen();
        expect(screen.queryByText('Book dentist appointment')).not.toBeOnTheScreen();
    });

    test('Should be able to update the status of a task in the list', async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        await renderScreen();

        const checkbox = screen.getByRole('checkbox', { name: 'Prepare sprint demo' });
        expect(checkbox).not.toBeChecked();

        await user.press(checkbox);

        expect(screen.getByRole('checkbox', { name: 'Prepare sprint demo' })).toBeChecked();
        expect(screen.getAllByText('Completed')).toHaveLength(2);
    });

    test('Should open the task form when add button in pressed', async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const navigation = makeNavigation();
        await renderScreen(navigation);

        await user.press(screen.getByRole('button', { name: 'Add task' }));

        expect(navigation.navigate).toHaveBeenCalledWith('TaskFormScreen');
    });
});
