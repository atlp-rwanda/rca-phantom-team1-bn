import chai from "chai";
import chaiHttp from "chai-http";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import app from "../../index";
import models from "../../db/models";
import { signJwtToken } from "../../api/utils/jwt";
const { expect } = chai;
chai.use(chaiHttp);

describe("Profile routes", async () => {
  beforeEach(async () => {
    // Clear the database before each test
    await models.user.destroy({
      where: {
        email: {
          [Op.in]: [
            "rideOrDie2@test.com",
            "ride-updated@test.com",
            "rideOrDie3@test.com",
            "rideOrDie4@test.com",
            "rideOrDie5@test.com",
          ],
        },
      },
    });
  });

  describe("GET /profiles", () => {
    it("should return a profiles accessed publicly", async () => {
      const response = await chai.request(app).get(`/profiles`);
      expect(response.statusCode).to.equal(StatusCodes.OK);
    });
  });

  describe("GET /profile", () => {
    it("should return a profile of a logged in user", async () => {
      const profile = {
        id: 4,
        email: "rideOrDie2@test.com",
        password:
          "$2b$10$hY08YwiEfuzi0oU7.IJ15eDfk0yKZnLG9R9KYM3e.JfwO9P9DFl5u",
        fullname: "Ride Or Die",
        phone_number: "+1234567891",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const createdProfile = await models.user.create(profile);
      const response = await chai
        .request(app)
        .get(`/profile`)
        .set("Accept", "application/json")
        .set(
          "Authorization",
          "Bearer " +
            signJwtToken({ roleId: profile.roleId, id: createdProfile.id })
        );
      expect(response.status).to.equal(StatusCodes.OK);
    });
  });

  describe("PUT /profile", () => {
    it("Should update of a logged in user", async () => {
      const profile = {
        id: 5,
        email: "rideOrDie3@test.com",
        password:
          "$2b$10$hY08YwiEfuzi0oU7.IJ15eDfk0yKZnLG9R9KYM3e.JfwO9P9DFl5u",
        fullname: "Ride Or Die",
        phone_number: "+1234567891",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedProfile = {
        fullname: "Edited Or Die",
        email: "ride-updated@test.com",
        phone_number: "+1334567895",
      };
      const createdProfile = await models.user.create(profile);
      const response = await chai
        .request(app)
        .put(`/profile`)
        .send(updatedProfile)
        .set("Accept", "application/json")
        .set(
          "Authorization",
          "Bearer " +
            signJwtToken({ roleId: profile.roleId, id: createdProfile.id })
        );
      expect(response.status).to.equal(StatusCodes.OK);
    });

    it("should return 400 for invalid format", async () => {
      const profile = {
        id: 6,
        email: "rideOrDie5@test.com",
        password:
          "$2b$10$hY08YwiEfuzi0oU7.IJ15eDfk0yKZnLG9R9KYM3e.JfwO9P9DFl5u",
        fullname: "Ride Or Die",
        phone_number: "+1234567891",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedProfile = {
        email: "ride-updated", // invalid email
      };
      const createdProfile = await models.user.create(profile);
      const response = await chai
        .request(app)
        .put(`/profile`)
        .send(updatedProfile)
        .set("Accept", "application/json")
        .set(
          "Authorization",
          "Bearer " +
            signJwtToken({ roleId: profile.roleId, id: createdProfile.id })
        );
      expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
    });
  });
});
