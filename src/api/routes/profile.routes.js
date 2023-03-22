import { Router } from "express";
import { updateAProfile } from "../controllers/profile.controller";

const profileRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *         - roles
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: UUID
 *           description: The auto-generated id of the profile
 *         fullName:
 *           type: string
 *           description: The profile full name
 *         email:
 *           type: string
 *           description: The profile email
 *         password:
 *           type: string
 *           description: The profile password
 *         roles:
 *           type: string
 *           description: The profile role
 *         createdAt:
 *           type: date
 *           description: The time profile was created
 *         updatedAt:
 *           type: date
 *           description: The time profile was updated
 *       example:
 *         fullName: Musa Moses
 *         email: musa@mit.edu
 *         password: ange@mit.edu
 */

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: The profiles managing API
 */

/**
 * @swagger
 * /api/profile/{id}:
 *  put:
 *    summary: Update the profile by the id
 *    tags: [Profiles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The profile id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Profile'
 *    responses:
 *      200:
 *        description: The profile was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Profile'
 *      404:
 *        description: The profile was not found
 *      500:
 *        description: Some error happened
 */

profileRouter.put("/:id", updateAProfile);

export default profileRouter;
