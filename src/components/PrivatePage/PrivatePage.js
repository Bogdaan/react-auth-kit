
import React, { Component, PropTypes } from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PrivatePage.scss';

import TodoStore from '../../stores/TodoStore';
import withAuth from '../../decorators/withAuth';

@withAuth
class PrivatePage extends Component {

  static propTypes = {
    userProfile: PropTypes.object,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = TodoStore.getState();
  }

  componentWillMount() {
    this.context.onSetTitle(`Hello ${this.props.userProfile.name}`);
  }

  componentDidMount() {
    TodoStore.listen(this.onChange);
  }

  componentWillUnmount() {
    TodoStore.unlisten(this.onChange);
  }

  onChange = (state) => {
    this.setState(state);
  }

  renderTodoList() {
    const st = this.state;

    if (st.loading) {
      return <span>loading...</span>;
    }

    if (st.errorMessage) {
      return <span>{st.errorMessage}</span>;
    }

    if (st.todos.length === 0) {
      return <span>list is empty</span>;
    }

    return (
      <ul>
      {
        st.todos.map((item, idx) => { // eslint-disable-line arrow-body-style
          return <li key={idx}>{item}</li>;
        })
      }
      </ul>
    );
  }

  render() {
    const profile = this.props.userProfile;

    return (
      <div className={s.root}>
        <h1>This is example of protected page</h1>
        <p>You profile info:</p>
        <table>
        <tbody>
          <tr>
            <td>Login via</td>
            <td>{profile.provider}</td>
          </tr>
          <tr>
            <td>User id</td>
            <td>{profile.id}</td>
          </tr>
          <tr>
            <td>Avatar</td>
            <td><img src={profile.logo} alt="my logo" /></td>
          </tr>
          <tr>
            <td>Person</td>
            <td>{profile.name}</td>
          </tr>
          <tr>
            <td>Oauth token</td>
            <td>{profile.token}</td>
          </tr>
        </tbody>
        </table>

        <h1>Todo list</h1>
        {this.renderTodoList()}

      </div>
    );
  }
}

export default withStyles(PrivatePage, s);
