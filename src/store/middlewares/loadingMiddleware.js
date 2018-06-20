import { startLoading, successLoading, failureLoading } from '@/store/state/action';
import { REQUEST, SUCCESS, FAILURE } from '@/const/requestTypes';

const defaultTypeSuffixes = [REQUEST, SUCCESS, FAILURE];

export default function (config = {}) {
  const promiseTypeSuffixes = config.typeSuffixes || defaultTypeSuffixes;

  return ({ dispatch }) => next => (action) => {
    if (action.type) {
      const [request, success, failure] = promiseTypeSuffixes;

      if (action.type.endsWith(`_${request}`)) {
        dispatch(startLoading());
      } else if (action.type.endsWith(`_${success}`)) {
        dispatch(successLoading());
      } else if (action.type.endsWith(`_${failure}`)) {
        dispatch(failureLoading());
      }
    }

    return next(action);
  };
}
