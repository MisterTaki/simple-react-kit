import { all } from 'redux-saga/effects';
import { createDynamicSaga } from '@/utils/createTools';
import { REPLACE_SAGAS } from '@/const/requestTypes';
import demo from './demo/saga';

// https://github.com/redux-saga/redux-saga/issues/160
export const rootSagas = [...demo];

const exportSagas = process.env.NODE_ENV === 'development' ?
  createDynamicSaga(REPLACE_SAGAS, rootSagas) :
  function* defaultSaga() {
    yield all(rootSagas);
  };

export default exportSagas;
