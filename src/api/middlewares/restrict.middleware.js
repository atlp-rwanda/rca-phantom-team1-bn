import { StatusCodes } from "http-status-codes";

const restrictTo = (...roles) => {
  return (req, res, next) => {
    const role = req.user.role;
    if (!roles.includes(role.toUpperCase())) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "You are not authorized to perform this action" });
    }
    next();
  };
};

export default restrictTo;
