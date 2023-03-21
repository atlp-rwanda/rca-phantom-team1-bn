import chai from "chai";
import chaiHttp from "chai-http";
import { StatusCodes } from "http-status-codes";
import app from "../../index";
import models from "../../db/models";
import { signJwtToken } from "../../api/utils/jwt";
import ERoles from "../../api/enums/ERole";
const { expect } = chai;
chai.use(chaiHttp);
describe("Role routes", () => {
  beforeEach(async () => {
    // Clear the database before each test
    await models.role.destroy({ where: {} });
  });

  describe("GET /roles", () => {
    it("should return an empty array when there are no roles", (done) => {
      chai
        .request(app)
        .get("/roles")
        .end((err, res) => {
          if (err) done();
          expect(res.statusCode).to.equal(StatusCodes.OK);
          expect(res.body.roles.length).to.equal(0);
          done();
        });
    });

    it("should return an array of roles when there are roles in the database", async () => {
      // Create some roles to test with
      const roles = [
        {
          role: "ADMINISTRATOR",
          description: "Admin role",
          privileges: ["create", "read", "update", "delete"],
        },
        { role: "user", description: "User role", privileges: ["read"] },
      ];
      await models.role.bulkCreate(roles);

      const response = await chai.request(app).get("/roles");
      expect(response.statusCode).to.equal(StatusCodes.OK);
      expect(response.body.roles.length).to.equal(roles.length);
    });
  });
});

describe("POST /roles", () => {
  it("should create a new role", (done) => {
    const role = {
      role: "ADMINISTRATOR-TEST-1",
      description: "Admin role",
      privileges: ["create", "read", "update", "delete"],
    };
    chai
      .request(app)
      .post("/roles")
      .send(role)
      .set(
        "Authorization",
        "Bearer " + signJwtToken({ id: "100", roles: [ERoles.ADMINISTRATOR] })
      )
      .end((err, response) => {
        if (err) done();
        expect(response.statusCode).to.equal(StatusCodes.CREATED);
        done();
      });
  });

  it("should return 400 Bad Request when missing required fields", (done) => {
    const role = {
      description: "Admin role",
      privileges: ["create", "read", "update", "delete"],
    };
    chai
      .request(app)
      .post("/roles")
      .send(role)
      .set(
        "Authorization",
        "Bearer " + signJwtToken({ roles: [ERoles.ADMINISTRATOR] })
      )
      .end((err, response) => {
        if (err) done(err);
        expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
        done();
      });
  });
});

describe("GET /roles/:role", () => {
  it("should return a role by name", (done) => {
    const role = {
      role: ERoles.ADMINISTRATOR,
      description: "Admin role",
      privileges: ["create", "read", "update", "delete"],
    };
    models.role.create(role);

    chai
      .request(app)
      .get(`/roles/${role.role}`)
      .end((err, response) => {
        if (err) done(err);
        expect(response.statusCode).to.equal(StatusCodes.OK);
        done();
      });
  });

  it("should return 404 Not Found when role does not exist", (done) => {
    chai
      .request(app)
      .get(`/roles/nonexistentrole`)
      .end((err, response) => {
        if (err) done(err);
        expect(response.status).to.equal(StatusCodes.NOT_FOUND);
        done();
      });
  });
});

describe("PATCH /roles/:id", (done) => {
  it("should update a role by id", async () => {
    const role = {
      role: "NEW-ADMINISTRATOR",
      description: "Admin role",
      privileges: ["create", "read", "update", "delete"],
    };
    const updatedRole = {
      role: "UPDATED-ADMINISTRATOR",
      description: "New admin role",
      privileges: ["create", "read", "update"],
    };
    const createdRole = await models.role.create(role);
    chai
      .request(app)
      .patch(`/roles/${createdRole.id}`)
      .send(updatedRole)
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer " + signJwtToken({ roles: [ERoles.ADMINISTRATOR] })
      )
      .end((err, response) => {
        if (err) done(err);
        expect(response.status).to.equal(200);
        expect(response.body).toMatchObject(updatedRole);
        done();
      });
  });

  it("should return 404 if role is not found", (done) => {
    const updatedRole = {
      role: "newadmin",
      description: "New admin role",
      privileges: ["create", "read", "update"],
    };
    chai
      .request(app)
      .patch("/roles/999")
      .send(updatedRole)
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer " + signJwtToken({ roles: [ERoles.ADMINISTRATOR] })
      )
      .end((err, response) => {
        if (err) done(err);
        expect(response.status).to.equal(StatusCodes.NOT_FOUND);
        done();
      });
  });
});
