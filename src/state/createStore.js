import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import * as reducers from './reducers/index';

const createStore = () => reduxCreateStore(
    combineReducers(reducers),
    applyMiddleware(thunk)
);

export default createStore