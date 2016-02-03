
import 'babel-polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Html from './components/Html';
import assets from './assets';
import { port } from './config';

import serverConfig from './config.server.js'
import alt from './core/alt'
import Iso from 'iso'
import expressSession from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import passportGoogle from 'passport-google-oauth'
import passportFb from 'passport-facebook'
import passportTwitter from 'passport-twitter'



const server = global.server = express();


//
// auth-middleware
//
server.use(cookieParser());
server.use(expressSession({ secret: serverConfig.crypto }));
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
  done(null, obj);
});




//
// GoogleStrategy within Passport
//
passport.use(new passportGoogle.OAuth2Strategy({
    clientID: serverConfig.GOOGLE_CLIENT_ID,
    clientSecret: serverConfig.GOOGLE_CLIENT_SECRET,
    callbackURL: serverConfig.frontend + '/auth/google/callback'
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
    callbackURL: serverConfig.frontend + '/auth/fb/callback',
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
    callbackURL: serverConfig.frontend + '/auth/tw/callback',
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
    req.query.user = req.user
    res.cookie('user', JSON.stringify(req.user));
  }

  return res.redirect(routeToPrivate);
};



// GET /auth/google
server.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
server.get('/auth/google/callback',
  function(req, res, next) {
    passport.authenticate('google', function(err, user, info) {
      if (!user || err) { return res.redirect(routeToLogin) }
      req.user = user;
      next();
    })(req, res, next);
  },
  socialUserRedirect);


// GET /auth/fb
server.get('/auth/fb',
  passport.authenticate('facebook'));

// GET /auth/fb/callback
server.get('/auth/fb/callback',
  function(req, res, next) {
    passport.authenticate('facebook', function(err, user, info) {
      if (!user || err) { return res.redirect(routeToLogin) }
      req.user = user;
      next();
    })(req, res, next);
  },
  socialUserRedirect);


// GET /auth/tw
server.get('/auth/tw',
  passport.authenticate('twitter'));

// GET /auth/tw/callback
server.get('/auth/tw/callback',
  function(req, res, next) {
    passport.authenticate('twitter', function(err, user, info) {
      if (!user || err) { return res.redirect(routeToLogin) }
      req.user = user;
      next();
    })(req, res, next);
  },
  socialUserRedirect);




//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));


// close session
server.get('/logout', function(req, res) {
  res.clearCookie('user');
  return res.redirect('/');
})


//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    let redirectTo = '';

    const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };
    const css = [];
    const context = {
      insertCss: styles => css.push(styles._getCss()),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404,
    };

    await Router.dispatch({
      path: req.path,
      query: req.query,
      context
    },
    (state, component) => {

      if (typeof state.redirect != 'undefined') {
        redirectTo = state.redirect
        return
      }

      const iso = new Iso();

      iso.add(
        ReactDOM.renderToString(component),
        alt.flush()
      );

      data.body = iso.render();
      data.css = css.join('');
    });

    if (redirectTo.length)
      return res.redirect(redirectTo)

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(statusCode).send('<!doctype html>\n' + html);

  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});
