var DataTypes = require("sequelize").DataTypes;
var _chat = require("./chat");
var _connecter = require("./connecter");

function initModels(sequelize) {
  var chat = _chat(sequelize, DataTypes);
  var connecter = _connecter(sequelize, DataTypes);


  return {
    chat,
    connecter,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
