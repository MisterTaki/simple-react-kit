import { Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialRouterState = Map({
  location: null,
  action: null,
});

// https://github.com/gajus/redux-immutable#using-with-react-router-redux-v5
export const router = (state = initialRouterState, { type, payload = {} } = {}) => {
  if (type === LOCATION_CHANGE) {
    const location = payload.location || payload;
    const { action } = payload;

    return state
      .set('location', location)
      .set('action', action);
  }

  return state;
};

export global from './state/reducer';
export demo from '@/views/Demo/state/reducer';
