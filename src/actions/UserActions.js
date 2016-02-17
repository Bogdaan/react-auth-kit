import alt from '../core/alt'

/**
 * user profile actions
 */
class UserActions {
  constructor() {
    this.generateActions(
      'login'
    );
  }
}

export default alt.createActions(UserActions)
