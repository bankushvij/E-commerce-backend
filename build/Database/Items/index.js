"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.itemsModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var itemSchema = new _mongoose["default"].Schema({
  itemType: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    size_L: {
      type: Number
    },
    size_XL: {
      type: Number
    },
    size_XXL: {
      type: Number
    }
  },
  sizes: [{
    type: String
  }],
  gender: {
    type: String,
    required: true
  },
  colour: [{
    type: String
  }],
  photos: {
    type: _mongoose["default"].Types.ObjectId,
    ref: "photos"
  },
  description: {
    type: String
  }
});

var itemsModel = _mongoose["default"].models["items"] || _mongoose["default"].model("items", itemSchema);

exports.itemsModel = itemsModel;