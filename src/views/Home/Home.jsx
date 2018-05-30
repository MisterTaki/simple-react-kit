import React from 'react';
import { Link } from 'react-router-dom';

import logo from '@/assets/logo.svg';
import './Home.less';

/* eslint-disable jsx-a11y/anchor-is-valid */
export default () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.jsx</code> and save to reload.
    </p>
    <Link to="/sss">sss</Link>
  </div>
);
