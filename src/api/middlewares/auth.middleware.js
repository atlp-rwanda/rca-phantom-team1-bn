import { StatusCodes } from "http-status-codes";
import {getUser} from "../services/auth.service"


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