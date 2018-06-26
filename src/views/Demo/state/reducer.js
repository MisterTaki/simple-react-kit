import { fromJS, is } from 'immutable';
import { switchCase } from '@/utils';
import { REQUEST, SUCCESS, FAILURE } from '@/const/requestTypes';

import { LOAD_USER_TYPES } from './action';

const initialState = fromJS({
  loading: false,
  loaded: false,
  user: null,
});


export default (state = initialState, { type, data = {}, error } = {}) => (
  switchCase({
    [LOAD_USER_TYPES[REQUEST]]: () => state
      .set('loading', true)
      .set('loaded', false),
    [LOAD_USER_TYPES[SUCCESS]]: () => state
      .update('user', (oldUser) => {
        const newUser = fromJS(data.data);
        return is(oldUser, newUser) ? oldUser : newUser;
      })
      .set('loading', false)
      .set('loaded', true),
    [LOAD_USER_TYPES[FAILURE]]: () => state
      .set('error', fromJS(error))
      .set('loading', false)
      .set('loaded', false),
  })(state)(type)
);
