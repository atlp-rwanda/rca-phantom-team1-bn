import { Router } from "express";
import { nanoid } from "nanoid";
import {
  getRoute,
  getRoutes,
  routeDelete,
  routeUpdate,
  saveRoute,
} from "../controllers/routes.controller";
import {
  routeExistsById,
  routeExistsByRouteName,
} from "../middlewares/route.middleware";
import {
  validateCreateRoute,
  validateUpdateRoute,
} from "../validations/route.validator";

const routeRouter = Router();
const idLength = 8;
/**
 * @swagger
 * components:
 *   schemas:
 *     Route:
 *       type: object
 *       required:
 *         - route_name
 *         - origin_id
 *         - destination_id
 *         - bus_stop_id
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the route
 *         route_name:
 *           type: string
 *           description: The name of the route
 *         origin_id:
 *           type: integer
 *           description: The id of the origin point of the route
 *         destination_id:
 *           type: integer
 *           description: The id of the destination point of the route
 *         bus_stop_id:
 *           type: integer
 *           description: The id of the bus stop for the route
 *       example:
 *         route_name: GISOZI
 *         origin_id: 1
 *         destination_id: 2
 *         bus_stop_id: 3
 */

/**
 * @swagger
 * tags:
 *   name: Routes
 *   description: The routes managing API
 */

/**
 * @swagger
 * /routes:
 *   get:
 *     summary: Returns the list of all the routes
 *     tags: [Routes]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the routes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Route'
 */

routeRouter.get("/", getRoutes);

/**
 * @swagger
 * /routes/{id}:
 *   get:
 *     summary: Get the route by id
 *     tags: [Routes]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The route id
 *     responses:
 *       200:
 *         description: The route description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       404:
 *         description: The route was not found
 */

routeRouter.get("/:id", routeExistsById, getRoute);

/**
 * @swagger
 * /routes:
 *   post:
 *     summary: Create a new route
 *     tags: [Routes]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       200:
 *         description: The route was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       500:
 *         description: Some server error
 */

// eslint-disable-next-line consistent-return
routeRouter.post("/", validateCreateRoute, routeExistsByRouteName, saveRoute);

/**
 * @swagger
 * /routes/{id}:
 *  put:
 *    summary: Update the routes by the id
 *     security:
 *      - bearerAuth: []
 *    tags: [Routes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The route id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Route'
 *    responses:
 *      200:
 *        description: The routes was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Route'
 *      404:
 *        description: The route was not found
 *      500:
 *        description: Some error happened
 */

routeRouter.put("/:id", validateUpdateRoute, routeExistsById, routeUpdate);

/**
 * @swagger
 * /routes/{id}:
 *   delete:
 *     summary: Remove the route by id
 *     tags: [Routes]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The route id
 *
 *     responses:
 *       200:
 *         description: The route was deleted
 *       404:
 *         description: The route was not found
 */

routeRouter.delete("/:id", routeExistsById, routeDelete);

export default routeRouter;
