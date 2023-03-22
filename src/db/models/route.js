const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    static associate(models) {
      // Define associations here
      Route.belongsTo(models.Bus, {
        foreignKey: 'bus_id',
        as: 'bus'
      });
    }
  }
  Route.init({
    route_name: DataTypes.STRING,
    bus_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Route',
  });
  return Route;
};