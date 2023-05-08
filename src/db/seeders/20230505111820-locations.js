/* eslint-disable prettier/prettier */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("locations", [
      {
        latitude: 2.7,
        longitude: 9.3,
        name: "Nyagatare",
        routerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        latitude: 5.4,
        longitude: 4.3,
        name: "Nyanza",
        routerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("locations", null, {});
  },
};
