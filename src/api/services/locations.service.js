/* eslint-disable prettier/prettier */
import { StatusCodes } from "http-status-codes";
import models from "../../db/models";
import CustomError from "../utils/custom-error";
import { getRoute } from "./route.service";

const { location, route } = models;

export const getLocation = async (locationId) => {
  try {
   
    const data = await location.findOne({ where: { id: locationId } });
    return data;
  } catch (e) {
    const error = new CustomError(e?.message || "Error getting location");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

export const getAllLocations = async (limit, offset) => {
  try {
    const response = await location.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: route,
          as: 'route',
          foreignKey: 'routerId'
        }, 
      ]
    });
    return response;
  } catch (e) {
    throw new CustomError(
      e?.message || "Error fetching locations",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};


export const assignRoute = async (locationId, routerId) => {
  try {

    const location = await getLocation(locationId);
    location.routerId = routerId;
    
    const route = await getRoute(routerId);
    route.isAssigned = true;
    
    await location.save();
    await route.save();

    return { message: "Route assigned to location successfully" };
  } catch (e) {
    throw new CustomError(
      e?.message || "Error while assigning route to location",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const createNewLocation = async (locationData) => {
  try {
    const data = await location.create(locationData);
    return data;
  } catch (e) {
    const error = new Error(e?.message || "Error creating location");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

export const updateExistingLocation = async (id, locationData) => {
  try {
    const data = await location.update(locationData, { where: { id } });
    return data;
  } catch (e) {
    const error = new Error(e?.message || "Error updating location");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

export const deleteLocation = async (id) => {
  try {
    const data = await location.destroy({ where: { id } });
    return data;
  } catch (e) {
    const error = new Error(e?.message || "Error deleting location");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

export const getLocationByName = async (name) => {
  try {
    const foundLocation = await location.findOne({ where: { name } });
    return foundLocation;
  } catch (e) {
    const error = new Error(e?.message || "Error checking location by name");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};