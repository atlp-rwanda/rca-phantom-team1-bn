const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    static associate(models) {
      // Define associations here
      // Route.belongsTo(models.Bus, {
      //   foreignKey: 'bus_id',
      //   as: 'bus'
      // });
    }
  }

  Route.init({
    route_name: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'route',
  });
  return Route;
};