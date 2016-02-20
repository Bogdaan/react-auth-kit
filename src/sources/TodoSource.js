
import Api from '../services/Api';
import TodoActions from '../actions/TodoActions';

/**
 * remote-local data source with actions
 */
const TodoSource = {
  fetchList() {
    return {
      async remote() {
        return Api.getTodoList();
      },

      shouldFetch(state) {
        return (state.todos.length === 0);
      },

      loading: TodoActions.update,
      success: TodoActions.fetch,
      error: TodoActions.failed,
    };
  },
};

export default TodoSource;
