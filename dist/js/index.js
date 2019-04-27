"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Simple pubsub implementation using JavaScript
 */
var PubSub =
/*#__PURE__*/
function () {
  function PubSub() {
    _classCallCheck(this, PubSub);

    this.events = {};
  }
  /**
   * @param {string} event
   * @param {function} callback
   * @memberof PubSub
   */


  _createClass(PubSub, [{
    key: "subscribe",
    value: function subscribe(event, callback) {
      // Check if the callback is not a function
      if (typeof callback !== 'function') {
        console.error("The listener callback must be a function, the given type is ".concat(_typeof(callback)));
        return false;
      } // Check if the event is not a string


      if (typeof event !== 'string') {
        console.error("The event name must be a string, the given type is ".concat(_typeof(event)));
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
     * @param {string} event
     * @param {function} callback
     * @memberof PubSub
     */

  }, {
    key: "unsubscribe",
    value: function unsubscribe(event, callback) {
      // Check if this event not exists
      if (this.events[event] === undefined) {
        console.error("This event: ".concat(event, " does not exist"));
        return false;
      }

      this.events[event].listeners = this.events[event].listeners.filter(function (listener) {
        return listener.toString() !== callback.toString();
      });
    }
    /**
     * @param {string} event
     * @param {object} [data={}]
     * @memberof PubSub
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


      this.events[event].listeners.forEach(function (listener) {
        return listener(data);
      });
    }
  }]);

  return PubSub;
}();

var _default = PubSub;
exports["default"] = _default;
//# sourceMappingURL=index.js.map