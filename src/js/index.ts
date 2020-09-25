/**
 * Pubsub is simple pubsub implementation using JavaScript
 * @class
 * @constructor
 * @public
 */
class PubSub {
  constructor() {
    /**
     *  Init object events
     * @type {Object}
     */
    this.events = {};
  }

  /**
   * Listen to an event.
   *
   * @param {string} event - event names to bind to
   * @param {function} callback - action that will be executed when even is fired.
   */
  subscribe(event, callback) {
    // Check if the callback is not a function
    if (typeof callback !== 'function') {
      console.error(`The listener callback must be a function, the given type is ${typeof callback}`);
      return false;
    }

    // Check if the event is not a string
    if (typeof event !== 'string') {
      console.error(`The event name must be a string, the given type is ${typeof event}`);
      return false;
    }

    // Check if this event not exists
    if (this.events[event] === undefined) {
      this.events[event] = {
        listeners: []
      };
    }
    // We know we've got an array for this event, so push our callback in there with no fuss
    this.events[event].listeners.push(callback);
  }

  /**
   * Attach a callback to an name, but once only. Will disapear after first execution.
   *
   * @param {string} event - event names to bind to
   * @param {Function} callback - Action that will be executed when even is fired.
   * @see https://gist.github.com/jashmenn/b306add36d3e6f0f6483
   */
  subscribeOnce(event, callback) {
    const onceCallback = (function() {
      this.unsubscribe(event, onceCallback);
      callback.apply(this, arguments);
    }).bind(this);

    this.subscribe(event, onceCallback);
  }

  /**
   * Remove a specific listener to an event.
   *
   * @param {string} event - event names to bind to
   * @param {function} callback - Action that will be executed when even is fired.
   */
  unsubscribe(event, callback) {
    // Check if this event not exists
    if (this.events[event] === undefined) {
      console.error(`This event: ${event} does not exist`);
      return false;
    }

    const filteredSubscribtion = [];
    if (this.events?.[event]?.listeners?.length) {
      for (let i = 0; i < this.events[event].listeners.length; i += 1) {
        if (this.events[event].listeners[i].toString() !== callback.toString()) {
          filteredSubscribtion.push(this.events[event].listeners[i]);
        }
      }
    }
    this.events[event].listeners = filteredSubscribtion;
  }

  /**
   * Removes all the subscriptions
   */
  unsubscribes() {
    this.events = {};
  }

  /**
   * Notify subscriptions by calling their name
   *
   * @param {string} event - event to fire
   * @param {object} [data={}] - params to distribute to the callbacks
   */
  publish(event, data = {}) {
    // Check if this event not exists
    if (this.events[event] === undefined) {
      console.error(`This event: ${event} does not exist`);
      return false;
    }
    // Get each subscription and call its callback with the passed data
    if (this.events?.[event]?.listeners?.length) {
      for (let i = 0; i < this.events[event].listeners.length; i += 1) {
        this.events[event].listeners[i](data);
      }
    }
  }
}

export default PubSub;
