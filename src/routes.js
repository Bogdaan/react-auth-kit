
import React from 'react';
import Router from 'react-routing/src/Router';
import App from './components/App';

import NotFoundPage from './components/NotFoundPage'
import ErrorPage from './components/ErrorPage'

import MainPage from './components/MainPage'
import PrivatePage from './components/PrivatePage'

import UserStore from './stores/UserStore'


const router = new Router(on => {

  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/', async () => <MainPage />);

  // protect auth
  on('/private', async (state, next) => {
    if (!UserStore.isLoggedIn()) {
      state.redirect = '/login'
      return
    }
    return <PrivatePage />
  });

  //
  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );

});

export default router;
