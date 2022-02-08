import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';

import user from './user';

const reducers = combineReducers({
  user,
});

export default createStore(reducers, applyMiddleware(thunk));
