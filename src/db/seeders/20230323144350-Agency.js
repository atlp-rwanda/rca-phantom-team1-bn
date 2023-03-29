'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('agencies', [{
      "id": 1,
      "name": "HORIZONTAL",
      "destinations": "KIGALI-SOUTH",
    },{
      "id": 2,
      "name": "RITCO",
      "destinations": "KIGALI-KIGALI",
      "createdAt": "2023-03-27T12:00:50.450Z",
      "updatedAt": "2023-03-27T12:00:50.450Z"
    },
    {
      "id": 3,
      "name": "VOLCANO",
      "destinations": "KIGALI-SOUTH",
      "createdAt": "2023-03-27T12:00:50.450Z",
      "updatedAt": "2023-03-27T12:00:50.450Z"
    },
    {
      "id": 4,
      "name": "NILE SAFARIS",
      "destinations": "KIGALI-WEST",
      "createdAt": "2023-03-27T12:00:50.450Z",
      "updatedAt": "2023-03-27T12:00:50.450Z"
    },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("agencies", null, {});
  }
};
