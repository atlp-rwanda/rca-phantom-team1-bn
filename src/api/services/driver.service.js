import { StatusCodes } from "http-status-codes";
import models from "../../db/models";

const { user } = models;

export const getDriver = async (driverId) => {
  try {
    const data = await user.findOne({ where: { id: driverId } });
    return data;
  } catch (e) {
    const error = new Error(e?.message || "Error getting driever");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

