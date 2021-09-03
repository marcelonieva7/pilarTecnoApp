import { combineReducers } from 'redux';
import user from './user';
import centers from './centers';

export const rootReducer = combineReducers({ user, centers });
