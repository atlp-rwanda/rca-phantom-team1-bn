// import { StatusCodes } from "http-status-codes";
// import models from "../../db/models";
// import CustomError from "../utils/custom-error";

// const { route } = models;

// export async function getAllRoutes() {
//   try {
//     const routes = await route.findAll();
//     return routes;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function getRouteById(id) {
//   try {
//     const RouteModel = await route.findByPk(id);
//     return RouteModel;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function createRoute(routeData) {
//   try {
//     const RouteModel = await route.create(routeData);
//     return RouteModel;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function updateRoute(id, routeData) {
//   try {
//     const RouteModel = await route.findByPk(id);
//     if (!RouteModel) {
//       return null;
//     }
//     await RouteModel.update(routeData);
//     return RouteModel;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function deleteRoute(id) {
//   try {
//     const RouteModel = await route.findByPk(id);
//     if (!RouteModel) {
//       return null;
//     }
//     await RouteModel.destroy();
//     return RouteModel;
//   } catch (error) {
//     throw error;
//   }
// }

import locales from "../../config/languages";
import models from "../../db/models";
import CustomError from "../utils/custom-error";
import { StatusCodes } from "http-status-codes";
import { getPagingData } from "../utils/pagination";
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
