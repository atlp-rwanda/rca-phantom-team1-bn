import { StatusCodes } from "http-status-codes";
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
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid or expired token", error: err.message });
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    const role = req.user.role;
    console.log(role);
    if (!roles.includes(role.toLowerCase())) {
     
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "You are not authorized to perform this action" });
    }
    next();
  };
};
