
import React, { Component, PropTypes } from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoginPage.scss';

const title = 'Login';

class LoginPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  render() {
    return (
      <div className={s.container}>
        <p>Seems you are unable to login, try again or select a different social-network</p>
        <div className={s.columnButtons}>
          <a className={s.authBtn} href='/auth/google'>Auth with Gooogle</a>
          <a className={s.authBtn} href='/auth/fb'>Auth with Facebook</a>
          <a className={s.authBtn} href='/auth/tw'>Auth with Twitter</a>
        </div>
      </div>
    );
  }

}

export default withStyles(LoginPage, s);
