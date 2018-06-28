import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import logo from '@/assets/logo.svg';
import './Home.less';

const Home = ({ className, demo }) => (
  <div className={classNames('App', className)}>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">
        Welcome to React
      </h1>
    </header>
    <p className="App-intro">
      To get started, edit
      <code>
        src/App.jsx
      </code>
      and save to reload.
    </p>
    <button
      type="button"
      onClick={demo}
    >
      to Demo
    </button>
  </div>
);

Home.propTypes = {
  demo: PropTypes.func.isRequired,
};

export default connect(null, dispatch => ({
  demo: () => dispatch(push('/demo')),
}))(Home);
