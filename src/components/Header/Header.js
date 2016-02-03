
import React, { Component } from 'react'
import Link from '../Link'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Header.scss'


class Header extends Component {

  render() {
    return (
      <div className={s.container}>
        <Link className={s.brand} to="/">
          <span className={s.resourceName}>AUTH.<span className={s.resourceSmall}>HCBOGDAN</span></span>
        </Link>
        <div className={s.nav}>
          <Link className={s.navItem} to='/private'>private</Link>
          <a className={s.navItem} href='http://hcbogdan.com'>blog</a>
          <a className={s.navItem} href='https://github.com/Bogdaan/react-auth-kit' target='_blank'>source on github</a>
        </div>
      </div>
    );
  }

}

export default withStyles(Header, s);
