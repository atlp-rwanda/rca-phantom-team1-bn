/* eslint-disable prettier/prettier */
import { Router } from "express";
import {
    getBuses,
    getBusById,
    createBus,
    updateBus,
    deleteBusById
  } from "../controllers/bus.controllers";

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
 *         - route_id
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
 *         route_id:
 *           type: string
 *           description: The bus route
 *       example:
 *         plate_number: KL3MS
 *         agency_id: 12321
 *         route_id: 12324
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
 *     summary: Returns the list of all the buses
 *     tags: [Buses]
 *     responses:
 *       200:
 *         description: The list of the Buses
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

router.get("/:id", getBusById);

/**
 * @swagger
 * /buses:
 *   post:
 *     summary: Create a new bus
 *     tags: [Buses]
 *     requestBody:
 *       required: true
 *       content:
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

// eslint-disable-next-line consistent-return
router.post("/", createBus)

/**
 * @swagger
 * /buses/{id}:
 *  put:
 *    summary: Update the bus by the id
 *    tags: [Buses]
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

router.put("/:id", updateBus);

/**
 * @swagger
 * /buses/{id}:
 *  delete:
 *    summary: Remove the bus by id
 *    tags: [Buses]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The bus id
 *
 *    responses:
 *      200:
 *        description: The bus was deleted
 *      404:
 *        description: The bus was not found
 *     500:
 *       description: Some error happened
 */

router.delete("/:id", deleteBusById);

export default router;
