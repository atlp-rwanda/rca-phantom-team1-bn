/* eslint-disable prettier/prettier */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bus.belongsTo(models.user, { foreignKey: 'driver_id', as: 'driver' });
    }
  }

  Bus.init(
    {
      plate_number: DataTypes.STRING,
      driver_id: DataTypes.INTEGER,
      agency_id: DataTypes.INTEGER,
      seats: DataTypes.INTEGER,
      av_seats: DataTypes.INTEGER,
      router_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "bus",
    }
  );

  return Bus;
};
