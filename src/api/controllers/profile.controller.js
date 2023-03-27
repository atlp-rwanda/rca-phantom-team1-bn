import { StatusCodes } from "http-status-codes";
import { successResponse, errorResponse } from "../utils/responseHandler";
import { updateProfile } from "../services/profile.services";

export const updateAProfile = async (req, res, next) => {
  const { id } = req.params;
  const newProfile = req.body;
  try {
    const updatedProfile = await updateProfile(id, newProfile);
    return successResponse(
      res,
      "Profile updated successfully",
      StatusCodes.OK,
      updatedProfile
    );
  } catch (error) {
    next(error);
    return errorResponse(res, error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
