import { StatusCodes } from "http-status-codes";
import { getUser } from "../services/auth.service";
import {  findBusByPlateNumber } from "../services/bus.service";

export const busExistsByPlateNumber = async (req, res, next) => {
  const method = req.method;
  const plateNumber = method === "GET" ? req?.params?.plate_number : req?.body?.plate_number;
  const busExists = await findBusByPlateNumber(plateNumber.toLowerCase());

  if (method === "POST" && busExists)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Bus already exists." });

  if (method === "GET") {
    if (!busExists)
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `Bus with plate number [${plateNumber}] is not found`,
      });
  }
  next();
};

