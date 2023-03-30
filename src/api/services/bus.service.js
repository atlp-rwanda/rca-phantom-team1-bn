/* eslint-disable prettier/prettier */
import { StatusCodes } from "http-status-codes";
import models from "../../db/models";
import CustomError from "../utils/custom-error";

const { Bus } = models;

export const getBus = async (busId) => {
 console.log(busId)
  try {
   
    const data = await Bus.findOne({ where: { id: busId } });
    return data;
  } catch (e) {
    const error = new CustomError(e?.message || "Error getting bus");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

