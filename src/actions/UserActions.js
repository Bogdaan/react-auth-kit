import alt from '../core/alt'

/**
 * user profile info
 */
class UserActions {
  constructor() {
    this.generateActions(
      'login',
      'setup'
    );
  }
}

export default alt.createActions(UserActions)
