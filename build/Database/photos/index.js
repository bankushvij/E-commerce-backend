"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.photosModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var photosSchema = new _mongoose["default"].Schema({
  images: [{
    location: {
      type: String
    }
  }]
});

var photosModel = _mongoose["default"].models["photos"] || _mongoose["default"].model("photos", photosSchema);

exports.photosModel = photosModel;