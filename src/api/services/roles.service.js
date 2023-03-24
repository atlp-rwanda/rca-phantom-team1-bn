import { StatusCodes } from "http-status-codes";
import models from "../../db/models";
import CustomError from "../utils/custom-error";

const { role } = models;

export const getAll = async () => {
  try {
    const data = await role.findAll();
    return data;
  } catch (e) {
    throw new CustomError(
      e?.message || "Error fetching roles",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const getRoleByTitle = async (title) => {
  try {
    const roleExists = await role.findOne({ where: { title } });
    if (!roleExists) return false;
    return roleExists;
  } catch (e) {
    throw new CustomError(
      e?.message || "Error fetching role by title",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const getRoleById = async (id) => {
  try {
    const roleData = await role.findByPk(id);
    if (!roleData) return false;
    return roleData;
  } catch (e) {
    throw new CustomError(
      e?.message || "Error fetching role by id",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const saveRole = async (newRole) => {
  try {
    const newRoleData = await role.create(newRole);
    return newRoleData;
  } catch (e) {
    throw new CustomError(
      e?.message || "Error saving new role",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
