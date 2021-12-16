"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _mqtt = _interopRequireDefault(require("mqtt"));

//const mqtt = require('mqtt');
var MqttHandler = /*#__PURE__*/function () {
  function MqttHandler() {
    (0, _classCallCheck2["default"])(this, MqttHandler);
    this.mqttClient = null;
    this.host = 'broker.hivemq.com';
    this.username = 'testit'; // mqtt credentials if these are needed to connect

    this.password = 'testit';
  }

  (0, _createClass2["default"])(MqttHandler, [{
    key: "connect",
    value: function connect() {
      var _this = this;

      // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
      this.mqttClient = _mqtt["default"].connect(this.host, {
        username: this.username,
        password: this.password
      }); // Mqtt error calback

      this.mqttClient.on('error', function (err) {
        console.log(err);

        _this.mqttClient.end();
      }); // Connection callback

      this.mqttClient.on('connect', function () {
        console.log("mqtt client connected");
      }); // mqtt subscriptions

      this.mqttClient.subscribe('edc_m/data', {
        qos: 0
      }); // When a message arrives, console.log it

      this.mqttClient.on('message', function (topic, message) {
        console.log(message.toString());
      });
      this.mqttClient.on('close', function () {
        console.log("mqtt client disconnected");
      });
    } // Sends a mqtt message to topic: mytopic

  }, {
    key: "sendMessage",
    value: function sendMessage(message) {
      this.mqttClient.publish('mytopic', message);
    }
  }]);
  return MqttHandler;
}(); //module.exports = MqttHandler;


var _default = MqttHandler;
exports["default"] = _default;