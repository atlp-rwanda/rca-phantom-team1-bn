import { StatusCodes } from "http-status-codes";
import ERoles from "../enums/ERole";
import { decodeJwtToken } from "../utils/jwt";

const operatorCheck = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header not found" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = await decodeJwtToken(token);
    const isOperator = decoded.roles.includes(ERoles.OPERATOR);
    if (!isOperator) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "You are not authorized to access this resource" });
    }

    // If the user is an operator, pass control to the next middleware
    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid or expired token", error: err.message });
  }
};

export default operatorCheck;
