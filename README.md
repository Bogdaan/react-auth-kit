## React auth kit

Simple authorization example with react SSR and altjs - [Live demo](http://auth.hcbogdan.com)

Features:

* support router redirect
* support auth from socaial networks (and other sources, local etc.)
* altjs / flux power
* component generator
* support decorators
* server side rendering

Packages:

* flux
* altjs - unidirection data flow
* iso - pass data to client
* passport - auth framework
* passport-facebook - atuh from facebook
* passport-twitter - atuh from twitter
* passport-google-oauth - atuh from google plus
* express-session - session support for express
* cookie-parser
* postcss-custom-media - for css media queries
* babel-plugin-transform-decorators-legacy - for decorators


## Documentation
* [Configure project](https://github.com/Bogdaan/react-auth-kit/docs/init-config.md)
* [Generate component](https://github.com/Bogdaan/react-auth-kit/docs/generate-component.md)
* [React starter kit documentation](https://github.com/kriasoft/react-starter-kit/docs/)
* [Altjs docs](http://alt.js.org/)
* [Passportjs docs](http://passportjs.org/)


### Directory Layout

```
.
├── /build/                     # The folder for compiled output
├── /docs/                      # Documentation files for the project
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code of the application
│   ├── /actions/               # Action creators that allow to trigger a dispatch to stores
│   ├── /components/            # React components
│   ├── /core/                  # Core framework and utility functions
│   ├── /decorators/            # Component decorators
│   ├── /public/                # Static files which are copied into the /build/public folder
│   ├── /stores/                # Stores contain the application state and logic
│   ├── /client.js              # Client-side startup script
│   ├── /config.js              # Global application settings
│   ├── /config.server.js       # private server-only config
│   ├── /routes.js              # Universal (isomorphic) application routes
│   └── /server.js              # Server-side startup script
├── /tools/                     # Build automation scripts and utilities
│   ├── /lib/                   # Library for utility snippets
│   ├── /templates/             # Template for generators
│   ├── /build.js               # Builds the project from source to output (build) folder
│   ├── /bundle.js              # Bundles the web resources into package(s) through Webpack
│   ├── /clean.js               # Cleans up the output (build) folder
│   ├── /copy.js                # Copies static files to output (build) folder
│   ├── /deploy.js              # Deploys your web application
│   ├── /run.js                 # Helper function for running build automation tasks
│   ├── /runServer.js           # Launches (or restarts) Node.js server
│   ├── /start.js               # Launches the development web server with "live reload"
│   └── /webpack.config.js      # Configurations for client-side and server-side bundles
│── package.json                # The list of 3rd party libraries and utilities
└── preprocessor.js             # ES6 transpiler settings for Jest
```

Code base: [React Starter Kit](https://github.com/kriasoft/react-starter-kit/)
