const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export default function (name) {
  return [REQUEST, SUCCESS, FAILURE].reduce((result, type) => ({
    ...result,
    [type]: `${name}_${type}`,
  }), {});
}
