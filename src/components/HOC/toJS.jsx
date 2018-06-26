import React from 'react';
import { Iterable } from 'immutable';

// https://redux.js.org/recipes/using-immutable.js-with-redux#use-a-higher-order-component-to-convert-your-smart-components-immutable-js-props-to-your-dumb-components-javascript-props
export default WrappedComponent => (wrappedComponentProps) => {
  const KEY = 0;
  const VALUE = 1;

  const propsJS = Object.entries(wrappedComponentProps).reduce((newProps, wrappedComponentProp) => ({
    ...newProps,
    [wrappedComponentProp[KEY]]: Iterable.isIterable(wrappedComponentProp[VALUE])
      ? wrappedComponentProp[VALUE].toJS()
      : wrappedComponentProp[VALUE],
  }), {});

  return <WrappedComponent {...propsJS} />;
};
