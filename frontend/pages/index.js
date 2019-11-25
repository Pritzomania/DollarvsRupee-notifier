import React, { Component } from 'react';

import { start } from '../libs/push';

export default class Home extends Component {
  componentDidMount = () => {
    console.log('inside component did mount');
    start();
  };

  render() {
    return <div>Hello Push</div>;
  }
}
