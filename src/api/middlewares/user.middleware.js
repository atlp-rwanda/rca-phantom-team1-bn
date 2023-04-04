import { StatusCodes } from "http-status-codes";
import { findUser } from "../services/user.service";

export const userExistsByEmail = async (req, res, next) => {
  const method = req.method;
  const email = method === "POST" ? req.body.email : req.params.email;
  const userExist = await findUser({ email });

  if (method === "POST" && userExist)
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `User with email [${email}] already exist`,
    });

  if (method === "GET") {
    if (!userExist)
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `User with email [${email}] not found`,
      });

    req.userData = userExist;
  }

  next();
};
