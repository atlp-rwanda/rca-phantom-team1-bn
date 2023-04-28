/* eslint-disable prettier/prettier */
import locales from "../../config/languages";
import models from "../../db/models";
import CustomError from "../utils/custom-error";
import { StatusCodes } from "http-status-codes";
import { getDriver } from "./driver.service";
import { sendEmail } from "../utils/email";
const { bus, agency , user} = models;

export const getBus = async (busId) => {
  try {
   
    const data = await bus.findOne({ where: { id: busId } });
    return data;
  } catch (e) {
    const error = new CustomError(e?.message || "Error getting bus");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

export const findAllBuses = async (limit, offset) => {
  try {
    const response = await bus.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: user,
          as: 'driver',
          foreignKey: 'driverId'
        }, 
        {
          model: agency,
          as: 'agency'
        },
      ]
    });
    return response;
  } catch (e) {
    throw new CustomError(
      e?.message || "Error fetching buses",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const findBusByPlateNumber = async (plateNumber) => {
  try {
    const busExists = await bus.findOne({ 
      where: { plateNumber },
      include: [
        {
          model: user,
          as: 'driver',
          foreignKey: 'driverId'
        }, 
        {
          model: agency,
          as: 'agency'
        },
      ]
    });
    if (!busExists) return false;
    return busExists;
  } catch (e) {
    throw new CustomError(
      e?.message || "Error fetching bus by plate number",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const findBusByAgency = async (agencyId) => {
  try {
    const busesExists = await bus.findOne({ 
      where: { agencyId },
      include: [
        {
          model: user,
          as: 'driver',
          foreignKey: 'driverId'
        }, 
        {
          model: agency,
          as: 'agency'
        },
      ]
    });
    if (!busesExists) return false;
    return busesExists;
  } catch (e) {
    throw new CustomError(
      e?.message || "Error fetching bus by agency",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

 export const assignDriver = async (busId, driverId) => {
  try {

    const bus = await getBus(busId);
    bus.driver_id = driverId;
    
    const driver = await getDriver(driverId);
    driver.isAssigned = true; // fix: assign to driver, not user
    
    await bus.save();
    await driver.save(); // fix: save the updated driver instead of user

    // Send an email to the user with the updated assignment
    await sendEmail(
      "Bus Assignment",
      driver.email,
      `Hi ${driver.fullname}, <br /><br />
      You have been assigned to bus ${bus.plate_number}.<br />
      Please report to the office for further details.<br /><br />
      Best regards,<br />
      Transportation Company`
    );

    return { message: "Driver assigned to bus successfully" };
  } catch (e) {
    throw new CustomError(
      e?.message || "Error while assigning driver to bus",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const findBusByRoute = async (route_id) => {
  try {
    const busExists = await bus.findOne({ 
      where: { route_id },
      include: [
        {
          model: user,
          as: 'driver',
          foreignKey: 'driverId'
        }, 
        {
          model: agency,
          as: 'agency'
        },
      ]
    });
    if (!busExists) return false;
    return busExists;
  } catch (e) {
    throw new CustomError(
      e?.message || "Error fetching bus by route",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const findBusByDriver = async (driverId) => {
  try {
    const busExists = await bus.findOne({ 
      where: { driverId },
      include: [
        {
          model: user,
          as: 'driver',
          foreignKey: 'driverId'
        }, 
        {
          model: agency,
          as: 'agency'
        },
      ]
    });
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
    const busData = await bus.findByPk(id, {
      include: [
        {
          model: user,
          as: 'driver',
          foreignKey: 'driverId'
        }, 
        {
          model: agency,
          as: 'agency'
        },
      ]
    });
    if (!busData) return false;
    return busData;
  } catch (e) {
    throw new CustomError(
      e?.message || "Error fetching bus by id",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const removeBusById = async (id) => {
  return await bus.destroy({ where: { id: id } });
};

export const saveBus = async (newBus) => {
  return await bus.create(newBus);
};

export const editBus = async (bus, id) => {
  const busData = await bus.findByPk(id);
  if (!busData) {
    throw new Error(locales("bus_not_found"));
  }
  var updateBus = {
    plateNumber: bus.plateNumber,
    agencyId: bus.agencyId,
    route_id: bus.route_id,
  };

  return await bus.update(updateBus, { where: { id: id } });
};
