
import { createStore, combineReducers } from 'redux';

const reducer = combineReducers({})

const configureStore = (initialState) => createStore(reducer, initialState);

export default configureStore