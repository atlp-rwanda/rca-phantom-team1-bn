/* eslint-disable prettier/prettier */
import { Router } from "express";
import {
  getBuses,
  getBusById,
  createBus,
  updateBus,
  deleteBusById,
  getBusesByPlateNumber,
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
 * tags:
 *   name: Buses
 *   description: The buses managing API
 */

/**
 * @swagger
 * /buses:
 *   get:
 *     summary: Get a paginated list of buses
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         required: false
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         required: false
 *     responses:
 *       200:
 *         description: A list of buses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Total number of buses
 *                 buses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Bus'
 *                   description: List of buses for the requested page
 *       500:
 *         description: Internal server error
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
 * /buses/plate/{plate_number}:
 *   get:
 *     summary: Get the bus by id
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: plate_number
 *         schema:
 *           type: string
 *         required: true
 *         description: The bus plate number
 *     responses:
 *       200:
 *         description: The bus description by plate number
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       404:
 *         description: The bus was not found
 *       500:
 *         description: Internal server error
 */

router.get("/plate/:plate_number", busExistsByPlateNumber, getBusesByPlateNumber);

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
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       201:
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
  restrictTo(ERoles.OPERATOR|| ERoles.ADMINISTRATOR),
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
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Bus'
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
  restrictTo(ERoles.OPERATOR || ERoles.ADMINISTRATOR),
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
  restrictTo(ERoles.OPERATOR|| ERoles.ADMINISTRATOR),
  busExistsById,
  deleteBusById
);

export default router;
