import { renderHook } from '@testing-library/react-native';

import useFilteredList from '../useFilteredList';
import { FiltersType } from '../../store/slice/filters';
import { defaultFilters, sampleTasks } from '../../test/utils';

const titlesFor = async (filters: Partial<FiltersType>) => {
    const allFilters = { ...defaultFilters, ...filters };
    const { result } = await renderHook(() => useFilteredList(sampleTasks, allFilters));
    return result.current.map(task => task.title);
};

describe('useFilteredList', () => {
    test('should return all tasks when no filters are set', async () => {
        expect(await titlesFor({})).toEqual(sampleTasks.map(task => task.title));
    });

    test('should be able to filter the list based on status filter', async () => {
        expect(await titlesFor({ isCompleted: true })).toEqual(['Renew car insurance']);
        expect(await titlesFor({ isCompleted: false })).toEqual([
            'Prepare sprint demo',
            'Book dentist appointment',
        ]);
    });

    test('should be able to filter the list based on priority filter', async () => {
        expect(await titlesFor({ priority: 'low' })).toEqual(['Book dentist appointment']);
    });

    test('should be able to filter the list combining status and priority filters', async () => {
        expect(await titlesFor({ priority: 'high', isCompleted: false })).toEqual(['Prepare sprint demo']);
        expect(await titlesFor({ priority: 'high', isCompleted: true })).toEqual([]);
    });

    test('Should be able to filter the list based on searched text', async () => {
        expect(await titlesFor({ searchText: 'dentist' })).toEqual(['Book dentist appointment']);
    });

    test('Should be able to fuzzy match based on search text', async () => {
        expect(await titlesFor({ searchText: 'insurence' })).toContain('Renew car insurance');
    });
});
