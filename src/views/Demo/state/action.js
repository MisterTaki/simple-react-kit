import { createRequestTypes, createAsyncAction } from '@/utils/createTools';
import { REQUEST } from '@/const/requestTypes';
import test from '@/api/demo';

const NAME_SPACE = 'demo';

export const LOAD_USER_TYPES = createRequestTypes(NAME_SPACE, 'LOAD_USER');

export const loadUser = id => createAsyncAction(LOAD_USER_TYPES[REQUEST], test, { id });
