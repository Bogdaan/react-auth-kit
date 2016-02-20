import alt from '../core/alt';
import TodoActions from '../actions/TodoActions';
import TodoSource from '../sources/TodoSource';

/**
 * just example of data store
 */
class TodoStore {

  constructor() {
    this.loading = true;
    this.errorMessage = null;

    this.todos = [];

    this.bindActions(TodoActions);
    this.exportAsync(TodoSource);
  }

  onFetch(data) {
    if (data === false) {
      this.onFailed();
    } else {
      this.loading = false;
      this.errorMessage = null;
      this.todos = data;
    }
  }

  onFailed() {
    this.loading = false;
    this.errorMessage = 'Sory, todo list unavailable';
  }

  onUpdate() {
    this.loading = false;
    this.errorMessage = null;
  }

  onAdd() {
    // api logic
  }

  onRemove() {
    // api logic
  }
}

export default alt.createStore(TodoStore, 'TodoStore');
