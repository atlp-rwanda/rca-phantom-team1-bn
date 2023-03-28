"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Role.init(
    {
      role: DataTypes.STRING,
      description: DataTypes.TEXT,
      privileges: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "role",
    }
  );
  return Role;
};
