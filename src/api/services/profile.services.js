import { catchAsyncError } from "../utils/responseHandler";
import models from "../../db/models";
import CustomError from "../utils/custom-error";
import { StatusCodes } from "http-status-codes";

export const updateProfile = catchAsyncError(async (id, payload) => {
  const profile = await models.user.findOne({ where: { id } });
  await profile.update(payload);
  return profile;
});

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

export const getAllProfiles = async () => {
  try {
    return await models.user.findAll({
      attributes: { exclude: ["password"] },
    });
  } catch (e) {
    throw new CustomError(
      e?.message || "Error fetching profiles",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
