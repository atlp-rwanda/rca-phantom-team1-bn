/* eslint-disable prettier/prettier */
import { Router } from "express";
import { nanoid } from "nanoid";
import {assignDriverToBus, getDriverToBusAssignments} from "../controllers/bus.controllers";
import { busExists } from "../middlewares/bus.middleware";
import { driverExists } from "../middlewares/driver.middleware";

import operatorCheck from "../middlewares/operatorCheck";
import { checkUserLoggedIn, restrictTo } from "../middlewares/protect.middleware";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Bus:
 *       type: object
 *       required:
 *         - plate
 *         - driver
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the bus
 *         plate:
 *           type: string
 *           description: The bus plate
 *         driver:
 *           type: string
 *           description: The bus driver
 *       example:
 *         plate: KL3MS
 *         driver: Kellia Umuhire
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BusDriver:
 *       type: object
 *       required:
 *         - bus_id
 *         - driver_id
 *       properties:
 *         bus_id:
 *           type: number
 *           description: The auto-generated id of the bus
 *         driver_id:
 *           type: number
 *           description: The auto-generated id of the driver
 */


/**
 * @swagger
 * /buses/assign-driver:
 *  put:
 *    summary: Assign a driver to a bus
 *    tags: [Buses]
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BusDriver'
 *    responses:
 *      200:
 *        description: The assignment was done successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Bus'
 *      404:
 *        description: The bus or driver was not found
 *      500:
 *        description: Some error happened
 */

router.put("/assign-driver",checkUserLoggedIn,restrictTo("operator"),busExists,driverExists,assignDriverToBus);

/**
 * @swagger
 * /buses/get-all-bus-assignments:
 *   get:
 *     summary: Returns the list of all the bus assignments
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the bus assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bus'
 */

router.get("/get-all-bus-assignments", checkUserLoggedIn,restrictTo("operator"), getDriverToBusAssignments);

export default router;
