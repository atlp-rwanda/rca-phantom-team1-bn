/* eslint-disable prettier/prettier */

import locales from '../../config/languages'
import models from "../../db/models";
import CustomError from '../utils/custom-error';
import { StatusCodes } from "http-status-codes";
const { bus } = models

export const findAllBuses = async () => {
    try {
      const data = await bus.findAll();
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
      const busExists = await bus.findOne({ where: { plate_number } });
      if (!busExists) return false;
      return busExists;
    } catch (e) {
      throw new CustomError(
        e?.message || "Error fetching bus by plate number",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
};


export const findBusById = async (id) => {
    try {
      const busData = await bus.findByPk(id);
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
    return await bus.destroy({ where: { id: id } });
}

export const saveBus = async () => {
    return await bus.create();
}

export const editBus = async (bus, id) => {
    const busData = await bus.findByPk(id)
    if (!busData) {
        throw new Error(locales('bus_not_found'))
    }
    var updateBus = {
        plate_number: bus.plate_number,
        agency_id: bus.agency_id,
        route_id: bus.route_id
    };

    return await bus.update(updateBus, { where: { id: id } });
}