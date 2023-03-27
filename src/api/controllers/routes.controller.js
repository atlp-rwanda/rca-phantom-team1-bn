
import { createRoute, deleteRoute, getAllRoutes, getRouteById, updateRoute } from "../services/route.service";

export  const getRoutes = (req, res) => {
    const routes = getAllRoutes;
    
    res.send(routes);
}

export const getRoute = (req, res) => {
    const route = getRouteById(req.params.id);
    
    res.send(route);
}

export const saveRoute = (req, res) => {
    const route = createRoute(req.body);
    
    res.send(route);
}

export const routeUpdate = (req, res) => {
    const route = updateRoute(req.params.id, req.body);
    
    res.send(route);
}

export const routeDelete = (req, res) => {
    const route = deleteRoute(req.params.id);
    
    res.send(route);
}
