/* eslint-disable prettier/prettier */
import { StatusCodes } from "http-status-codes";
import { assignDriver, getAll } from "../services/driver-bus-assignment.service";

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

