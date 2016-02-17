import alt from '../core/alt'

/**
 * operations with ##Model##
 */
class ##Model##Actions {
  constructor() {
    this.generateActions(
      'fetch',
      'update',
      'failed',

      'add',
      'remove',
    );
  }
}

export default alt.createActions(##Model##Actions)
