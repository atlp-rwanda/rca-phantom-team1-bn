import { StatusCodes } from "http-status-codes";
import { getProfileById } from "../services/profile.services";
import { getRoleById } from "../services/roles.service";
import { decodeJwtToken } from "../utils/jwt";

export const checkUserLoggedIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header not found" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = await decodeJwtToken(token);
    if (!decoded)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid or expired token" });
    try {
      req.user = await getProfileById(decoded.id);
      if (!req.user)
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: `User with id $[${decoded.id}] is not registered`,
        });
    } catch (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: `User with id $[${decoded.id}] is not registered`,
        error: err.message,
      });
    }
    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid or expired token", error: err.message });
  }
};

export const restrictTo = (...roles) => {
  return async (req, res, next) => {
    const role = await getRoleById(req.user.roleId);
    if (!role)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "You are not authorized to perform this action" });

    if (!roles.includes(role.title.toLowerCase())) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "You are not authorized to perform this action" });
    }
    next();
  };
};