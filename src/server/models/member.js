const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "member",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING(60),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING(10),
        allowNull: true,
        unique: "member_type",
      },
    },
    {
      sequelize,
      tableName: "member",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "member_type",
          unique: true,
          using: "BTREE",
          fields: [{ name: "type" }],
        },
      ],
    }
  );
};
