"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _connection = _interopRequireDefault(require("./Database/connection.js"));

var _index = _interopRequireDefault(require("./API/items/index.js"));

var _index2 = _interopRequireDefault(require("./API/photos/index.js"));

var _index3 = _interopRequireDefault(require("./API/auth/index.js"));

var _googleConfig = _interopRequireDefault(require("./config/google.config.js"));

var _routeConfig = _interopRequireDefault(require("./config/route.config.js"));

var _passport = _interopRequireDefault(require("passport"));

var _expressSession = _interopRequireDefault(require("express-session"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config(); // libraries


//sessions
(0, _googleConfig["default"])(_passport["default"]); // privateRouteConfig(passport);

var myShop = (0, _express["default"])();
myShop.use((0, _cors["default"])()); // cross-origin-resource-sharing

myShop.use((0, _helmet["default"])()); // security gear in uncontrolled environment

myShop.use(_express["default"].json());
myShop.use((0, _expressSession["default"])({
  secret: 'ssshhhhh'
}));
myShop.use(_passport["default"].initialize()); // routes

myShop.use("/api/items", _index["default"]);
myShop.use("/api/images", _index2["default"]);
myShop.use("/api/auth", _index3["default"]);
myShop.use(_passport["default"].session());
myShop.get("/", function (req, res) {
  return res.json({
    Welcome: "to my  Shop backend software"
  });
}); // server running

myShop.listen(process.env.Port, function () {
  (0, _connection["default"])().then(function () {
    console.log("Server is running !!!");
  })["catch"](function (error) {
    console.log("Server is running, but database connection failed...");
    console.log(error);
  });
});