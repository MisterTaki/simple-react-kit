export const START = 'global/START_LOADING';
export const SUCCESS = 'global/SUCCESS_LOADING';
export const FAILURE = 'global/FAILURE_LOADING';

export function startLoading() {
  return {
    type: START,
  };
}

export function successLoading() {
  return {
    type: SUCCESS,
  };
}

export function errorLoading() {
  return {
    type: FAILURE,
  };
}
