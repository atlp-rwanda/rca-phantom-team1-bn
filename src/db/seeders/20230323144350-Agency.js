"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("agencies", [
      {
        id: 1,
        name: "HORIZONTAL",
        destinations: "KIGALI-SOUTH",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "RITCO",
        destinations: "KIGALI-KIGALI",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "VOLCANO",
        destinations: "KIGALI-SOUTH",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "NILE SAFARIS",
        destinations: "KIGALI-WEST",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("agencies", null, {});
  },
};
