import React, { Component, PropTypes } from 'react';
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

        <div className={s.columns}>
          <div className={s.columnInfo}>
            <p>React auth kit is boilerplate for web development based
              on <a href="https://github.com/kriasoft/react-starter-kit">React starter kit</a>,
              but provide some features "out the box":</p>

            <ul>
              <li>authorization</li>
              <li>serverver/client side redirects</li>
              <li>flux and altjs</li>
              <li>css media queries</li>
              <li>decorators</li>
              <li>component generator</li>
              <li>sass for styles</li>
            </ul>

            <p>Try to login with the auth buttons or read more information on <a href="https://github.com/Bogdaan/react-auth-kit">github page</a>.</p>
          </div>

          <div className={s.columnButtons}>
            <a className={s.authBtn} href="/auth/google">Auth with Gooogle</a>
            <a className={s.authBtn} href="/auth/fb">Auth with Facebook</a>
            <a className={s.authBtn} href="/auth/tw">Auth with Twitter</a>
          </div>
        </div>


        <h2>Usage:</h2>
        <div className={s.usage}>
          <p>First, check node version and install 5.0 or greater:</p>
          <pre>node --version</pre>
          <pre>nvm use 5.4</pre>

          <p>Then, clone mater bracnh to app folder:</p>
          <pre>git clone  -b master --single-branch \ https://github.com/Boogdan/react-auth-kit.git MyApp</pre>

          <p>Install node_modules with dev dependencies:</p>
          <pre>npm install --dev</pre>

          <p>Create you configuration:</p>
          <pre>cp src/config/config.server.example.js src/config/config.server.js
            && vim src/config/config.server.js</pre>

          <p>If all ok, start dev server:</p>
          <pre>npm start</pre>

          <p>Generate React component:</p>
          <pre>npm run generate --name MyAwesomeComponent</pre>
        </div>

      </div>
    );
  }

}

export default withStyles(MainPage, s);
