import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Bus.init(
    {
      plate_number: DataTypes.STRING,
      driverId: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Bus",
    }
  );

  Bus.associate = function (models) {
    Bus.belongsTo(models.Driver, {
      foreignKey: "driverId",
    });
  };

  return Bus;
};
