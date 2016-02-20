import React, { Component, PropTypes } from 'react';


class Html extends Component {

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    css: PropTypes.string,
    body: PropTypes.string.isRequired,
    entry: PropTypes.string.isRequired,
  };

  static defaultProps = {
    title: '',
    description: '',
  };

  render() {
    return (
      <html className="no-js" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{ (this.props.title || 'React auth kit') }</title>
        <meta
          name="description"
          content={ (this.props.description ||
            'Ract app authorization with altjs, iso, flux, passportjs and server side rendering')}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Code+Pro|Lato"
          rel="stylesheet" type="text/css"
        />
        <style id="css" dangerouslySetInnerHTML={{ __html: this.props.css }} />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: this.props.body }} />
        <script src={this.props.entry}></script>
      </body>
      </html>
    );
  }

}

export default Html;
