import { Router } from "express";
import { nanoid } from "nanoid";
import { getRoute, routeDelete, routeUpdate, saveRoute } from "../controllers/routes.controller";
import { getAllRoutes } from "../services/route.service";

const router = Router();
const idLength = 8;

/**
 * @swagger
 * components:
 *   schemas:
 *     Route:
 *       type: object
 *       required:
 *         - route_name
 *         - bus_id
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the route
 *         route_name:
 *           type: string
 *           description: The name of the route
 *         bus_id:
 *           type: number
 *           description: The origin of the route
 *       example:
 *         route_name: GISOZI
 *         bus_id: 234353545
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

router.get("/", getAllRoutes);

/**
 * @swagger
 * /routes/{id}:
 *   get:
 *     summary: Get the route by id
 *     tags: [Routes]
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

router.get("/:id", getRoute);

/**
 * @swagger
 * /routes:
 *   post:
 *     summary: Create a new route
 *     tags: [Routes]
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
router.post("/", saveRoute);

/**
 * @swagger
 * /routes/{id}:
 *  put:
 *    summary: Update the routes by the id
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

router.put("/:id", routeUpdate);

/**
 * @swagger
 * /routes/{id}:
 *   delete:
 *     summary: Remove the route by id
 *     tags: [Routes]
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

router.delete("/:id", routeDelete);
  
  export default router;
  