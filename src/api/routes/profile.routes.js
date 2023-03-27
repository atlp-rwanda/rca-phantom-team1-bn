import { Router } from "express";
import { getProfile, updateAProfile } from "../controllers/profile.controller";
import ERoles from "../enums/ERole";
import {
  allowedToEditProfile,
  userProfileExists,
} from "../middlewares/profile.middleware";
import {
  checkUserLoggedIn,
  restrictTo,
} from "../middlewares/protect.middleware";
import { validateUpdateUserPayload } from "../validations/user.validator";

const profileRouter = Router();

/**
 * @swagger
 * /profile/{id}:
 *  get:
 *    summary: Get the profile by the id
 *    tags: [Profiles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The profile id
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

profileRouter.get("/:id", userProfileExists, getProfile);

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - phone_number
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
 *       example:
 *         fullName: Musa Moses
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
 * /profile/{id}:
 *  put:
 *    summary: Update the profile by the id
 *    tags: [Profiles]
 *    security:
 *      - bearerAuth: []
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

profileRouter.put(
  "/:id",
  checkUserLoggedIn,
  restrictTo(ERoles.OPERATOR, ERoles.DRIVER),
  userProfileExists,
  allowedToEditProfile,
  validateUpdateUserPayload,
  updateAProfile
);

export default profileRouter;
