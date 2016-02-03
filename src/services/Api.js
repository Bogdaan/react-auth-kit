import axios from 'axios'

/**
 * remote XMLHttpRequest api methods
 * (not Fetch)
 */
export default {
  async getTodoList() {
    return axios.get('/todo.list.json')
  }
}
