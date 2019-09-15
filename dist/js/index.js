"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * Pubsub is simple pubsub implementation using JavaScript
 * @class
 * @constructor
 * @public
 */
var PubSub =
/*#__PURE__*/
function () {
  function PubSub() {
    (0, _classCallCheck2["default"])(this, PubSub);

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


  (0, _createClass2["default"])(PubSub, [{
    key: "subscribe",
    value: function subscribe(event, callback) {
      // Check if the callback is not a function
      if (typeof callback !== 'function') {
        console.error("The listener callback must be a function, the given type is ".concat((0, _typeof2["default"])(callback)));
        return false;
      } // Check if the event is not a string


      if (typeof event !== 'string') {
        console.error("The event name must be a string, the given type is ".concat((0, _typeof2["default"])(event)));
        return false;
      } // Check if this event not exists


      if (this.events[event] === undefined) {
        this.events[event] = {
          listeners: []
        };
      } // We know we've got an array for this event, so push our callback in there with no fuss


      this.events[event].listeners.push(callback);
    }
    /**
     * Attach a callback to an name, but once only. Will disapear after first execution.
     *
     * @param {string} event - event names to bind to
     * @param {Function} callback - Action that will be executed when even is fired.
     * @see https://gist.github.com/jashmenn/b306add36d3e6f0f6483
     */

  }, {
    key: "subscribeOnce",
    value: function subscribeOnce(event, callback) {
      var onceCallback = function () {
        this.unsubscribe(event, onceCallback);
        callback.apply(this, arguments);
      }.bind(this);

      this.subscribe(event, onceCallback);
    }
    /**
     * Remove a specific listener to an event.
     *
     * @param {string} event - event names to bind to
     * @param {function} callback - Action that will be executed when even is fired.
     */

  }, {
    key: "unsubscribe",
    value: function unsubscribe(event, callback) {
      // Check if this event not exists
      if (this.events[event] === undefined) {
        console.error("This event: ".concat(event, " does not exist"));
        return false;
      }

      var filteredSubscribtion = [];

      for (var i = 0; i < this.events[event].listeners.length; i += 1) {
        if (this.events[event].listeners[i].toString() !== callback.toString()) {
          filteredSubscribtion.push(this.events[event].listeners[i]);
        }
      }

      this.events[event].listeners = filteredSubscribtion;
    }
    /**
     * Removes all the subscriptions
     */

  }, {
    key: "unsubscribes",
    value: function unsubscribes() {
      this.events = {};
    }
    /**
     * Notify subscriptions by calling their name
     *
     * @param {string} event - event to fire
     * @param {object} [data={}] - params to distribute to the callbacks
     */

  }, {
    key: "publish",
    value: function publish(event) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // Check if this event not exists
      if (this.events[event] === undefined) {
        console.error("This event: ".concat(event, " does not exist"));
        return false;
      } // Get each subscription and call its callback with the passed data


      for (var i = 0; i < this.events[event].listeners.length; i += 1) {
        this.events[event].listeners[i](data);
      }
    }
  }]);
  return PubSub;
}();

var _default = PubSub;
exports["default"] = _default;
//# sourceMappingURL=index.js.map