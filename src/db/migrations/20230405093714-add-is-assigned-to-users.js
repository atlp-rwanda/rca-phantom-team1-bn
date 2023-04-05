"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "isAssigned", {
      type: Sequelize.ENUM("true", "false"),
      allowNull: false,
      defaultValue: "false",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "isAssigned");
  },
};
