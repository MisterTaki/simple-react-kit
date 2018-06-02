import { createRequestTypes, createAction } from '@/utils/createTools';
import { DEFAULT, REQUEST, SUCCESS, FAILURE } from '@/const/requestTypes';

const NAME_SPACE = 'demo';

export const USER = createRequestTypes(NAME_SPACE, 'USER');
export const LOAD_USER = USER[DEFAULT];
export const loadUser = id => createAction(USER[DEFAULT], { id });

export const user = {
  request: () => ({
    type: USER[REQUEST],
  }),
  success: () => ({
    type: USER[SUCCESS],
  }),
  failure: () => ({
    type: USER[FAILURE],
  }),
};
