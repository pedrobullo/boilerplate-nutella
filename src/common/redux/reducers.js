/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import posts from '../redux/modules/post';

// Combine all reducers into one root reducer
export default combineReducers({ posts });
