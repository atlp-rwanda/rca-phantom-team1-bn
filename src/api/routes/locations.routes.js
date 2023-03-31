import { Router } from "express";
import {
  getLocationById,
  getLocations,
  createLocation,
  updateLocation,
  deleteLocationById,
} from "../controllers/locations.controller";
import {
  locationExistsById,
  locationExistsByName,
} from "../middlewares/location.middleware";
import {
  validateCreateLocation,
  validateUpdateLocation,
} from "../validations/location.validator";

const locationRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: API for managing locations
 */

/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Get all locations
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Optional location name to filter results by
 *     responses:
 *       200:
 *         description: Returns a list of all locations
 *       500:
 *         description: Internal server error
 */

locationRouter.get("/", getLocations);

/**
 * @swagger
 * /locations:
 *   post:
 *     summary: Create a new location
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: number
 *                 description: Latitude of the location to create
 *               longitude:
 *                 type: number
 *                 description: Longitude of the location to create
 *               name:
 *                 type: string
 *                 description: Name of the location to create
 *     responses:
 *       201:
 *         description: Returns the created location
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
locationRouter.post("/", validateCreateLocation, locationExistsByName, createLocation);

/**
* @swagger
* /locations/{id}:
*   get:
*     summary: Get a single location by id
*     tags: [Locations]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: Id of the location to get
*     responses:
*       200:
*         description: Returns the requested location
*       404:
*         description: Location not found
*       500:
*         description: Internal server error
*/
locationRouter.get("/:id", locationExistsById, getLocationById);

/**
* @swagger
* /locations/{id}:
*   put:
*     summary: Update a single location by id
*     tags: [Locations]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: Id of the location to update
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               latitude:
*                 type: number
*                 description: Latitude of the location to update
*               longitude:
*                 type: number
*                 description: Longitude of the location to update
*               name:
*                 type: string
*                 description: Name of the location to update
*     responses:
*       200:
*         description: Returns the updated location
*       400:
*         description: Invalid request data
*       404:
*         description: Location not found
*       500:
*         description: Internal server error
*/
locationRouter.put("/:id", locationExistsById, validateUpdateLocation, updateLocation);

/**
* @swagger
* /locations/{id}:
*   delete:
*     summary: Delete a single location by id
*     tags: [Locations]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: Id of the location to delete
*     responses:
*       200:
*         description: Returns a message indicating the location was deleted
*       404:
*         description: Location not found
*       500:
*         description: Internal server error
*/
locationRouter.delete("/:id", locationExistsById, deleteLocationById);

export default locationRouter;

