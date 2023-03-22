"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  up: async (queryInterface) =>
    queryInterface.bulkInsert(
      "users",
      [
        {
          email: "rideOrDie@demo.com",
          password:
            "$2b$10$hY08YwiEfuzi0oU7.IJ15eDfk0yKZnLG9R9KYM3e.JfwO9P9DFl5u",
          fullname: "Ride Or Die",
          phone_number: "+1234567890",
          role: "driver",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "DieOrRide@demo.com",
          password:
            "$2b$10$hY08YwiEfuzi0oU7.IJ15eDfk0yKZnLG9R9KYM3e.JfwO9P9DFl5u",
          fullname: "Die Or Ride",
          phone_number: "+1234567890",
          role: "driver",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
