import { fork, take, cancel, all } from 'redux-saga/effects';
import { DEFAULT, REQUEST, SUCCESS, FAILURE } from '@/const/requestTypes';

export const createType = (namespace, type) => `${namespace}/${type}`;

export const createRequestTypes = (namespace, type) =>
  [DEFAULT, REQUEST, SUCCESS, FAILURE].reduce((result, suffix) => ({
    ...result,
    [suffix]: suffix === DEFAULT ? `${namespace}/${type}` : `${namespace}/${type}_${suffix}`,
  }), {});

export const createAction = (type, payload = {}) => ({
  type,
  ...payload,
});

// https://gist.github.com/mpolci/f44635dc761955730f8479b271151cf2
export const createDynamicSaga = (changeActionType, initSagas) => {
  function* start(newSagas) {
    yield all(newSagas);
  }
  return function* dynamicSaga() {
    let rootTask = yield fork(start, initSagas);
    while (true) {
      const { nextSagas } = yield take(changeActionType);
      yield cancel(rootTask);
      rootTask = yield fork(start, nextSagas);
    }
  };
};
