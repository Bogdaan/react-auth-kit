import axios from 'axios'
import { hostAddress } from '../config'

/**
 * remote XMLHttpRequest api methods
 * (not Fetch - see core/fetch)
 *
 * WARNING throw/onFailed - not works
 */
export default {
  async getTodoList() {
    let result = []

    try {
      const resp = await axios.get(`${hostAddress}/todo.list.json`)

      if (resp.status!==200) {
        result = false
      } else {
        result = resp.data
      }
    } catch(e) {
      result = false
    }

    return result
  }
}
