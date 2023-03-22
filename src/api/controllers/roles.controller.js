import { StatusCodes } from "http-status-codes";
import { getAll, saveRole, getRoleByTitle } from "../services/roles.service";

export const getRoles = async (req, res, next) => {
  const { title } = req.query;

  try {
    let roles;
    if (title) {
      roles = await getRoleByTitle(title);
    } else {
      roles = await getAll();
    }
    if (!roles && title)
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `Role with title [${title}] is not founnd`,
      });
    return res.status(StatusCodes.OK).json({ success: true, data: roles });
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
    const roleData = await saveRole({
      ...role,
      title: role?.title.toLowerCase(),
    });
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
