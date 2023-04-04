/* eslint-disable prettier/prettier */
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { assignDriver, getAll } from "../services/driver-bus-assignment.service";
import locales from "../../config/languages";
import {
  saveBus,
  findBusByPlateNumber,
  findAllBuses,
} from "../services/bus.service";
import { getPagination } from "../utils/pagination";

export const createBus = async (req, res, next) => {
  try {
    const bus = await saveBus(req.body);

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: bus,
      message: locales("bus_created"),
    });
  } catch (err) {
    next(err);
  }
};

export const getBuses = async (req, res, next) => {
  const { page, size, plate_number } = req.query;
  var condition = plate_number
    ? { plate_number: { [Op.like]: `%${plate_number}%` } }
    : null;
  const { limit, offset } = getPagination(page, size);

  try {
    let buses;

    if (plate_number) {
      buses = await findBusByPlateNumber(plate_number);
    } else {
      buses = await findAllBuses(condition, limit, offset, page);
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: buses,
    });
  } catch (err) {
    next(err);
  }
};

export const getBusById = async (req, res, next) => {
  try {
    const bus = req.bus;
    res.status(StatusCodes.OK).json({
      success: true,
      data: bus,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBusById = async (req, res, next) => {
  try {
    await req.bus.destroy();
    res.send(StatusCodes.OK).json({
      success: true,
      message: locales("bus_deleted"),
    });
  } catch (err) {
    next(err);
  }
};

export const updateBus = async (req, res, next) => {
  try {
    const updatedBus = await req.bus.update(req.body);
    res.status(StatusCodes.OK).json({
      success: true,
      message: locales("bus_created"),
      data: updatedBus,
    });
  } catch (err) {
    next(err);
  }
};

export const assignDriverToBus = async (req, res, next) => {
  try {
    const { bus_id, driver_id } = req.body;
    
    const assignment = await assignDriver(bus_id, driver_id);
    // send email
    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: assignment
    })
  } catch (err) {
    next(err);
  }
};


export const getDriverToBusAssignments = async (req, res, next) => {
  try {
    const assignments = await getAll();
    return res.status(StatusCodes.OK).json({
      success: true,
      data: assignments
    })
  } catch (err) {
    next(err);
  }
};