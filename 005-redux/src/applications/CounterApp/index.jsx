import React from 'react';
/**
 * Components
 */
import Counter from './Counter/Counter';
/**
 * Store
 */
import { Provider } from 'react-redux';
import store from './redux/store';

export const ROOT_PATH = '/counter';

const index = () => {
  return (
    <Provider store={store}>
      <div>
        <h2>Counter app</h2>

        <Counter />
      </div>
    </Provider>
  );
}

export default index;
