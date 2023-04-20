"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existingBuses = await queryInterface.sequelize.query(
      "SELECT * FROM buses"
    );
    if (existingBuses[0].length === 0) {
      await queryInterface.bulkInsert("buses", [
        {
          id: 2,
          plate_number: "KL3MS",
          agency_id: 2,
          driver_id: 1,
          router_id: 2,
          av_seats: 15,
          seats: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          plate_number: "KL3MS",
          agency_id: 2,
          driver_id: 1,
          router_id: 2,
          av_seats: 15,
          seats: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          plate_number: "KL2AS",
          agency_id: 2,
          driver_id: 3,
          router_id: 2,
          av_seats: 15,
          seats: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("buses", null, {});
  },
};
