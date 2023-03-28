"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("buses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      plate_number: {
        type: Sequelize.INTEGER,
      },
      agency_id: {
        type: Sequelize.INTEGER,
      },
      driver_id: {
        type: Sequelize.INTEGER,
      },
      seats:  {
        type: Sequelize.INTEGER,
      },
      av_seats: {
        type: Sequelize.INTEGER,
      },
      router_id: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("buses");
  },
};