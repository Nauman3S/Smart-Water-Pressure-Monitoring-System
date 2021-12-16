"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllers = require("../controllers");

var _mysql = _interopRequireDefault(require("mysql"));

var _mqtt_handler = _interopRequireDefault(require("./mqtt_handler"));

var indexRouter = _express["default"].Router();

var cashHandleRouter = _express["default"].Router();

var db = _mysql["default"].createConnection({
  //host: 'srv-captain--vb-mysqldb-db',
  host: 'srv-captain--vb-mysqldb-db',
  port: 3306,
  user: 'root',
  password: 'vb-mysqldb',
  database: 'edc_monitor'
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
indexRouter.get('/', _controllers.indexPage);
indexRouter.get('/csh', _controllers.cashHandlePage);
indexRouter.get('/listAll', function (req, res) {
  var sql = "SELECT * FROM data";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data: data,
      message: "User lists retrieved successfully"
    });
  });
});
indexRouter.get('/getActive', function (req, res) {
  var sql = "SELECT * FROM data WHERE ActiveStatus='1'";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data: data,
      message: "User lists retrieved successfully"
    });
  });
});
indexRouter.post('/addPlayer', function (req, res) {
  var sql = "INSERT INTO data(Timestamp, PlayerID, TMIN30, TMOUT30, TMIND, TMOUTD, ActiveStatus) VALUES (?)";
  var values = [req.body.Timestamp, req.body.PlayerID, req.body.TMIN30, req.body.TMOUT30, req.body.TMIND, req.body.TMOUTD, req.body.ActiveStatus];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New player added successfully"
    });
  });
}); // MqttHandler.connect()

var mqttClient = new _mqtt_handler["default"]();
mqttClient.connect();
var _default = indexRouter; //export default cashHandleRouter;

exports["default"] = _default;