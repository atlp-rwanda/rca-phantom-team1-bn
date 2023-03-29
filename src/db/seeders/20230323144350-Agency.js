'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('buses', [{
      "id": 1,
      "name": "HORIZONTAL",
      "destinations": "KIGALI-SOUTH",
    },{
      "id": 2,
      "name": "RITCO",
      "destinations": "KIGALI-KIGALI",
    },
    {
      "id": 3,
      "name": "VOLCANO",
      "destinations": "KIGALI-SOUTH",
    },
    {
      "id": 4,
      "name": "NILE SAFARIS",
      "destinations": "KIGALI-WEST",
    },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("agencies", null, {});
  }
};
