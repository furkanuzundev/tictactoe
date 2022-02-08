import * as React from 'react';
import Root from './src/navigation/Root';

import {Provider} from 'react-redux';
import store from './src/store';

const App = () => {
  if (!store) {
    return null;
  }
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default App;
