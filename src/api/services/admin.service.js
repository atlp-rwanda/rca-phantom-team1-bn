const { Op } = require("sequelize");
const models = require("../../db/models");
const ERoles = require("../enums/ERole");

const { Users } = models;

exports.findOne = async (payload) => {
  const exists = await Users.findOne({
    where: {
      ...payload,
      roles: { [Op.contains]: [ERoles.ADMINISTRATOR] },
    },
  });
  if (!exists) return false;
  return exists;
};
