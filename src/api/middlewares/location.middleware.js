/* eslint-disable prettier/prettier */
import { StatusCodes } from "http-status-codes";
import { getLocation, getLocationByName } from "../services/locations.service";

// define the locationExistsById function
export const locationExistsById = async (req, res, next) => {
  try {
    const location = await getLocation(req.params.id);
    if (!location) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `Location is not found`,
      });
    }
    req.location = location; // attach the location to the request object
    next();
  } catch (error) {
    next(error);
  }
};

// define the locationExistsByName function
export const locationExistsByName = async (req, res, next) => {
  try {
    const location = await getLocationByName(req.body.name);
    if (location) {
      return res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: `Location with name [${req.body.name}] already exists`,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};