import { Router } from "express";
import {
  getProfile,
  updateAProfile,
  getProfiles,
} from "../controllers/profile.controller";
import { checkUserLoggedIn } from "../middlewares/protect.middleware";
import { validateUpdateUserPayload as validation } from "../validations/user.validator";

const profileRouter = Router();

/**
 * @swagger
 * /profiles:
 *  get:
 *    summary: Get the profiles
 *    tags: [Profiles]
 *    responses:
 *      200:
 *        description: The profiles was retrieved
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Profile'
 *      500:
 *        description: Some error happened
 */

profileRouter.get("/profiles", getProfiles);

/**
 * @swagger
 * /profile:
 *  get:
 *    summary: Get logged in user profile
 *    tags: [Profiles]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: The profile was retrieved
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Profile'
 *      404:
 *        description: The profile was not found
 *      500:
 *        description: Some error happened
 */

profileRouter.get("/profile", checkUserLoggedIn, getProfile);

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       required:
 *         - fullname
 *         - email
 *         - phone_number
 *       properties:
 *         id:
 *           type: UUID
 *           description: The auto-generated id of the profile
 *         fullname:
 *           type: string
 *           description: The profile full name
 *         email:
 *           type: string
 *           description: The profile email
 *         phone_number:
 *           type: string
 *           description: The profile phone number
 *       example:
 *         fullname: Musa Moses
 *         email: musa@mit.edu
 *         phone_number: 25078654653
 */

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: The profiles managing API
 */

/**
 * @swagger
 * /profile:
 *  put:
 *    summary: Update the profile
 *    tags: [Profiles]
 *    security:
 *      - bearerAuth: []
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

profileRouter.put("/profile", checkUserLoggedIn, validation, updateAProfile);

export default profileRouter;
