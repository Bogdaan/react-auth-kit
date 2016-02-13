import alt from '../core/alt'

/**
 * user profile actions
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
