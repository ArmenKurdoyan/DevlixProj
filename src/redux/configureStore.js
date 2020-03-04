import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import clientMiddleware from './middlewares/clientMiddleware';
// reducers
import user from './ducks/user';
import data from './ducks/data';

const loggerMiddleware = createLogger(); // initialize logger

const middleware = [
  clientMiddleware(),
  thunk,
  loggerMiddleware,
];

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const reducer = combineReducers({
  user,
  data,
});

const rootReducer = (state, action) => {
  let newState = state;

  return reducer(newState, action);
};

const configureStore = (initialState) => createStoreWithMiddleware(rootReducer, initialState);

export default configureStore;
