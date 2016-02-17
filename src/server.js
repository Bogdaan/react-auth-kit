
import 'babel-polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';

import { match, RouterContext } from 'react-router';
import routes from './routes';
import ContextHolder from './core/ContextHolder';

import Html from './components/Html';
import assets from './assets';
import { port, hostAddress } from './config';

import serverConfig from './config.server.js'
import alt from './core/alt'
import Iso from 'iso'

import expressSession from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import passportGoogle from 'passport-google-oauth'
import passportFb from 'passport-facebook'
import passportTwitter from 'passport-twitter'

import UserActions from './actions/UserActions'
import UserStore from './stores/UserStore'



const server = global.server = express();


// auth-cookie
server.use(cookieParser());
server.use(expressSession({
  secret: serverConfig.crypto,
  cookie: { secure: false },
}));
server.use(passport.initialize());
server.use(passport.session());



//
// info from request user
//
const getInfoFromUser = function(user) {
  var info = {
    id: user.id,
    provider: user.provider,
    name: user.displayName,
    logo: '',
    token: user.token,
  }

  if (typeof user.photos != 'undefined')
    info.logo = user.photos[0].value || ''

  return info
}


//
// Passport session setup.
//
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  // TODO stirict by user_id in real apps
  // WARNING check obj
  done(null, obj);
});




//
// GoogleStrategy within Passport
//
passport.use(new passportGoogle.OAuth2Strategy({
    clientID: serverConfig.GOOGLE_CLIENT_ID,
    clientSecret: serverConfig.GOOGLE_CLIENT_SECRET,
    callbackURL: hostAddress + '/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    profile.token = accessToken;
    return done(null, getInfoFromUser(profile));
  }
));


//
// FB within Passport
//
passport.use(new passportFb.Strategy({
    clientID: serverConfig.FACEBOOK_APP_ID,
    clientSecret: serverConfig.FACEBOOK_APP_SECRET,
    callbackURL: hostAddress + '/auth/fb/callback',
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    profile.token = accessToken;
    return done(null, getInfoFromUser(profile));
  }
));


//
// Twitter within Passport
//
passport.use(new passportTwitter.Strategy({
    consumerKey: serverConfig.TWITTER_CONSUMER_KEY,
    consumerSecret: serverConfig.TWITTER_CONSUMER_SECRET,
    callbackURL: hostAddress + '/auth/tw/callback',
  },
  function(token, tokenSecret, profile, done) {
    profile.token = token + '||' + tokenSecret;
    return done(null, getInfoFromUser(profile));
  }
));


//
// place in config etc.
//
const routeToLogin = '/login';
const routeToPrivate = '/private';


const socialUserRedirect = function(req, res) {
  if (typeof req.user != 'undefined') {
    res.cookie('user', JSON.stringify(req.user));
  }

  return res.redirect(routeToPrivate);
};



// GET /auth/google
server.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

server.get('/auth/google/callback',
  passport.authenticate('google'),
  socialUserRedirect);



// GET /auth/fb
server.get('/auth/fb',
  passport.authenticate('facebook'));

// GET /auth/fb/callback
server.get('/auth/fb/callback',
  passport.authenticate('facebook'),
  socialUserRedirect);



// GET /auth/tw
server.get('/auth/tw',
  passport.authenticate('twitter'));

// GET /auth/tw/callback
server.get('/auth/tw/callback',
  passport.authenticate('twitter'),
  socialUserRedirect);



// close session
server.get('/logout', function(req, res) {
  res.clearCookie('user');
  return res.redirect('/');
})


// static files
server.use(express.static(path.join(__dirname, 'public')));


// Register server-side rendering middleware
server.get('*', async (req, res, next) => {
  try {

    // auth first
    if (req.user) {
      UserActions.login(req.user)
    }

    // match routes
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

      if (redirectLocation != null)
        return res.redirect(redirectLocation.pathname);

      let statusCode = 200;
      const data = {
        title: '',
        description: '',
        css: '',
        body: '',
        entry: assets.main.js
      };
      const css = [];
      const context = {
        insertCss: styles => css.push(styles._getCss()),
        onSetTitle: value => data.title = value,
        onSetMeta: (key, value) => data[key] = value,
        onPageNotFound: () => statusCode = 404,
      };

      const iso = new Iso();
      iso.add(
        ReactDOM.renderToString(
          <ContextHolder context={context}>
            <RouterContext {...renderProps} />
          </ContextHolder>
        ),
        alt.flush()
      );

      data.body = iso.render();
      data.css = css.join('');

      const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
      res.status(statusCode).send(`<!doctype html>\n${html}`);
    });
  } catch (err) {
    next(err);
  }
});


// Launch server
server.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});
