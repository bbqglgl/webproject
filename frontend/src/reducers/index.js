import { combineReducers } from 'redux';
import todo from './todo';
// Merge multiple reducers in single reducer object (root reducer)
export default combineReducers({todo});