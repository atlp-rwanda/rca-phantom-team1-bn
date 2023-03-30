/* eslint-disable prettier/prettier */
import { StatusCodes } from "http-status-codes";
import models from "../../db/models";
import CustomError from "../utils/custom-error";

const { DriverBusAssignment } = models;

export const assignDriver = async (busId, driverId) => {
 try {
   const newRoleData = await DriverBusAssignment.create({busId, driverId});
   
   return newRoleData;
 } catch (e) {
   throw new CustomError(
     e?.message || "Error saving new assignment",
     StatusCodes.INTERNAL_SERVER_ERROR
   );
 }
};

export const getAll = async () => {
 try {
   const data = await DriverBusAssignment.findAll();
   return data;
 } catch (e) {
   throw new CustomError(
     e?.message || "Error fetching assignments",
     StatusCodes.INTERNAL_SERVER_ERROR
   );
 }
};
