"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cashHandlePage = void 0;

var _settings = require("../settings");

var cashHandlePage = function cashHandlePage(req, res) {
  return res.status(200).json({
    message: _settings.testEnvironmentVariable + " NEW DATA"
  });
};

exports.cashHandlePage = cashHandlePage;