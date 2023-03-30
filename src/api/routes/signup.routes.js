import express from 'express';
import {signUpUserWithRole } from '../controllers/signup.controller.js';
const router = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user account
 *     tags: [User]
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
 *               phone_number:
 *                 type: string
 *               fullname:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [driver, operator]
 *             required:
 *               - email
 *               - phone
 *               - name
 *               - role
 *     responses:
 *       200:
 *         description: Successfully created user account
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 */
 router.post('/', signUpUserWithRole);

export default router;