import { Route, Bus } from '../../db/models/index';

export async function getAllRoutes() {
  try {
    const routes = await Route.findAll({
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
    const route = await Route.findByPk(id, {
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
    const route = await Route.create(routeData);
    return route;
  } catch (error) {
    throw error;
  }
}

export async function updateRoute(id, routeData) {
  try {
    const route = await Route.findByPk(id);
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
    const route = await Route.findByPk(id);
    if (!route) {
      return null;
    }
    await route.destroy();
    return route;
  } catch (error) {
    throw error;
  }
}
