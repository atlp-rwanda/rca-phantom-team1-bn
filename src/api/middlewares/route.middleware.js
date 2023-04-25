/* eslint-disable prettier/prettier */
import { StatusCodes } from "http-status-codes";
import { findRouteById, findRouteByRouteName, getRoute } from "../services/route.service";

export const routeExistsById = async (req, res, next) => {
  const route = await findRouteById(req.params.id);
  if (!route)
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: `Route with id [${req.params.id}] is not found`,
    });
  req.route = route;
  next();
};

export const routeExists = async (req, res, next) => {
  const route = await getRoute(req.body.routerId);
  if (!route)
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: `Route is not found`,
    });
  req.route = route;
  next();
};

export const routeExistsByRouteName = async (req, res, next) => {
  const method = req.method;
  const routeName =
    method === "GET" ? req?.params?.route_name : req?.body?.route_name;

  const routeExists = await findRouteByRouteName(routeName);

  if (method === "POST" && routeExists)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Route already exists." });

  if (method === "GET") {
    if (!routeExists)
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `Route with route name [${routeName}] is not found`,
      });
  }
  next();
};
