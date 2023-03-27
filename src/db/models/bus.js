/* eslint-disable prettier/prettier */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Bus.belongsTo(models.Agency);
      // models.Agency.hasMany(Bus);
      // models.Driver.hasOne(Bus);
    }
  }

  Bus.init({
    plate_number: DataTypes.STRING,
    agency_id: DataTypes.INTEGER,
    driver_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bus',
  });
  return Bus;
};