const HttpStatusCodes = require("../enums/EHttpStatusCodes");
const ERoles = require("../enums/ERole");
const { decodeJwtToken } = require("../utils/jwt");

const adminCheck = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header not found" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = await decodeJwtToken(token);
    const isAdmin = decoded.roles.includes(ERoles.ADMINISTRATOR);
    if (!isAdmin) {
      return res
        .status(HttpStatusCodes.FORBIDDEN)
        .json({ message: "You are not authorized to access this resource" });
    }

    // If the user is an admin, pass control to the next middleware
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token", error: err.message });
  }
};

module.exports = adminCheck;
