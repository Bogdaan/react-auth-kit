import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from './components/App'

import MainPage from './components/MainPage'
import LoginPage from './components/LoginPage'
import PrivatePage from './components/PrivatePage'
import NotFoundPage from './components/NotFoundPage'

import UserActions from './actions/UserActions'
import UserStore from './stores/UserStore'


/**
 * force auth redirect
 */
const requireAuth = (nextState, replace) => {

  if (!UserStore.isLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}


/**
 * all routes
 */
export default (
  <Route>
    <Route path='/' component={App}>
      <IndexRoute component={MainPage} />
      <Route path='login' component={LoginPage} />
      <Route path='private' component={PrivatePage} onEnter={requireAuth} />
    </Route>
    <Route path='*' component={NotFoundPage} />
  </Route>
);
