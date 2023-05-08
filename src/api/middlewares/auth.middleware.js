import { StatusCodes } from "http-status-codes";
import { getUser, findUserByResetToken } from "../services/auth.service";

export const checkUserExists = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await getUser(email);

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, message: "Invalid credentials" });
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const checkIsTokenValid = async (req, res, next) => {
  try {
    const user = await findUserByResetToken(req.params.resetToken);
    if (!user) {
        return res.status(404).json({
            success: true,
            message: "invalid token",
        })
    }
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

export const checkIsTokenExpired = async (req, res, next) => {
  try {
    const expirationDate = req.user.dataValues.resetPasswordExpires;

    if (expirationDate.getTime() < Date.now()) {
      return res.status(404).json({
          success: true,
          message: "expired token",
      })
    }
  } catch (e) {
    next(e);
  }
}