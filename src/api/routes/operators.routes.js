const express = require('express');
const driversRouter = express.Router();
const HttpStatusCodes = require('../enums/EHttpStatusCodes');
const adminCheckMiddleware = require('../middlewares/adminCheck');

/**
 * @swagger
 * tags:
 *   name: Drivers
 *   description: API for creating drivers
 */
/**
 * @swagger
 * /drivers:
 *   post:
 *     summary: Create a driver user
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User object to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a success message
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
driversRouter.post('/', adminCheckMiddleware, (req, res) => {
  // Here you can create a new driver user
  res.status(HttpStatusCodes.CREATED).send({success: true, message: 'Driver user created successfully!'});
});

module.exports = driversRouter;
