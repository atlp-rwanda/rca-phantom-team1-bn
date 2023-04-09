import { StatusCodes } from "http-status-codes";
import { findAgencyById } from "../services/agency.service";
import { findBusById, findBusByPlateNumber } from "../services/bus.service";

export const busExistsByPlateNumber = async (req, res, next) => {
  const method = req.method;
  const plateNumber =
    method === "GET" ? req?.params?.plateNumber : req?.body?.plateNumber;
  const busExists = await findBusByPlateNumber(plateNumber);

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
  req.bus = busExists;
  next();
};

export const busExistsById = async (req, res, next) => {
  const bus = await findBusById(req.params.id);
  if (!bus)
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: `Bus with id [${req.params.id}] is not found`,
    });
  req.bus = bus;
  next();
};

export const agencyExists = async (req, res, next) => {
  const method = req.method;
  const agencyId =
    method === "GET" ? req?.params?.agencyId : req?.body?.agencyId;
  const agencyExist = await findAgencyById(agencyId)
  
  if (method === "POST" && !agencyExist)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Agency does not exists." });

  next();
};
