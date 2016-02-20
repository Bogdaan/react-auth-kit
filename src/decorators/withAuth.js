import React, { Component } from 'react';
import UserStore from '../stores/UserStore';

/**
 * add props to component:
 * isUserLoggedIn
 * userProfile
 *
 */
function withAuth(ComposedComponent) {
  return class AuthenticatedComponent extends Component {

    constructor() {
      super();
      this.state = this.getLoginState();
    }

    getLoginState() {
      return {
        isUserLoggedIn: UserStore.isLoggedIn(),
        userProfile: UserStore.getUser(),
      };
    }

    componentDidMount() {
      UserStore.listen(this.onChange.bind(this));
    }

    componentWillUnmount() {
      UserStore.unlisten(this.onChange.bind(this));
    }

    onChange() {
      this.setState(this.getLoginState());
    }

    render() {
      return <ComposedComponent {...this.props} {...this.state} />;
    }
  };
}

export default withAuth;
