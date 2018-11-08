// Types
import { types } from './types';

// Sync
export const createTask = (task) => ({
    type: types.CREATE_TASK,
    payload: task
});
export const removeTask = (taskId) => ({
    type: types.REMOVE_TASK,
    payload: taskId
});
export const updateTask = (task) => ({
    type: types.UPDATE_TASK,
    payload: task
});


export const fillTasks = (tasks) => ({
    type: types.FILL_TASKS,
    payload: tasks
});


export const completeTask = () => ({
    type: types.COMPLETE_TASKS,
});
