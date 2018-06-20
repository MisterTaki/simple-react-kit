import { call, put, takeEvery } from 'redux-saga/effects';
import { REQUEST, SUCCESS, FAILURE } from '@/const/requestTypes';

const SAGA_SUFFIX = `_${REQUEST}`;
const SAGA_SUFFIX_REGEXP = new RegExp(`${SAGA_SUFFIX}$`);

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
      type: type.replace(SAGA_SUFFIX_REGEXP, `_${SUCCESS}`),
      data,
    });
  } else {
    if (reject) {
      yield call(reject, error);
    }
    yield put({
      type: type.replace(SAGA_SUFFIX_REGEXP, `_${FAILURE}`),
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
