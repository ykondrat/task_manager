// Core
import { Map, List, fromJS } from 'immutable';
import { v4 } from 'uuid';
import moment from 'moment';
// Types
import { types } from './types';
const task = Map({
    id: v4(),
    created: moment(),
    updated: null,
    started: null,
    ended: null,
    inprogress: false,
    completed: false,
    important: false,
    taskTitle: 'Test',
    task: 'Create test task'
})
const initialState = List().push(task);

const findTasksIndex = (state, taskId) => {
    const index = state.findIndex((task) => task.get('id') === taskId);

    return index;
}

export const tasksReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.CREATE_TASK:
            return state.unshift(fromJS(action.payload));
        case types.UPDATE_TASK:
            return state.map((task) => task.get('id') === action.payload.get('id') ? action.payload : task);
        case types.REMOVE_TASK:
            return state.remove(findTasksIndex(state, action.payload));


        case types.COMPLETE_TASKS:
            return state.map((task) => task.set('completed', true));
        default:
            return state;
    }

}
