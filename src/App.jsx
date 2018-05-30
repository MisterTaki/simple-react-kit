import React from 'react';
import { hot } from 'react-hot-loader';

import logo from './assets/logo.svg';
import './style/index.less';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.jsx</code> and save to reload.
    </p>
  </div>
);

export default hot(module)(App);
