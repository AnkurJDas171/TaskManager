import reducer, { addTask, deleteTask, TaskType, updateTask } from '../task';
import { sampleTasks } from '../../../test/utils';

const initialState: TaskType = { data: sampleTasks, isLoading: false, error: false };

describe('task slice', () => {
    describe('addTask', () => {
        test('should be able to add a new task with random id', () => {
            const newTask = {
                title: 'Write tests',
                description: 'Cover the reducers',
                priority: 'medium' as const,
                dueDate: '2026-12-01',
                isCompleted: false,
            };

            const state = reducer(initialState, addTask(newTask));

            expect(state.data).toHaveLength(sampleTasks.length + 1);
            const created = state.data[state.data.length - 1];
            expect(created).toMatchObject(newTask);
            expect(typeof created.id).toBe('string');
            expect(created.id).not.toBe('');
        });

        test('Should a unique id to every task', () => {
            const task = {
                title: 'Same',
                description: 'Same',
                priority: 'low' as const,
                dueDate: '2026-12-01',
                isCompleted: false,
            };

            let state = reducer({ ...initialState, data: [] }, addTask(task));
            state = reducer(state, addTask(task));

            expect(state.data[0].id).not.toBe(state.data[1].id);
        });
    });

    describe('updateTask', () => {
        test('should be able to mark a pending task as completed', () => {
            const state = reducer(initialState, updateTask({ ...sampleTasks[0], isCompleted: true }));

            expect(state.data[0].isCompleted).toBe(true);
        });

        test('should be able to mark a completed task as pending', () => {
            const state = reducer(initialState, updateTask({ ...sampleTasks[1], isCompleted: false }));

            expect(state.data[1].isCompleted).toBe(false);
        });

        test('should not update with an unknown id', () => {
            const state = reducer(initialState, updateTask({ ...sampleTasks[0], id: 'missing' }));

            expect(state.data).toEqual(sampleTasks);
        });
    });

    describe('deleteTask', () => {
        test('should be able to remove task from id', () => {
            const state = reducer(initialState, deleteTask('t2'));

            expect(state.data.map(task => task.id)).toEqual(['t1', 't3']);
        });
    });
});
