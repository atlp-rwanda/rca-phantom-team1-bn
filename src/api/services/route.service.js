import locales from "../../config/languages";
import models from "../../db/models";
import CustomError from "../utils/custom-error";
import { StatusCodes } from "http-status-codes";
import { getPagingData } from "../utils/pagination";
import { Op, Sequelize } from "sequelize";
const { route } = models;

export const findAllRoutes = async (limit, offset, condition, page) => {
  try {
    const data = await route.findAndCountAll({
      where: condition,
      limit,
      offset,
    });
    const response = getPagingData(data, page, limit);
    return response;
  } catch (e) {
    throw new CustomError(
      e?.message || "Error fetching routes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const findRouteById = async (id) => {
  try {
    const routeData = await route.findByPk(id);
    if (!routeData) return false;
    return routeData;
  } catch (e) {
    throw new CustomError(
      e?.message || "Error fetching route by id",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const findRouteByRouteName = async (route_name) => {
  try {
    const routeData = await route.findOne({
      where: Sequelize.where(
        Sequelize.fn("lower", Sequelize.col("route_name")),
        { [Op.iLike]: route_name.toLowerCase() }
      ),
    });
    if (!routeData) return false;
    return routeData;
  } catch (e) {
    throw new CustomError(
      e?.message || "Error fetching route by route name",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const createRoute = async (newRoute) => {
  return await route.create(newRoute);
};

export const editRoute = async (route, id) => {
  const routeData = await route.findByPk(id);
  if (!routeData) {
    throw new Error(locales("route_not_found"));
  }
  var updateRoute = {
    route_name: route.route_name,
    origin_id: route.origin_id,
    destination_id: route.destination_id,
    bus_stop_id: route.bus_stop_id,
  };

  return await route.update(updateRoute, { where: { id: id } });
};

export const removeRouteById = async (id) => {
  return await route.destroy({ where: { id: id } });
};
