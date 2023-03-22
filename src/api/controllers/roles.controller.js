import { StatusCodes } from "http-status-codes";
import { getAll, saveRole } from "../services/roles.service";

export const getRoles = async (req, res, next) => {
  try {
    const roles = await getAll();
    return res.status(StatusCodes.OK).json({ success: true, roles });
  } catch (error) {
    next(error);
  }
};

export const getRoleByTitle = async (req, res, next) => {
  try {
    const roleData = req.role;
    res.status(StatusCodes.OK).json({ success: true, role: roleData });
  } catch (error) {
    next(error);
  }
};

export const getRoleById = async (req, res, next) => {
  try {
    const roleData = req.role;
    res.status(StatusCodes.OK).json({ success: true, role: roleData });
  } catch (error) {
    next(error);
  }
};

export const createRole = async (req, res, next) => {
  const role = req.body;
  try {
    const roleData = await saveRole(role);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Role created successfully",
      role: roleData,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (req, res, next) => {
  const newRole = req.body;
  try {
    const updatedRole = await req.role.update(newRole);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Role updated successfully",
      role: updatedRole,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRoleById = async (req, res, next) => {
  try {
    await req.role.destroy();
    res
      .status(StatusCodes.OK)
      .json({ message: `Role with id ['${req.role.id}'] has been deleted` });
  } catch (error) {
    next(error);
  }
};
