import { StatusCodes } from "http-status-codes";
import { getProfileById } from "../services/profile.services";

export const userProfileExists = async (req, res, next) => {
  const profileId = await getProfileById(req.user.id);
  if (!profileId)
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: `User profile with id [${profileId}] is not found`,
    });
  req.profileId = profileId;
  next();
};

export const allowedToEditProfile = async (req, res, next) => {
  if (req.user !== req.profileId)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Can not update profile" });

  next();
};
