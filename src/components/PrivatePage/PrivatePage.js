
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
    const profile = this.props.userProfile

    return (
      <div className={s.root}>
        <h1>This is example of prtected page.</h1>
        <p>You profile info:</p>
        <table>
          <tr>
            <td>Provider</td>
            <td>{profile.service}</td>
          </tr>
          <tr>
            <td>Avatar</td>
            <td><img src={profile.logo} alt='my logo' /></td>
          </tr>
          <tr>
            <td>Person</td>
            <td>{profile.personname}</td>
          </tr>
          <tr>
            <td>Access token:</td>
            <td>{profile.token}</td>
          </tr>
        </table>
      </div>
    );
  }

}

export default withStyles(withAuth(PrivatePage), s);
