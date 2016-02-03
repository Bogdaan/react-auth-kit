import alt from '../core/alt'
import TodoActions from '../actions/TodoActions'

/**
 * just example of data store
 */
class TodoStore {

  constructor() {
    this.loading = true
    this.errorMessage = null

    this.todos = []
    this.bindActions(TodoActions)
  }

  onFetch(data) {
    this.loading = false
    this.errorMessage = null

    this.todos = data
  }

  onFailed() {
    this.loading = false
    this.errorMessage = 'Sory, todo list unavailable'
  }

  onUpdate() {
    this.loading = false
    this.errorMessage = null
  }

  onAdd() {
    // orm logic
  }

  onRemove() {
    // orm logic
  }
}

export default alt.createStore(TodoStore, 'TodoStore')
