import { combineReducers } from 'redux';
import auth from './auth';
// Merge multiple reducers in single reducer object (root reducer)
export default combineReducers({auth});