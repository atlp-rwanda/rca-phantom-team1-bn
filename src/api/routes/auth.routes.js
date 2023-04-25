import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { validateLogin } from "../validations/auth.validator";
import { checkUserExists } from "../middlewares/auth.middleware";
import { resetPassword, resetPasswordEmail } from "../controllers/resetPassword.controller.js";

const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for managing authentication
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a JWT token
 *       401:
 *         description: Unauthorized - invalid credentials
 *       500:
 *         description: Internal server error
 */
authRouter.post("/login", validateLogin, checkUserExists, login);


/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: user reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: reset password email sent
 *       400:
 *         description: User not found
 *       500:
 *         description: reset password email fail
 */
authRouter.post("/forgot-password", resetPasswordEmail);

/**
 * @swagger
 * /auth/reset-password/{resetToken}:
 *   post:
 *     summary: user reset password
 *     tags: [Auth]
 *     parameters:
 *      - in: path
 *        name: resetToken
 *        schema:
 *          type: string
 *        required: true
 *        description: id of the bus to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *             required:
 *               - newPassword
 *     responses:
 *       200:
 *         description: user password updated
 *       404:
 *         description: invalid or expired token
 *       500:
 *         description: failed to update password
 */
authRouter.post("/reset-password/:resetToken", resetPassword);

export default authRouter;
