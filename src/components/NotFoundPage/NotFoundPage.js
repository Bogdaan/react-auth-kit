
import React, { Component, PropTypes } from 'react';
import Link from '../Link'

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NotFoundPage.scss';

const title = 'Oops, page not found';

class NotFoundPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    onPageNotFound: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
    this.context.onPageNotFound();
  }

  render() {
    return (
      <div className={s.notFound}>
        <h1>{title}</h1>
        <p>Sorry, but the page you were trying to view does not exist.</p>
        <p>Please, try to <Link to='/'>start from main page</Link></p>
      </div>
    );
  }

}

export default withStyles(NotFoundPage, s);
