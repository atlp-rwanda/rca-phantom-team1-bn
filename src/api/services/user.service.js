import { StatusCodes } from "http-status-codes";
import models from "../../db/models";
import CustomError from "../utils/custom-error";

const { user } = models;

export const signUpUser = async (data) => {
  try {
    const userData = await user.create(data);
    return userData;
  } catch (e) {
    throw new CustomError(
      e.message || "Error signing up a user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const findUser = async (payload) => {
  try {
    const userData = await user.findOne({ where: payload });
    if (userData) return userData;
    return false;
  } catch (e) {
    throw new CustomError(
      e.message || "Error signing up a user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
