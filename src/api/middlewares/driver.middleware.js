/* eslint-disable prettier/prettier */
import { StatusCodes } from "http-status-codes";
import { getDriver } from "../services/driver.service";

export const driverExists = async (req, res, next) => {
  const driver = await getDriver(req.body.driver_id);
  if (!driver)
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: `Driver with id [${req.body.driver_id}] is not found`,
    });
  req.driver = driver;
  next();
};
