'use strict';
/** @type {import('sequelize-cli').Migration} */

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Buses', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      plate_number: {
        type: Sequelize.STRING
      },
      driver: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Buses');
  }
};