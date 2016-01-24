import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.scss';

import Header from '../Header';
import Footer from '../Footer';

class App extends Component {

  static propTypes = {
    context: PropTypes.shape({
      insertCss: PropTypes.func,
      onSetTitle: PropTypes.func,
      onSetMeta: PropTypes.func,
      onPageNotFound: PropTypes.func,
    }),
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    onSetTitle: PropTypes.func.isRequired,
    onSetMeta: PropTypes.func.isRequired,
    onPageNotFound: PropTypes.func.isRequired,
  };

  getChildContext() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
      onSetTitle: context.onSetTitle || emptyFunction,
      onSetMeta: context.onSetMeta || emptyFunction,
      onPageNotFound: context.onPageNotFound || emptyFunction,
    };
  }

  componentWillMount() {
    this.removeCss = this.props.context.insertCss(s);
  }

  componentWillUnmount() {
    this.removeCss();
  }

  renderChild() {
    return
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
