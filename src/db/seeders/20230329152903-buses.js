"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existingRoles = await queryInterface.sequelize.query(
      "SELECT * FROM Buses"
    );
    if (existingRoles[0].length === 0) {
      await queryInterface.bulkInsert(
        "Buses",
        [
          {
            plate_number: "567fhg",
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            plate_number: "567fhx",
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Buses", null, {});
  },
};
