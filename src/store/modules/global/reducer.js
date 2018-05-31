import { START, SUCCESS, FAILURE } from './action';

const initialState = {
  loading: 'initialize',
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case START:
      return {
        ...state,
        loading: 'start',
      };
    case SUCCESS:
      return {
        ...state,
        loading: 'success',
      };
    case FAILURE:
      return {
        ...state,
        loading: 'failure',
      };
    default:
      return state;
  }
}
