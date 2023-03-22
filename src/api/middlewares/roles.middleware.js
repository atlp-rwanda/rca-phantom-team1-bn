import { StatusCodes } from "http-status-codes";
import { getRoleById, getRoleByTitle } from "../services/roles.service";

export const roleExistsByTitle = async (req, res, next) => {
  const method = req.method;
  const roleTitle = method === "GET" ? req?.params?.title : req?.body?.title;
  const roleExists = await getRoleByTitle(roleTitle.toUpperCase());

  if (method === "POST" && roleExists)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Role already exists." });

  if (method === "GET") {
    if (!roleExists)
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `Role with title [${roleTitle}] is not found`,
      });
    req.role = roleExists;
  }
  next();
};

export const roleExistsById = async (req, res, next) => {
  const role = await getRoleById(req.params.id);
  if (!role)
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: `Role with id [${req.params.id}] is not found`,
    });
  req.role = role;
  next();
};
