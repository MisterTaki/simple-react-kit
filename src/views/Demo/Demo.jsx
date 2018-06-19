import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';

import * as actions from './state/action';
import './Demo.less';

@connect(null, {
  loadUser: actions.loadUser,
})
export default class Demo extends Component {
  static propTypes = {
    loadUser: PropTypes.func.isRequired,
  }

  handleLoadUser = (e) => {
    e.preventDefault();
    this.props.loadUser('7').then(({ data }) => {
      if (data) {
        message.destroy();
        message.success('success');
      }
    });
  }

  render() {
    return (
      <div>
        <h1 className="demo">Demo</h1>
        <button onClick={this.handleLoadUser}>load user</button>
      </div>
    );
  }
}
