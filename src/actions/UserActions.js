import alt from '../core/alt'

class UserActions {
  constructor() {
    this.generateActions(
      'login',
      'setup'
    );
  }
}

export default alt.createActions(UserActions)
