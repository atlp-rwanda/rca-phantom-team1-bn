import * as _ from "lodash";
import HttpStatusCodes from "../enums/EHttpStatusCodes";
import { verifyPassword } from "../utils/hash-password";
import { signJwtToken } from "../utils/jwt";
import { findOne } from "../services/admin.service";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await findOne({ email });
  if (!admin)
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ success: false, message: "Invalid credentials" });
  const isPassValid = await verifyPassword(password, admin.password);
  if (!isPassValid)
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ success: false, message: "Invalid credentials" });

  const data = _.pick(admin, [
    "id",
    "email",
    "roles",
    "createdAt",
    "updatedAt",
  ]);
  return res.status(HttpStatusCodes.OK).json({
    success: true,
    message: "Admin Logged in successfully",
    data,
    accessToken: signJwtToken(data),
  });
};
