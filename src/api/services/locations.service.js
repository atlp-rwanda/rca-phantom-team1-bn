import { StatusCodes } from "http-status-codes";
import models from "../../db/models";

const { location } = models;

export const getLocation = async (id) => {
  try {
    const data = await location.findOne({ where: { id } });
    return data;
  } catch (e) {
    const error = new Error(e?.message || "Error fetching location");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

export const getAllLocations = async () => {
  try {
    const data = await location.findAll();
    return data;
  } catch (e) {
    const error = new Error(e?.message || "Error fetching all locations");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
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
    const location = await location.findOne({ where: { name } });
    return location;
  } catch (e) {
    const error = new Error(e?.message || "Error checking location by name");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};