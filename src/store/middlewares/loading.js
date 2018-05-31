import { startLoading, successLoading, errorLoading } from '@/store/reducers/global/action';

const defaultTypeSuffixes = ['REQUEST', 'SUCCESS', 'FAILURE'];

export default function (config = {}) {
  const promiseTypeSuffixes = config.typeSuffixes || defaultTypeSuffixes;

  return ({ dispatch }) => next => (action) => {
    if (action.type) {
      const [REQUEST, SUCCESS, FAILURE] = promiseTypeSuffixes;

      const isStart = new RegExp(`_${REQUEST}$`, 'g');
      const isSuccess = new RegExp(`_${SUCCESS}$`, 'g');
      const isError = new RegExp(`_${FAILURE}$`, 'g');

      if (action.type.match(isStart)) {
        dispatch(startLoading());
      } else if (action.type.match(isSuccess)) {
        dispatch(successLoading());
      } else if (action.type.match(isError)) {
        dispatch(errorLoading());
      }
    }

    return next(action);
  };
}
