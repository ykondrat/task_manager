// Core
import { createStore } from 'redux';
// import { connectRouter } from 'connected-react-router';

// Reducer
import { rootReducer } from './rootReducers';

// Middleware
import { enhancedStore } from './middleware/core';

export const store = createStore(
    rootReducer
);
