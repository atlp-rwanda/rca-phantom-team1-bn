/* eslint-disable prettier/prettier */
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("routes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      route_name: {
        type: Sequelize.STRING,
      },
      origin_id: {
        type: Sequelize.INTEGER,
      },
      destination_id: {
        type: Sequelize.INTEGER,
      },
      bus_stop_id: {
        type: Sequelize.INTEGER,
      },
      isAssigned: {
        type: Sequelize.ENUM("true", "false"),
        allowNull: false,
        defaultValue: "false",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("routes");
  },
};
