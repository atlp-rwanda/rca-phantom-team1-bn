import * as _ from "lodash";
import { StatusCodes } from "http-status-codes";
import { verifyPassword } from "../utils/hash-password";
import { signJwtToken } from "../utils/jwt";
import {getUser} from "../services/auth.service"


export const login = async (req, res) => {

    const { email, password } = req.body;
  
    const user = await getUser(email)

    const isPassValid = await verifyPassword(password, user.password);

    if (!isPassValid)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, message: "Invalid credentials" });
  
    const data = _.pick(user, [
      "id",
      "roleId",
    ]);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User Logged in successfully",
      data,
      accessToken: signJwtToken(data),
    });
};