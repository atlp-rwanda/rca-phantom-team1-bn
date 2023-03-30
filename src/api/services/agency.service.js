import { StatusCodes } from "http-status-codes";
import models from "../../db/models";
import CustomError from "../utils/custom-error";
const { agency } = models;

export const findAgencyById = async (agencyId) => {
  try {
    const agencyExists = await agency.findOne({ where: { agencyId } });
    if (!agencyExists) return false;
    return agencyExists;
  } catch (e) {
    throw new CustomError(
      e?.message || "Error fetching agency by id",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
