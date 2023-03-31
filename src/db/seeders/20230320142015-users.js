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
            email: "DieOrRide@demo.com",
            password:
              "$2b$10$hY08YwiEfuzi0oU7.IJ15eDfk0yKZnLG9R9KYM3e.JfwO9P9DFl5u",
            fullname: "Die Or Ride",
            phone_number: "+1234567890",
            roleId: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            email: "admin@phantom.com",
            password:
              "$2b$10$hY08YwiEfuzi0oU7.IJ15eDfk0yKZnLG9R9KYM3e.JfwO9P9DFl5u",
            fullname: "Phantom Admin",
            phone_number: "+1234567894",
            roleId: 3, // admin role
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            email: "passenger@phantom.com",
            password:
              "$2b$10$hY08YwiEfuzi0oU7.IJ15eDfk0yKZnLG9R9KYM3e.JfwO9P9DFl5u",
            fullname: "Phantom Passenger",
            phone_number: "+1234567894",
            roleId: 4, // admin role
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
