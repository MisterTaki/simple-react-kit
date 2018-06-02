import { call, put, takeLatest } from 'redux-saga/effects';

import test from '@/api/demo';
import * as actions from './action';

const { user } = actions;

function* loadUser({ params }) {
  yield put(user.request());
  const { response, error } = yield call(test, params);
  if (response) {
    yield put(user.success(response));
  } else {
    yield put(user.failure(error));
  }
}

export default [
  takeLatest(actions.LOAD_USER, loadUser),
];
