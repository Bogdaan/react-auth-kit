
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Iso from 'iso';
import alt from './core/alt';

import Location from './core/Location';
import { match, Router } from 'react-router';
import routes from './routes';

import FastClick from 'fastclick';
import ContextHolder from './core/ContextHolder';
import { addEventListener } from './core/DOMUtils';


let cssContainer = document.getElementById('css');
const appContainer = document.getElementById('app');
const context = {
  insertCss: styles => styles._insertCss(),
  onSetTitle: value => document.title = value,
  onSetMeta: (name, content) => {
    // Remove and create a new <meta /> tag in order to make it work
    // with bookmarks in Safari
    const elements = document.getElementsByTagName('meta');
    [].slice.call(elements).forEach((element) => {
      if (element.getAttribute('name') === name) {
        element.parentNode.removeChild(element);
      }
    });
    const meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    document.getElementsByTagName('head')[0].appendChild(meta);
  },
};

function run() {

  // Make taps on links and buttons work fast on mobiles
  FastClick.attach(document.body);

  // Setup the client-side stores with the same data the server had
  Iso.bootstrap((state, meta, node) => {
    alt.bootstrap(state);
  });

  // Re-render the app when window.location changes
  const unlisten = Location.listen(location => {
    window.scrollTo(0, 0);

    match({ routes, location },
      (error, redirectLocation, renderProps) => {

        render(
          <ContextHolder context={context}>
            <Router
              history={Location}
              routes={routes}
              {...renderProps}
             />
          </ContextHolder>,
          appContainer
        );

        // Remove the pre-rendered CSS because it's no longer used
        if (cssContainer) {
          cssContainer.parentNode.removeChild(cssContainer);
          cssContainer = null;
        }
      }); // match-end

  });
}

// Run the application when both DOM is ready and page content is loaded
if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run, false);
}
