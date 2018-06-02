import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { REPLACE_SAGAS } from '@/const/requestTypes';
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
    loadingMiddleware(),
    routerMiddleware(history),
    sagaMiddleware,
  )),
);

sagaMiddleware.run(sagas);

if (module.hot) {
  // Enable Redux-Saga & Webpack hot module replacement for reducers
  module.hot.accept('./modules/index.js', () => {
    /* eslint-disable global-require */
    const { reducers: nextRootReducer } = require('./modules/index.js');
    const { rootSagas: nextSagas } = require('./modules/sagas.js');
    // https://github.com/reduxjs/react-redux/releases/tag/v2.0.0
    store.replaceReducer(combineReducers({
      ...nextRootReducer,
      router: routerReducer,
    }));
    // https://stackoverflow.com/questions/37148592/redux-saga-hot-reloading
    store.dispatch({ type: REPLACE_SAGAS, nextSagas });
  });
}

export { history, store };
