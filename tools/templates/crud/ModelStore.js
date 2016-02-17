import alt from '../core/alt'
import ##Model##Actions from '../actions/##Model##Actions'
import ##Model##Source from '../sources/##Model##Source'

/**
 * ##Model## store
 */
class ##Model##Store {

  constructor() {
    this.loading = true
    this.errorMessage = null

    this.##Model##s = []

    this.bindActions(##Model##Actions)
    this.exportAsync(##Model##Source)
  }

  onFetch(data) {
    this.loading = false
    this.errorMessage = null
    this.##Model##s = data
  }

  onFailed(err) {
    this.loading = false
    this.errorMessage = 'Sory, ##Model## list unavailable'
  }

  onUpdate() {
    this.loading = false
    this.errorMessage = null
  }

  onAdd() {
    // api logic
  }

  onRemove() {
    // api logic
  }
}

export default alt.createStore(##Model##Store, '##Model##Store')
