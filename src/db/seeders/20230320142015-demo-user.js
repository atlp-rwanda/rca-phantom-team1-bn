"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  up: async (queryInterface) =>
    queryInterface.bulkInsert(
      "users",
      [
        {
          id: "10c6e431-de61-46d7-a5ca-65cb5d8d2085",
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
          id: "1bb32847-9e61-4c8b-8b35-9a4dd71d7914",
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
