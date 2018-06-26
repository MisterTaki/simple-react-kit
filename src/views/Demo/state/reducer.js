import { Map, fromJS } from 'immutable';
import { switchCase } from '@/utils';
import { REQUEST, SUCCESS, FAILURE } from '@/const/requestTypes';

import { LOAD_USER_TYPES } from './action';

const initialState = Map({
  user: null,
});

export default (state = initialState, action = {}) => (
  switchCase({
    [LOAD_USER_TYPES[REQUEST]]: state
      .set('loading', true)
      .set('loaded', false),
    [LOAD_USER_TYPES[SUCCESS]]: state
      .set('user', fromJS(action.data))
      .set('loading', false)
      .set('loaded', true),
    [LOAD_USER_TYPES[FAILURE]]: state
      .set('error', fromJS(action.error))
      .set('loading', false)
      .set('loaded', false),
  })(state)(action.type)
);
