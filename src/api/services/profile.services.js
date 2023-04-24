<<<<<<< HEAD

=======
import { catchAsyncError } from "../utils/responseHandler";
>>>>>>> 4c9557e296db6a4d79507edde482520cba098023
import models from "../../db/models";
import CustomError from "../utils/custom-error";
import { StatusCodes } from "http-status-codes";

<<<<<<< HEAD
=======
export const updateProfile = catchAsyncError(async (id, payload) => {
  const profile = await models.user.findOne({ where: { id } });
  await profile.update(payload);
  return profile;
});

>>>>>>> 4c9557e296db6a4d79507edde482520cba098023
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
<<<<<<< HEAD
};
=======
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
>>>>>>> 4c9557e296db6a4d79507edde482520cba098023
