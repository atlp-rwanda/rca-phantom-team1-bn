"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    const existingUsers = await queryInterface.sequelize.query(
      "SELECT * FROM users"
    );
    if (existingUsers[0].length === 0) {
      await queryInterface.bulkInsert(
        "users",
        [
          {
            id: 1,
            email: "rideOrDie@demo.com",
            password:
              "$2b$10$hY08YwiEfuzi0oU7.IJ15eDfk0yKZnLG9R9KYM3e.JfwO9P9DFl5u",
            fullname: "Ride Or Die",
            phone_number: "+1234567890",
            roleId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            email: "DieOrRide@demo.com",
            password:
              "$2b$10$hY08YwiEfuzi0oU7.IJ15eDfk0yKZnLG9R9KYM3e.JfwO9P9DFl5u",
            fullname: "Die Or Ride",
            phone_number: "+1234567890",
            roleId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 3,
            email: "admin@phantom.com",
            password:
              "$2b$10$hY08YwiEfuzi0oU7.IJ15eDfk0yKZnLG9R9KYM3e.JfwO9P9DFl5u",
            fullname: "Phantom Admin",
            phone_number: "+1234567894",
            roleId: 3, // admin role
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
