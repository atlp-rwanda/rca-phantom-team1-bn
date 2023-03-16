const express = require('express');
const adminController = require('../controllers/admin.controller');
const { validateLogin } = require('../validations/auth.validator');
const adminRouter = express.Router();

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
adminRouter.post('/login', validateLogin, adminController.login);

module.exports = adminRouter;
