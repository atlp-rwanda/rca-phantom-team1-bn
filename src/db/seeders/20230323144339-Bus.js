"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("buses", [
      {
        id: 5,
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
        id: 6,
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
        id: 7,
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
