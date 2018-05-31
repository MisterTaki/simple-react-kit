import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { loadingMiddleware } from './middlewares';
import { reducers, sagas } from './modules';

// https://github.com/zalmoxisus/redux-devtools-extension
let composeEnhancers = compose;

// eslint-disable-next-line no-underscore-dangle
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

if (process.env.NODE_ENV === 'development' && reduxDevTools) {
  composeEnhancers = reduxDevTools;
}

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
const history = createHistory();

// https://github.com/redux-saga/redux-saga
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  composeEnhancers(applyMiddleware(
    loadingMiddleware,
    sagaMiddleware,
    routerMiddleware(history),
  )),
);

sagaMiddleware.run(sagas);

export default store;
