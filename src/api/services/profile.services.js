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
    const roleData = await models.user.findByPk(id);
    if (!roleData) return false;
    return roleData;
  } catch (e) {
    throw new CustomError(
      e?.message || "Error fetching profile by id",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
