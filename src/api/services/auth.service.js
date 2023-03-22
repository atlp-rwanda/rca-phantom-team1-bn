import { StatusCodes } from "http-status-codes";
import models from "../../db/models";

const { user } = models;

export const getUser = async (email) => {
  try {
    const data = await user.findOne({ where: { email } });
    return data;
  } catch (e) {
    const error = new Error(e?.message || "Error fetching users");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};