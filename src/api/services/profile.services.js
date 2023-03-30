import models from "../../db/models";
import CustomError from "../utils/custom-error";
import { StatusCodes } from "http-status-codes";

export const getProfileById = async (id) => {
  try {
    const profileData = await models.user.findByPk(id);
    if (!profileData) return false;
    return profileData;
  } catch (e) {
    throw new CustomError(
      e?.message || "Error fetching profile by id",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
