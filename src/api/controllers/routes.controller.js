import { StatusCodes } from "http-status-codes";
import {
  createRoute,
  editRoute,
  findAllRoutes,
  findRouteById,
  removeRouteById,
} from "../services/route.service";

export const getRoutes = async (req, res, next) => {
  try {
    const routes = await findAllRoutes();
    res.status(StatusCodes.OK).json({ success: true, data: routes });
  } catch (error) {
    next(error);
  }
};

export const getRoute = async (req, res, next) => {
  const { id } = req.params;
  try {
    const route = await findRouteById(id);
    if (!route) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `Route with id [${id}] not found`,
      });
    }
    res.status(StatusCodes.OK).json({ success: true, data: route });
  } catch (error) {
    next(error);
  }
};

export const saveRoute = async (req, res, next) => {
  const { body } = req;
  try {
    const route = await createRoute(body);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Route created successfully",
      data: route,
    });
  } catch (error) {
    next(error);
  }
};

export const routeUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedRoute = await editRoute(id, body);
    if (!updatedRoute) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `Route with id [${id}] not found`,
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Route updated successfully",
      data: updatedRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const routeDelete = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRoute = await removeRouteById(id);
    if (!deletedRoute) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `Route with id [${id}] not found`,
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Route deleted successfully",
      data: deletedRoute,
    });
  } catch (error) {
    next(error);
  }
};
