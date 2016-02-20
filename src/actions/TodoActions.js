import alt from '../core/alt';

/**
 * operations with todo
 */
class TodoActions {
  constructor() {
    this.generateActions(
      'fetch',
      'update',
      'failed',

      'add',
      'remove'
    );
  }
}

export default alt.createActions(TodoActions);
