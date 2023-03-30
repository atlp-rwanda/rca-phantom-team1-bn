import { StatusCodes } from "http-status-codes";
import { pick } from "lodash";
import { successResponse, errorResponse } from "../utils/responseHandler";
import { updateProfile, getAllProfiles } from "../services/profile.services";

export const updateAProfile = async (req, res, next) => {
  const { id } = req.user;
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

export const getProfiles = async (req, res) => {
  try {
    const data = await getAllProfiles();
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    return errorResponse(res, error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const getProfile = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    success: true,
    data: pick(req.user, [
      "id",
      "fullname",
      "phone_number",
      "email",
      "roleId",
      "createdAt",
      "updatedAt",
    ]),
  });
};
