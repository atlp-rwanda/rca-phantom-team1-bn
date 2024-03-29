/* eslint-disable prettier/prettier */
import chai from "chai";
import chaiHttp from "chai-http";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import app from "../../index";
import models from "../../db/models";
import { signJwtToken } from "../../api/utils/jwt";
const { expect } = chai;
chai.use(chaiHttp);
describe("Role routes", () => {
  beforeEach(async () => {
    await models.role.destroy({
      where: {
        title: {
          [Op.in]: [
            "test-driver",
            "super-administrator",
            "standard-user",
            "dummy-role",
            "new-administrator",
            "new-admmin",
            "updated-administrator",
            "test-operator",
          ],
        },
      },
    });
  });

  describe("GET /roles", () => {
    it("should return pre-seeded roles", (done) => {
      chai
        .request(app)
        .get("/roles")
        .set("Authorization", "Bearer " + signJwtToken({ id: 3, roleId: 3 }))
        .end((err, res) => {
          if (err) done();
          expect(res.statusCode).to.equal(StatusCodes.OK);
          expect(res.body.data.length).to.greaterThan(0);
          done();
        });
    });

    it("should return an array of roles when there are roles in the database", async () => {
      // Create some roles to test with
      const roles = [
        {
          title: "test-driver",
          description: "Admin role",
          privileges: ["create", "read", "update", "delete"],
        },
        {
          title: "test-operator",
          description: "User role",
          privileges: ["read"],
        },
      ];
      await models.role.bulkCreate(roles);

      const response = await chai
        .request(app)
        .get("/roles")
        .set("Authorization", "Bearer " + signJwtToken({ id: 3, roleId: 3 }));
      expect(response.statusCode).to.equal(StatusCodes.OK);
      expect(response.body.data.length).to.greaterThan(0);
    });
  });
});

describe("POST /roles", () => {
  it("should create a new role", (done) => {
    const role = {
      title: "super-administrator",
      description: "Admin role",
      privileges: ["create", "read", "update", "delete"],
    };
    chai
      .request(app)
      .post("/roles")
      .send(role)
      .set("Authorization", "Bearer " + signJwtToken({ id: 3, roleId: 3 }))
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
      .set("Authorization", "Bearer " + signJwtToken({ roleId: 3, id: 3 }))
      .end((err, response) => {
        if (err) done(err);
        expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
        done();
      });
  });
});

describe("GET /roles?title=[title]", () => {
  it("should return a role by title", async () => {
    const role = {
      title: "standard-user",
      description: "Standard role",
      privileges: ["create", "read", "update", "delete"],
    };
    await models.role.create(role);
    const res = await chai
      .request(app)
      .get(`/roles?title=${role.title}`)
      .set("Authorization", "Bearer " + signJwtToken({ id: 3, roleId: 3 }));

    expect(res.status).to.equal(StatusCodes.OK);
  });

  it("should return empty when role title does not exist", (done) => {
    chai
      .request(app)
      .get(`/roles?title=nonexistentrole`)
      .set("Authorization", "Bearer " + signJwtToken({ id: 3, roleId: 3 }))
      .end((err, response) => {
        if (err) done(err);
        expect(response.status).to.equal(StatusCodes.NOT_FOUND);
        done();
      });
  });
});

describe("GET /roles/:id", () => {
  it("should return a role by id", async () => {
    const role = {
      title: "dummy-role",
      description: "Admin role",
      privileges: ["create", "read", "update", "delete"],
    };
    const data = await models.role.create(role);
    const response = await chai
      .request(app)
      .get(`/roles/${data.id}`)
      .set("Authorization", "Bearer " + signJwtToken({ id: 3, roleId: 3 }));
    expect(response.statusCode).to.equal(StatusCodes.OK);
  });

  it("should return 404 Not Found when role id does not exist", (done) => {
    chai
      .request(app)
      .get(`/roles/23233`)
      .set("Authorization", "Bearer " + signJwtToken({ id: 3, roleId: 3 }))
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
      title: "new-administrator",
      description: "Admin role",
      privileges: ["create", "read", "update", "delete"],
    };
    const updatedRole = {
      title: "updated-administrator",
      description: "New admin role",
      privileges: ["create", "read", "update"],
    };
    const createdRole = await models.role.create(role);
    chai
      .request(app)
      .patch(`/roles/${createdRole.id}`)
      .send(updatedRole)
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + signJwtToken({ id: 3, roleId: 3 }))
      .end((err, response) => {
        if (err) done(err);
        expect(response.status).to.equal(200);
        expect(response.body).toMatchObject(updatedRole);
        done();
      });
  });

  it("should return 404 if role is not found", (done) => {
    const updatedRole = {
      title: "new-admin",
      description: "New admin role",
      privileges: ["create", "read", "update"],
    };
    let id = 200
    chai
      .request(app)
      .patch("/roles/" + id)
      .send(updatedRole)
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + signJwtToken({ id: 3, roleId: 3 }))
      .end((err, response) => {
        if (err) done(err);
        expect(response.status).to.equal(StatusCodes.NOT_FOUND);
        done();
      });
  });
});

describe("Roles protected", () => {
  it("should fail when not authorized", (done) => {
    chai
      .request(app)
      .get(`/roles`)
      .set("Accept", "application/json")
      .end((err, response) => {
        if (err) done(err);
        expect(response.status).to.equal(StatusCodes.UNAUTHORIZED);
        done();
      });
  });
});
