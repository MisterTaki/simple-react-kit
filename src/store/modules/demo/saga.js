import { call, put, takeLatest } from 'redux-saga/effects';

import test from '@/api/demo';
import * as actions from './action';

const { user } = actions;

function* loadUser({ params }) {
  yield put(user.request());
  const { data, error } = yield call(test, params);
  if (data) {
    yield put(user.success(data));
  } else {
    yield put(user.failure(error));
  }
}

export default [
  takeLatest(actions.LOAD_USER, loadUser),
];
