import { REQUEST, SUCCESS, FAILURE } from '@/const/requestTypes';

import { USER } from './action';

const initialState = {
  user: {},
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case USER[REQUEST]:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case USER[SUCCESS]:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.data,
      };
    case USER[FAILURE]:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
}
