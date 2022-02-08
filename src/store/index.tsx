import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';

import user from './user';
import game from './game';

const reducers = combineReducers({
  user,
  game,
});

export default createStore(reducers, applyMiddleware(thunk));
