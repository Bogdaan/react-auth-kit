import React, { Component } from 'react'

import UserStore from '../stores/UserStore'

//
// add props to component:
// isUserLoggedIn
// userProfile
//
function withAuth(ComposedComponent) {
  return class AuthenticatedComponent extends Component {

    constructor() {
      super();
      this.state = this._getLoginState();
    }

    _getLoginState() {
      return {
        isUserLoggedIn: UserStore.isLoggedIn(),
        userProfile: UserStore.getProfile(),
      };
    }

    // Here, we’re subscribing to changes in the LoginStore we created before.
    //  Remember that the LoginStore is an EventEmmiter.
    componentDidMount() {
      if(ee.canUseDom)
        UserStore.addChangeListener(this._onChange.bind(this));
    }

    // After any change, we update the component’s state so that
    // it’s rendered again.
    _onChange() {
      this.setState(this._getLoginState());
    }

    componentWillUnmount() {
      if(ee.canUseDom)
        UserStore.removeChangeListener(this._onChange.bind(this));
    }

    render() {
      return <ComposedComponent {...this.props} {...this.state} />
    }

  }
}

export default withAuth
