
import React, { Component, PropTypes } from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PrivatePage.scss';

import withAuth from '../withAuth'

class PrivatePage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle('Hello ' + this.props.userProfile.personname);
  }

  render() {
    return (
      <div className={s.root}>
      nope
      </div>
    );
  }

}

export default withStyles(withAuth(PrivatePage), s);
