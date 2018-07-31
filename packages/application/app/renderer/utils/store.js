import {
    createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import statsReducer from '../reducers/stats';
import tabsReducer from '../reducers/tabs';

const reducer = combineReducers({
    stats: statsReducer,
    tabs: tabsReducer,
});

const MIDDLEWARES = [
    promiseMiddleware(),
    thunk,
];

const middleware = applyMiddleware(...MIDDLEWARES);

const composeEnhancers = compose;

export default createStore(reducer, {}, composeEnhancers(middleware));
