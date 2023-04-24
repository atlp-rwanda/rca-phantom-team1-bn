/* eslint-disable prettier/prettier */
import { StatusCodes } from "http-status-codes";
import locales from "../../config/languages";
import {
  saveBus,
  findAllBuses,
} from "../services/bus.service";

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
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const data = await findAllBuses(limit, offset);
    const totalPages = Math.ceil(data.count / limit);

    res.status(StatusCodes.OK).json({
      data: data,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages,
      totalItems: data.count,
    });
  } catch (error) {
    next(error);
  }
};


export const getBusesByPlateNumber = async (req, res, next) => {
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
