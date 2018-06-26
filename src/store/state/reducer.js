import { Map } from 'immutable';
import { switchCase } from '@/utils';
import { START, SUCCESS, FAILURE } from './action';

const initialState = Map({
  loading: 'initialize',
});

export default (state = initialState, { type } = {}) => (
  switchCase({
    [START]: state.set('loading', 'start'),
    [SUCCESS]: state.set('loading', 'success'),
    [FAILURE]: state.set('loading', 'failure'),
  })(state)(type)
);
