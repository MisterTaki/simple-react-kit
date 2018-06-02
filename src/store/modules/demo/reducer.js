import { switchCase } from '@/utils';
import { REQUEST, SUCCESS, FAILURE } from '@/const/requestTypes';

import { USER } from './action';

const initialState = {
  user: {},
};

export default (state = initialState, action = {}) => (
  switchCase({
    [USER[REQUEST]]: {
      ...state,
      loading: true,
      loaded: false,
    },
    [USER[SUCCESS]]: {
      ...state,
      loading: false,
      loaded: true,
      user: action.data,
    },
    [USER[FAILURE]]: {
      ...state,
      loading: false,
      loaded: false,
      error: action.error,
    },
  })(state)(action.type)
);
