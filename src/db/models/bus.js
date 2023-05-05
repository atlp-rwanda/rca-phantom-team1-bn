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
      Bus.belongsTo(models.agency);
      Bus.belongsTo(models.user,{ foreignKey: 'driverId', as: 'driver' });
      Bus.belongsTo(models.route,{ foreignKey: 'routerId', as: 'route' });
      // Bus.belongsTo(models.router); 
      // models.user.hasMany(Bus);
      // models.agency.hasMany(Bus);
      // models.Router.hasMany(Bus)
    }
  }

  Bus.init(
    {
      plateNumber: DataTypes.STRING,
      driverId: DataTypes.INTEGER,
      agencyId: DataTypes.INTEGER,
      routerId: DataTypes.INTEGER,
      seats: DataTypes.INTEGER,
      av_seats: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "bus",
    }
  );

  return Bus;
};
