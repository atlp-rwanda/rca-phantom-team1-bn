const { Model } = require("sequelize");

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

  Route.init(
    {
      route_name: DataTypes.STRING,
      origin_id: DataTypes.INTEGER,
      destination_id: DataTypes.INTEGER,
      bus_stop_id: DataTypes.INTEGER,
      isAssigned: {
        type: DataTypes.ENUM("true", "false"),
        allowNull: true,
        defaultValue: "false",
      },
    },
    {
      sequelize,
      modelName: "route",
    }
  );
  return Route;
};
