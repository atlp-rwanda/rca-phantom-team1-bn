/* eslint-disable prettier/prettier */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("buses", [
      {
        plateNumber: "KL3MS",
        agencyId: 2,
        driverId: 1,
        routerId: 2,
        av_seats: 15,
        seats: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plateNumber: "KL3MS",
        agencyId: 2,
        driverId: 1,
        routerId: 2,
        av_seats: 15,
        seats: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plateNumber: "KL2AS",
        agencyId: 2,
        driverId: 3,
        routerId: 2,
        av_seats: 15,
        seats: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("buses", null, {});
  },
};
