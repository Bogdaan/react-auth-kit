import React, { Component, PropTypes } from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MainPage.scss';

const title = 'React auth kit';

class MainPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  render() {
    return (
      <div className={s.container}>
        <h1>{title}</h1>

        <div className={s.columns}>
          <div className={s.columnInfo}>
            <p>This starter kit allow you</p>

            <h2>Dependencies</h2>
            <p>list of dependecies ...</p>

            <h2>Usage</h2>
            <p>fork && start && build && deploy</p>
          </div>

          <div className={s.columnButtons}>
            <a className={s.authBtn} href='/auth/google'>Auth with Gooogle</a>
            <a className={s.authBtn} href='/auth/fb'>Auth with Facebook</a>
            <a className={s.authBtn} href='/auth/tw'>Auth with Twitter</a>
          </div>
        </div>

      </div>
    );
  }

}

export default withStyles(MainPage, s);
