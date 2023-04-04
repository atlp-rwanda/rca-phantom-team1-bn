/* eslint-disable prettier/prettier */
import { Router } from "express";
import {
  getBuses,
  getBusById,
  createBus,
  updateBus,
  deleteBusById,
} from "../controllers/bus.controllers";
import ERoles from "../enums/ERole";
import {
  agencyExists,
  busExistsById,
  busExistsByPlateNumber,
} from "../middlewares/bus.middleware";
import {
  checkUserLoggedIn,
  restrictTo,
} from "../middlewares/protect.middleware";

import {assignDriverToBus, getDriverToBusAssignments} from "../controllers/bus.controllers";
import { busExists } from "../middlewares/bus.middleware";
import { driverExists } from "../middlewares/driver.middleware";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Bus:
 *       type: object
 *       required:
 *         - plate_number
 *         - agency_id
 *         - driver_id
 *         - router_id
 *         - seats
 *         - av_seats
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the bus
 *         plate_number:
 *           type: string
 *           description: The bus plate number
 *         agency_id:
 *           type: string
 *           description: The bus agency
 *         driver_id:
 *           type: string
 *           description: The bus driver
 *         router_id:
 *           type: string
 *           description: The bus route
 *         seats:
 *           type: string
 *           description: The total number of seats in a bus
 *         av_seats:
 *           type: string
 *           description: The available seats
 *       example:
 *         plate_number: KL3MS
 *         agency_id: 12321
 *         router_id: 2
 *         driver_id: 1
 *         av_seats: 15
 *         seats: 30
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

/**
 * @swagger
 * /buses/get-all-buses:
 *   get:
 *     summary: Returns the list of all the bus assignments
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: plate_number
 *         schema:
 *           type: string
 *         description: Optional plate number to filter results by
 *     responses:
 *       200:
 *         description: The list of the bus assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bus'
 *       500:
 *         description: Some server error
 */

router.get("/", getBuses);

/**
 * @swagger
 * /buses/{id}:
 *   get:
 *     summary: Get the bus by id
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bus id
 *     responses:
 *       200:
 *         description: The bus description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       404:
 *         description: The bus was not found
 */

router.get("/:id", busExistsById, getBusById);

/**
 * @swagger
 * /buses:
 *   post:
 *     summary: Create a new bus
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *     parameters:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       200:
 *         description: The bus was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       409:
 *         description: bus already registered
 *       500:
 *         description: Some server error
 */

router.post(
  "/",
  checkUserLoggedIn,
  restrictTo(ERoles.OPERATOR),
  busExistsByPlateNumber,
  agencyExists,
  createBus
);

/**
 * @swagger
 * /buses/{id}:
 *  put:
 *    summary: Update the bus by the id
 *    tags: [Buses]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The bus id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Bus'
 *    responses:
 *      200:
 *        description: The bus was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Bus'
 *      409:
 *        description: bus already registered
 *      500:
 *        description: Some error happened
 */

router.put(
  "/:id",
  checkUserLoggedIn,
  restrictTo(ERoles.OPERATOR),
  busExistsById,
  agencyExists,
  updateBus
);

/**
 * @swagger
 * /buses/{id}:
 *   delete:
 *     summary: Delete a bus by Id
 *     tags: [Buses]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the bus to delete
 *     responses:
 *       200:
 *         description: bus deleted successfully
 *       404:
 *         description: bus not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/:id",
  checkUserLoggedIn,
  restrictTo(ERoles.OPERATOR),
  busExistsById,
  deleteBusById
);

export default router;
