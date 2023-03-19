import { Op } from "sequelize";
import models from "../../db/models";
import ERoles from "../enums/ERole";

const { Users } = models;

export const findOne = async (payload) => {
  const exists = await Users.findOne({
    where: {
      ...payload,
      roles: { [Op.contains]: [ERoles.ADMINISTRATOR] },
    },
  });
  if (!exists) return false;
  return exists;
};
