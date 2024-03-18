var DataTypes = require("sequelize").DataTypes;
var _chat = require("./chat");
var _connecter = require("./connecter");
var _login = require("./login");
var _member = require("./member");

function initModels(sequelize) {
  var chat = _chat(sequelize, DataTypes);
  var connecter = _connecter(sequelize, DataTypes);
  var login = _login(sequelize, DataTypes);
  var member = _member(sequelize, DataTypes);


  return {
    chat,
    connecter,
    login,
    member,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
