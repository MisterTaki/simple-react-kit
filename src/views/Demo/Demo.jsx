import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';
import { toJS } from '@/components/HOC';

import * as actions from './state/action';
import './Demo.less';

@connect(state => ({
  user: state.getIn(['demo', 'user']),
}), {
  loadUser: actions.loadUser,
})
@toJS
export default class Demo extends PureComponent {
  static propTypes = {
    loadUser: PropTypes.func.isRequired,
  }

  // shouldComponentUpdate(nextProps) {
  //   return !shallowEqual(this.props, nextProps);
  // }

  componentDidUpdate() {
    console.log('componentDidUpdate');
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
