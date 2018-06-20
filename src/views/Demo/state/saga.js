// import { call, put, takeLatest } from 'redux-saga/effects';

// import test from '@/api/demo';
// import * as actions from './action';

// const { loadUserTypes, LOAD_USER } = actions;

// function* loadUser({ payload, resolve, reject }) {
//   const { id } = payload;
//   yield put(loadUserTypes.request());
//   const { data, error } = yield call(test, { id });
//   if (data) {
//     if (resolve) {
//       yield call(resolve, data);
//     }
//     yield put(loadUserTypes.success(data));
//   } else {
//     if (reject) {
//       yield call(reject, error);
//     }
//     yield put(loadUserTypes.failure(error));
//   }
// }

// export default [
//   takeLatest(LOAD_USER, loadUser),
// ];
