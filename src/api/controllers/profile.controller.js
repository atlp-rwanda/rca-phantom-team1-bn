import { StatusCodes } from "http-status-codes";
import { successResponse, errorResponse } from "../utils/responseHandler";
import { updateProfile } from "../services/profile.services";

export const updateAProfile = async (req, res, next) => {
  const { id } = req.params;
  const newProfile = req.body;
  try {
    // Loggedin user is hard-coded for now
    const loggedinUser = { id: 1 };
    if (loggedinUser.id != id) {
      return errorResponse(res, "Unauthorized", StatusCodes.UNAUTHORIZED);
    }
    console.log("PROFILE" + newProfile);
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
