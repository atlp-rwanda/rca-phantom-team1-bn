const express = require('express')
const roleController = require('../controllers/roles.controller')
const roleRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: API for managing roles
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Returns a list of all roles
 *       500:
 *         description: Internal server error
 */
roleRouter.get('/', roleController.getRoles);

/**
 * @swagger
 * /roles/{role}:
 *   get:
 *     summary: Get a role by Role name
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: role
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the role to get
 *     responses:
 *       200:
 *         description: Returns a role object
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
roleRouter.get('/:role', roleController.getRoleById);

module.exports = roleRouter
