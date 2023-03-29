import chai from "chai";
import chaiHttp from "chai-http";
import { StatusCodes } from "http-status-codes";
import app from "../../index";
import models from "../../db/models";
import { signJwtToken } from "../../api/utils/jwt";
import ERoles from "../../api/enums/ERole";
const { expect } = chai;
chai.use(chaiHttp);

describe("Profile routes", () => {
  beforeEach(async () => {
    // Clear the database before each test
    await models.user.destroy({ where: {} });
  });

  describe("GET /profile/:id", () => {
    it("should return a profile by id", async () => {
      const user = {
        email: "rideOrDie@test.com",
        password:
          "$2b$10$hY08YwiEfuzi0oU7.IJ15eDfk0yKZnLG9R9KYM3e.JfwO9P9DFl5u",
        fullname: "Ride Or Die",
        phone_number: "+1234567890",
        role: "driver",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const data = await models.user.create(user);
      const response = await chai.request(app).get(`/profile/${data.id}`);
      expect(response.statusCode).to.equal(StatusCodes.OK);
    });

    it("should return 404 Not Found when profile id does not exist", (done) => {
      chai
        .request(app)
        .get(`/profile/23233`)
        .end((err, response) => {
          if (err) done(err);
          expect(response.status).to.equal(StatusCodes.NOT_FOUND);
          done();
        });
    });
  });
});

describe("PUT /profile/:id", () => {
  it("Should update a profile by id", async () => {
    const profile = {
      email: "rideOrDie2@test.com",
      password: "$2b$10$hY08YwiEfuzi0oU7.IJ15eDfk0yKZnLG9R9KYM3e.JfwO9P9DFl5u",
      fullname: "Ride Or Die",
      phone_number: "+1234567891",
      role: ERoles.OPERATOR,
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
      .put(`/profile/${createdProfile.id}`)
      .send(updatedProfile)
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer " +
          signJwtToken({ role: ERoles.OPERATOR, id: createdProfile.id })
      );
    expect(response.status).to.equal(StatusCodes.OK);
  });

  it("should return 404 if profile is not found", async () => {
    const profile = {
      email: "rideOrDie3@test.com",
      password: "$2b$10$hY08YwiEfuzi0oU7.IJ15eDfk0yKZnLG9R9KYM3e.JfwO9P9DFl5u",
      fullname: "Ride Or Die",
      phone_number: "+1234567891",
      role: ERoles.OPERATOR,
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
      .put(`/profile/4232323`)
      .send(updatedProfile)
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer " +
          signJwtToken({ role: ERoles.OPERATOR, id: createdProfile.id })
      );
    expect(response.status).to.equal(StatusCodes.NOT_FOUND);
  });

  it("should return 400 for invalid format", async () => {
    const profile = {
      email: "rideOrDie4@test.com",
      password: "$2b$10$hY08YwiEfuzi0oU7.IJ15eDfk0yKZnLG9R9KYM3e.JfwO9P9DFl5u",
      fullname: "Ride Or Die",
      phone_number: "+1234567891",
      role: ERoles.OPERATOR,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedProfile = {
      email: "ride-updated", // invalid email
    };
    const createdProfile = await models.user.create(profile);
    const response = await chai
      .request(app)
      .put(`/profile/${createdProfile.id}`)
      .send(updatedProfile)
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer " +
          signJwtToken({ role: ERoles.OPERATOR, id: createdProfile.id })
      );
    expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
  });
});
