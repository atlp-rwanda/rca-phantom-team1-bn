/* eslint-disable prettier/prettier */
"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DriverBusAssignment extends Model {
    static associate(models) {
      // Define associations here
      // This method is not a part of Sequelize lifecycle.
      // The models/index file will call this method automatically.
    }
  }
  DriverBusAssignment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      driverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      busId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "DriverBusAssignment",
    }
  );
  return DriverBusAssignment;
};
