"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {

    static associate(models) {
      
    }

  }
  Location.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      latitude: {
        type: DataTypes.DECIMAL(9,6),
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DECIMAL(9,6),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "location",
      tableName: "locations",
    }
  );
  return Location;
};