import { REQUEST, SUCCESS, FAILURE } from '@/const/requestTypes';

export const createType = (namespace, type) => `${namespace}/${type}`;

export const createRequestTypes = (namespace, type) =>
  [REQUEST, SUCCESS, FAILURE].reduce((result, suffix) => ({
    ...result,
    [suffix]: `${namespace}/${type}_${suffix}`,
  }), {});

export const createAction = (type, payload = {}) => ({
  type,
  payload,
});

export const createAsyncAction = (type, request, payload = {}) => dispatch => (
  new Promise((resolve, reject) => dispatch({
    type,
    request,
    payload,
    resolve,
    reject,
  })).then(data => ({ data })).catch(error => ({ error }))
);
