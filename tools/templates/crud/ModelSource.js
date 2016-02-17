
import Api from '../services/Api'
import ##Model##Actions from '../actions/##Model##Actions'

/**
 * ##Model## data source
 */
let ##Model##Source = {
  fetchList() {
    return {
      async remote(state) {
        return Api.get##Model##List()
      },

      shouldFetch(state) {
        return (state.##Model##s.length == 0)
      },

      // local source - disabled
      local(state) {
        return null
      },

      loading: ##Model##Actions.update,
      success: ##Model##Actions.fetch,
      error:   ##Model##Actions.failed,
    }
  }
};

export default ##Model##Source
