import * as _ from "lodash";
import { StatusCodes } from "http-status-codes";
import { verifyPassword } from "../utils/hash-password";
import { signJwtToken } from "../utils/jwt";

import models from "../../db/models";
export const login = async (req, res) => {

    const { email, password } = req.body;
  
    const user = await models.user.findOne({ where: { email } }); // find the user by email


    if (!user)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, message: "Invalid credentials" });
    const isPassValid = await verifyPassword(password, user.password);

    if (!isPassValid)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, message: "Invalid credentials" });
  
    const data = _.pick(user, [
      "id",
      "fullname",
      "email",
      "role",
      "createdAt",
      "updatedAt",
    ]);
    
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User Logged in successfully",
      data,
      accessToken: signJwtToken(data),
    });
};