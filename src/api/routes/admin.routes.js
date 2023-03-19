import { Router } from "express";
import { login } from "../controllers/admin.controller";
import { validateLogin } from "../validations/auth.validator";

const adminRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API for managing admin users
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Authenticate an admin user
 *     tags: [Admin]
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
adminRouter.post("/login", validateLogin, login);

export default adminRouter;
