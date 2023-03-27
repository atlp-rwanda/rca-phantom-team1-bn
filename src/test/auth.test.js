const chai = require("chai");
const request = require("supertest");
const app = require("../index");
const { expect } = chai; 
const {signJwtToken} = require("../api/utils/jwt")
import { StatusCodes } from "http-status-codes";
import {} from "../api/services/auth.service"


describe("Auth Controller", () => {

  it("should login a user with valid credentials", async () => {
    const email = "rideOrDie@demo.com";
    const password = "test1234";
    const user = {
      id: 1,
      fullname: "Ride Or Die",
      email,
      password: "$2b$10$hY08YwiEfuzi0oU7.IJ15eDfk0yKZnLG9R9KYM3e.JfwO9P9DFl5u",
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const token = signJwtToken(user);

    // Act
    const response = await request(app)
      .post("/auth/login")
      .send({ email, password });

    // Assert
    expect(response.body.message).to.equal("User Logged in successfully");
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.body.success).to.be.true;
    delete response.body.data.createdAt;
    delete response.body.data.updatedAt;
    delete response.body.data.roleId,
    expect(response.body.data).to.deep.equal({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
    });
    expect(response.body.accessToken).to.exist;
  });

  it("should return an error if the email is not found", async () => {
     const email = "invalid@test.com";
     const password = "test1234";

     const response = await request(app)
       .post("/auth/login")
       .send({ email, password });

     expect(response.status).to.equal(StatusCodes.UNAUTHORIZED);
     expect(response.body.success).to.be.false;
     expect(response.body.message).to.equal("Invalid credentials");
  });

  it("should return an error if the password is incorrect", async () => { 
     const email = "rideOrDie@demo.com";
     const password = "wrong123";

     const response = await request(app)
       .post("/auth/login")
       .send({ email, password });

     expect(response.status).to.equal(StatusCodes.UNAUTHORIZED);
     expect(response.body.success).to.be.false;
     expect(response.body.message).to.equal("Invalid credentials");

    });

});
