
import Api from '../services/Api'
import TodoActions from '../actions/TodoActions'

/**
 * remote-local data source with actions
 */
let TodoSource = {
  fetchList() {
    return {
      async remote(state) {
        return Api.getTodoList()
      },

      shouldFetch(state) {
        return (state.todos.length == 0)
      },

      // local source - disabled
      local(state) {
        return null
      },

      loading: TodoActions.fetch,
      success: TodoActions.update,
      error:   TodoActions.failed,
    }
  }
};

export default TodoSource
