import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import router from './router';
import './style/index.less';

const App = () => (
  <Router>
    <Switch>
      {router.map(item => (
        <Route
          key={item.label}
          path={item.path}
          component={item.component}
          exact={item.isExact}
        />
      ))}
    </Switch>
  </Router>
);

export default hot(module)(App);
