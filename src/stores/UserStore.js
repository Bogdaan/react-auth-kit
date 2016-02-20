import alt from '../core/alt';
import UserActions from '../actions/UserActions';

/**
 * user profile and operations
 */
class UserStore {

  constructor() {
    // real-auth
    this.user = {
      id: null,
      token: null,
      personname: null,
      logo: null,
      provider: null,
    };

    this.exportPublicMethods({
      isLoggedIn: this.isLoggedIn,
      getUser: this.getUser,
      getUid: this.getUid,
      getPersonName: this.getPersonName,
    });

    this.bindActions(UserActions);
  }

  //
  onLogin(info) {
    this.user = info;
  }

  //
  onLogout() {
    this.user.id = null;
  }

  // static
  isLoggedIn() {
    const uid = this.getState().user.id;
    return (uid !== null);
  }

  // static
  getUser() {
    return this.getState().user;
  }

  // static
  getUid() {
    const st = this.getState().user;
    return st.id;
  }

  // static
  getPersonName() {
    const st = this.getState().user;
    return st.personname;
  }
}

export default alt.createStore(UserStore, 'UserStore');
