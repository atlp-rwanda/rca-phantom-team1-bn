import chai from "chai";
import chaiHttp from "chai-http";
import { StatusCodes } from "http-status-codes";
import app from "../../index";
import models from "../../db/models";
import { signJwtToken } from "../../api/utils/jwt";
import ERoles from "../../api/enums/ERole";
const { expect } = chai;
chai.use(chaiHttp);
describe("Bus routes", () => {
  beforeEach(async () => {
    // Clear the database before each test
    await models.role.destroy({ where: {} });
  });

  describe("GET /buses", () => {
    it("should return an empty array when there are no buses", (done) => {
      chai
        .request(app)
        .get("/buses")
        .end((err, res) => {
          if (err) done();
          expect(res.statusCode).to.equal(StatusCodes.OK);
          expect(res.body.data.length).to.equal(0);
          done();
        });
    });

    it("should return an array of buses when there are buses in the database", async () => {
      // Create some buses to test with
      const buses = [
        {
          plate_number: "RAA100B",
          agency_id: 12321,
          driver_id: 1,
          router_id: 2,
          av_seats: 15,
          seats: 30,
        },
        {
          plate_number: "RAC002A",
          agency_id: 12324,
          driver_id: 12325,
          router_id: 2,
          av_seats: 15,
          seats: 30,
        }
      ];
      await models.role.bulkCreate(buses);

      const response = await chai
        .request(app)
        .get("/buses")
      expect(response.statusCode).to.equal(StatusCodes.OK);
      expect(response.body.data.length).to.equal(buses.length);
    });
  });
});

describe("POST /buses", () => {
  it("should create a new bus", (done) => {
    const bus = {
      plate_number: "RAC001A",
      agency_id: 12324,
      driver_id: 12323,
      router_id: 2,
      av_seats: 15,
      seats: 30,
    }
    chai
      .request(app)
      .post("/buses")
      .send(bus)
      .set(
        "Authorization",
        "Bearer " + signJwtToken({ role: ERoles.OPERATOR })
      )
      .end((err, response) => {
        if (err) done();
        expect(response.statusCode).to.equal(StatusCodes.CREATED);
        done();
      });
  });

  it("should return 400 Bad Request when missing required fields", (done) => {
    const bus = {
      plate_number: "RAC001A",
      agency_id: 12324,
      router_id: 2,
      av_seats: 15,
      seats: 30,
    };
    chai
      .request(app)
      .post("/buses")
      .set(
        "Authorization",
        "Bearer " + signJwtToken({ role: ERoles.OPERATOR })
      )
      .send(bus)
      .end((err, response) => {
        if (err) done(err);
        expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
        done();
      });
  });
});

describe("GET /buses?plate_number=[plate_number]", () => {
  it("should return a bus by plate number", async () => {
    const bus = {
      plate_number: "RAC001A",
      agency_id: 12324,
      driver_id: 12323,
      router_id: 2,
      av_seats: 15,
      seats: 30,
    };
    await models.bus.create(bus);
    const res = await chai
      .request(app)
      .get(`/buses?title=user`)

    expect(res.status).to.equal(StatusCodes.OK);
  });

  it("should return empty when bus plate number does not exist", (done) => {
    chai
      .request(app)
      .get(`/buses?title=nonexistentbus`)
      .end((err, response) => {
        if (err) done(err);
        expect(response.status).to.equal(StatusCodes.NOT_FOUND);
        done();
      });
  });
});

describe("GET /buses/:id", () => {
  it("should return a bus by id", async () => {
    const bus = {
      plate_number: "RAC001A",
      agency_id: 12324,
      driver_id: 12323,
      router_id: 2,
      av_seats: 15,
      seats: 30,
    };
    const data = await models.bus.create(bus);
    const response = await chai
      .request(app)
      .get(`/buses/${data.id}`)
    expect(response.statusCode).to.equal(StatusCodes.OK);
  });

  it("should return 404 Not Found when bus id does not exist", (done) => {
    chai
      .request(app)
      .get(`/buses/12123`)
      .end((err, response) => {
        if (err) done(err);
        expect(response.status).to.equal(StatusCodes.NOT_FOUND);
        done();
      });
  });
});

describe("PATCH /buses/:id", (done) => {
  it("should update a bus by id", async () => {
    const bus = {
      plate_number: "RAC001A",
      agency_id: 12324,
      driver_id: 12323,
      router_id: 2,
      av_seats: 15,
      seats: 30,
    };
    const updatedBus = {
      plate_number: "RAC010B",
      agency_id: 12325,
      driver_id: 12323,
      router_id: 2,
      av_seats: 15,
      seats: 30,
    };
    const createdBus = await models.bus.create(bus);
    chai
      .request(app)
      .patch(`/buses/${createdBus.id}`)
      .send(updatedBus)
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer " + signJwtToken({ role: ERoles.ADMINISTRATOR })
      )
      .end((err, response) => {
        if (err) done(err);
        expect(response.status).to.equal(200);
        expect(response.body).toMatchObject(updatedBus);
        done();
      });
  });

  it("should return 404 if bus is not found", (done) => {
    const updatedBus = { 
      plate_number: "RAC001A",
      agency_id: 12324,
      driver_id: 12323,
      router_id: 2,
      av_seats: 15,
      seats: 30,
    };
    chai
      .request(app)
      .patch("/buses/999")
      .send(updatedBus)
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer " + signJwtToken({ role: ERoles.ADMINISTRATOR })
      )
      .end((err, response) => {
        if (err) done(err);
        expect(response.status).to.equal(StatusCodes.NOT_FOUND);
        done();
      });
  });
});