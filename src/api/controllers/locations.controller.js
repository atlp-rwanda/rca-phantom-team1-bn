/* eslint-disable prettier/prettier */
import { StatusCodes } from "http-status-codes";
import { getLocation, getAllLocations, createNewLocation, updateExistingLocation, deleteLocation, getLocationByName, assignRoute} from "../services/locations.service";

export const getLocations = async (req, res, next) => {
  const { name } = req.query;

  try {
    let locations;
    if (name) {
      locations = await getLocationByName(name); // use the service method
    } else {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        locations = await getAllLocations(limit, offset);
      };
    if (!locations && name)
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `Location with name [${name}] is not found`,
      });
    return res.status(StatusCodes.OK).json({ success: true, data: locations });
  } catch (error) {
    next(error);
  }
};

export const getLocationById = async (req, res, next) => {
  try {
    const locationData = await getLocation(req.params.id); // use the service method
    res.status(StatusCodes.OK).json({ success: true, location: locationData });
  } catch (error) {
    next(error);
  }
};

export const createLocation = async (req, res, next) => { // rename the controller method
  const location = req.body;
  try {
    const locationData = await createNewLocation(location);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Location created successfully",
      location: locationData,
    });
  } catch (error) {
    next(error);
  }
};

export const assignRouteToLocation = async (req, res) => {
  try {
    const { routerId } = req.body;
    const { id } = req.params;
    
    const assignment = await assignRoute(id, routerId);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: assignment
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message
    });
  }
};

export const updateLocation = async (req, res, next) => {
  const newLocation = req.body;
  try {
    const updatedLocation = await updateExistingLocation(req.params.id, newLocation); // use the service method
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Location updated successfully",
      location: updatedLocation,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLocationById = async (req, res, next) => {
  try {
    await deleteLocation(req.params.id); // use the service method
    res
      .status(StatusCodes.OK)
      .json({ message: `Location with id ['${req.params.id}'] has been deleted` });
  } catch (error) {
    next(error);
  }
};