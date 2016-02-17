import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.scss';

import Header from '../Header'


class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  static contextTypes = {
    insertCss: PropTypes.func,
  };

  componentWillMount() {
    this.removeCss = this.context.insertCss(s);
  }

  componentWillUnmount() {
    this.removeCss();
  }

  render() {
    return (
      <div className={s.appContainer}>
      {
        (!this.props.error?
          <div className={s.appContainerInner}>
            <Header />
            {this.props.children}
          </div>
        : <div className={s.appContainerInner}>{this.props.children}</div>)
      }
      </div>
    )
  }

}

export default App;
