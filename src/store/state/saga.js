import { call, put, takeEvery } from 'redux-saga/effects';
import { REQUEST, SUCCESS, FAILURE } from '@/const/requestTypes';

const SAGA_SUFFIX = `_${REQUEST}`;

function* sagaRequest({
  type,
  request,
  payload,
  resolve,
  reject,
}) {
  const { data, error } = yield call(request, payload);
  if (data) {
    if (resolve) {
      yield call(resolve, data);
    }
    yield put({
      type: type.replace(SAGA_SUFFIX, `_${SUCCESS}`),
      data,
    });
  } else {
    if (reject) {
      yield call(reject, error);
    }
    yield put({
      type: type.replace(SAGA_SUFFIX, `_${FAILURE}`),
      error,
    });
  }
}

export default [
  takeEvery(
    action => action.type.endsWith(SAGA_SUFFIX),
    sagaRequest,
  ),
];
