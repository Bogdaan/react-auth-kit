import React from 'react'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'
import { IndexRoute, Route } from 'react-router'

import App from './components/App'
import MainPage from './components/MainPage'
import LoginPage from './components/LoginPage'
import PrivatePage from './components/PrivatePage'
import NotFoundPage from './components/NotFoundPage'

import Cookie from './utils/Cookie'
import UserActions from './actions/UserActions'
import UserStore from './stores/UserStore'
import TodoStore from './stores/TodoStore'

/**
 * setup UserStore from cookie
 */
const performAuth = (nextState, replace) => {
  if (canUseDOM && !UserStore.isLoggedIn()) {
    const userInfo = Cookie.getObject('user')
    if (userInfo) {
      UserActions.login(userInfo)
    }
  }
}

/**
 * force auth redirect
 */
const requireAuth = (nextState, replace) => {
  if (!UserStore.isLoggedIn()) {
    replace({
      pathname: '/login'
    })
  }
};

/**
 * force back, when already logged in
 */
const authCheck = (nextState, replace) => {
  if (UserStore.isLoggedIn()) {
    replace({
      pathname: '/private'
    })
  }
};

/**
 * prefetch todo list
 */
const getPrivatePage = async (location, callback) => {
  await TodoStore.fetchList();
  callback(null, () => <PrivatePage />);
}

/**
 * all routes
 */
export default (
  <Route component={App} onEnter={performAuth}>
    <Route path='/' component={MainPage} />
    <Route path='login' component={LoginPage} onEnter={authCheck} />
    <Route path='private' getComponent={getPrivatePage} onEnter={requireAuth} />
    <Route path='*' component={NotFoundPage} />
  </Route>
);
