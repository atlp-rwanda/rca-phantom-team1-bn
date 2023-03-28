import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { validateLogin } from "../validations/auth.validator";
import {checkUserExists} from "../middlewares/auth.middleware"

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

export default authRouter;
