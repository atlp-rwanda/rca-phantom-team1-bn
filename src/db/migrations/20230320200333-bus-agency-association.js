'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     */
    queryInterface.addConstraint('Buses', {
      fields: ['agency_id'],
      type: 'foreign key',
      name: 'bus_agency_association',
      references:{
        table: 'Agencies',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeConstraint('Buses', {
      fields: ['agency_id'],
      type: 'foreign key',
      name: 'bus_agency_association',
      references:{
        table: 'Agencies',
        field: 'id'
      }
    })
  }
};
