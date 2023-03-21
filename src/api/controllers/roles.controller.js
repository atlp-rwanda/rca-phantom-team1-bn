import { StatusCodes } from "http-status-codes";
import models from "../../db/models";

export const getRoles = async (req, res, next) => {
  try {
    const roles = await models.role.findAll();
    res.status(StatusCodes.OK).json({ roles });
  } catch (error) {
    next(error);
  }
};

export const getRoleById = async (req, res, next) => {
  const { role } = req.params;
  try {
    const roleData = await models.role.findOne({ where: { role } });
    if (!roleData) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Role not found" });
    }
    res.status(StatusCodes.OK).json({ roleData });
  } catch (error) {
    next(error);
  }
};

export const roleExists = async (role) => {
  const roleData = await models.role.findOne({ where: { role } });
  if (!roleData) return false;
  return roleData;
};

export const createRole = async (req, res, next) => {
  const role = req.body;
  try {
    const roleData = await models.role.create(role);
    res.status(StatusCodes.CREATED).json({ roleData });
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (req, res, next) => {
  const { id } = req.params;
  const newRole = req.body;
  try {
    const roleData = await models.role.findOne({ where: { id } });
    if (!roleData) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Role not found" });
    }
    await roleData.update(newRole);
    res.status(StatusCodes.OK).json({ roleData });
  } catch (error) {
    next(error);
  }
};

export const deleteRoleById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const roleData = await models.role.findByPk(id);
    if (!roleData) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Role not found" });
    }
    await roleData.destroy();
    res
      .status(StatusCodes.OK)
      .json({ message: `Role with id ['${id}'] has been deleted` });
  } catch (error) {
    next(error);
  }
};
