import { StatusCodes } from "http-status-codes";
import models from "../../db/models";
import CustomError from "../utils/custom-error";


const { route, Bus } = models;


export async function getAllRoutes() {
  try {
    const routes = await route.findAll({
      include: [
        {
          model: Bus,
          as: 'bus'
        }
      ]
    });
    return routes;
  } catch (error) {
    throw error;
  }
}

export async function getRouteById(id) {
  try {
    const route = await route.findByPk(id, {
      include: [
        {
          model: Bus,
          as: 'bus'
        }
      ]
    });
    return route;
  } catch (error) {
    throw error;
  }
}

export async function createRoute(routeData) {
  try {
    const route = await route.create(routeData);
    return route;
  } catch (error) {
    throw error;
  }
}

export async function updateRoute(id, routeData) {
  try {
    const route = await route.findByPk(id);
    if (!route) {
      return null;
    }
    await route.update(routeData);
    return route;
  } catch (error) {
    throw error;
  }
}

export async function deleteRoute(id) {
  try {
    const route = await route.findByPk(id);
    if (!route) {
      return null;
    }
    await route.destroy();
    return route;
  } catch (error) {
    throw error;
  }
}
