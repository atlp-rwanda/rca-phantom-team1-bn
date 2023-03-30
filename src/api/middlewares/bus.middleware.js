/* eslint-disable prettier/prettier */
import { StatusCodes } from "http-status-codes";
import { getBus } from "../services/bus.service";

export const busExists = async (req, res, next) => {
  const bus = await getBus(req.body.bus_id);
  if (!bus)
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: `Bus with id [${req.body.bus_id}] is not found`,
    });
  req.bus = bus;
  next();
};
