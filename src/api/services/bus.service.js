/* eslint-disable prettier/prettier */

import locales from '../../config/languages'
import models from "../../db/models";
import CustomError from '../utils/custom-error';
import { StatusCodes } from "http-status-codes";
const { Bus } = models

export const findAllBuses = async () => {
    try {
      const data = await Bus.findAll();
      return data;
    } catch (e) {
      throw new CustomError(
        e?.message || "Error fetching buses",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
};

export const findBusByPlateNumber = async (plate_number) => {
    try {
      const busExists = await Bus.findOne({ where: { plate_number } });
      if (!busExists) return false;
      return busExists;
    } catch (e) {
      throw new CustomError(
        e?.message || "Error fetching bus by plate number",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
};

export const findBusByAgency = async (agency_id) => {
  try {
    const busExists = await Bus.findOne({ where: { agency_id } });
    if (!busExists) return false;
    return busExists;
  } catch (e) {
    throw new CustomError(
      e?.message || "Error fetching bus by agency",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const findBusByRoute = async (route_id) => {
  try {
    const busExists = await Bus.findOne({ where: { route_id } });
    if (!busExists) return false;
    return busExists;
  } catch (e) {
    throw new CustomError(
      e?.message || "Error fetching bus by route",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const findBusByDriver = async (driver_id) => {
  try {
    const busExists = await Bus.findOne({ where: { driver_id } });
    if (!busExists) return false;
    return busExists;
  } catch (e) {
    throw new CustomError(
      e?.message || "Error fetching bus by driver",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const findBusById = async (id) => {
    try {
      const busData = await Bus.findByPk(id);
      if (!busData) return false;
      return busData;
    } catch (e) {
      throw new CustomError(
        e?.message || "Error fetching bus by id",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
};

export const removeBusById = async (id)=> {
    return await Bus.destroy({ where: { id: id } });
}

export const saveBus = async (newBus) => {
    return await Bus.create(newBus);
}

export const editBus = async (bus, id) => {
    const busData = await Bus.findByPk(id)
    if (!busData) {
        throw new Error(locales('bus_not_found'))
    }
    var updateBus = {
        plate_number: Bus.plate_number,
        agency_id: Bus.agency_id,
        route_id: Bus.route_id
    };

    return await Bus.update(updateBus, { where: { id: id } });
}