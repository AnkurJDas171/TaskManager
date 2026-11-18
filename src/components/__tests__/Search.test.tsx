import React from 'react';
import { act, screen, userEvent } from '@testing-library/react-native';

import Search from '../Search';
import { renderWithStore } from '../../test/utils';

describe('Search', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('debounce should work while typing', async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const { store } = await renderWithStore(<Search />);

        await user.type(screen.getByPlaceholderText('Search'), 'demo');
        expect(store.getState().Filters.searchText).toBe('');

        await act(() => jest.advanceTimersByTime(250));

        expect(store.getState().Filters.searchText).toBe('demo');
    });

    test('should be able to select and de-select priority filters', async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const { store } = await renderWithStore(<Search />);

        await user.press(screen.getByRole('button', { name: 'Filter tasks' }));
        await user.press(screen.getByRole('checkbox', { name: 'High' }));
        expect(store.getState().Filters.priority).toBe('high');
        expect(screen.getByRole('checkbox', { name: 'High' })).toBeChecked();

        await user.press(screen.getByRole('checkbox', { name: 'High' }));
        expect(store.getState().Filters.priority).toBeNull();
        expect(screen.getByRole('checkbox', { name: 'High' })).not.toBeChecked();
    });

    test('should be able to select priority filter and status filter at same time', async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const { store } = await renderWithStore(<Search />);

        await user.press(screen.getByRole('button', { name: 'Filter tasks' }));
        await user.press(screen.getByRole('checkbox', { name: 'Low' }));
        await user.press(screen.getByRole('checkbox', { name: 'Completed' }));

        expect(store.getState().Filters).toMatchObject({ priority: 'low', isCompleted: true });
    });
});
