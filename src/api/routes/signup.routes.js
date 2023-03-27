import express from "express";
import {
  signUpDriver,
  signUpOperator,
} from "../controllers/signup.controller.js";

const router = express.Router();

/**
 * @swagger
 * /signup/driver:
 *   post:
 *     summary: Create a new driver account
 *     tags: [Driver]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - email
 *               - name
 *     responses:
 *       200:
 *         description: Successfully created driver account
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 */
router.post("/driver", signUpDriver);

/**
 * @swagger
 * /signup/operator:
 *   post:
 *     summary: Create a new operator account
 *     tags: [Operator]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - email
 *               - name
 *     responses:
 *       200:
 *         description: Successfully created operator account
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 */
router.post("/operator", signUpOperator);

export default router;
