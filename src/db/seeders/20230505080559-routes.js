/* eslint-disable prettier/prettier */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("routes", [
      {
        route_name: "Kimironko",
        origin_id: 2,
        destination_id: 1,
        bus_stop_id: 2,
        isAssigned: "false",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        route_name: "Kabuga",
        origin_id: 2,
        destination_id: 1,
        bus_stop_id: 2,
        isAssigned: "true",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("routes", null, {});
  },
};
