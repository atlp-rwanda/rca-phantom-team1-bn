import { StatusCodes } from "http-status-codes";
import { getProfileById } from "../services/profile.services";

export const userProfileExists = async (req, res, next) => {
  const profile = await getProfileById(req.params.id);
  if (!profile)
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: `User profile with id [${req.params.id}] is not found`,
    });
  req.profile = profile;
  next();
};

export const allowedToEditProfile = async (req, res, next) => {
  if (req.user.id != req.profile.id)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Can not update profile" });

  next();
};
