'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Buses', [{
        "id": 2,
        "plate_number": "KL3MS",
        "agency_id": 12321,
        "driver_id": null,
        "createdAt": "2023-03-27T12:00:50.450Z",
        "updatedAt": "2023-03-27T12:00:50.450Z"
      },
      {
        "id": 3,
        "plate_number": "KL3MS",
        "agency_id": 12321,
        "driver_id": null,
        "createdAt": "2023-03-27T12:02:24.050Z",
        "updatedAt": "2023-03-27T12:02:24.050Z"
      },
      {
        "id": 4,
        "plate_number": "KL2AS",
        "agency_id": 12321,
        "driver_id": 12324,
        "createdAt": "2023-03-27T12:22:11.119Z",
        "updatedAt": "2023-03-27T12:22:11.119Z"
      }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  }
};
