/* eslint-disable prettier/prettier */
import { Router } from "express";
import {
  getRoleById,
  getRoles,
  createRole,
  updateRole,
  deleteRoleById,
} from "../controllers/roles.controller";
import {
  roleExistsById,
  roleExistsByTitle,
} from "../middlewares/roles.middleware";
import {
  validateCreateRole,
  validateUpdateRole,
} from "../validations/role.validator";

const roleRouter = Router();

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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Optional role title to filter results by
 *     responses:
 *       200:
 *         description: Returns a list of all roles
 *       500:
 *         description: Internal server error
 */
roleRouter.get("/", getRoles);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the role to create
 *               description:
 *                 type: string
 *                 description: Description of the role
 *               privileges:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Privileges of the role
 *     responses:
 *       201:
 *         description: Returns the created role
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
roleRouter.post("/", validateCreateRole, roleExistsByTitle, createRole);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Get a role by Role Id
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the role to get
 *     responses:
 *       200:
 *         description: Returns a role object
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
roleRouter.get("/:id", roleExistsById, getRoleById);

/**
 * @swagger
 * /roles/{id}:

 *   patch:
 *     summary: Update a role by Role id
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the role to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: New name of the role
 *               description:
 *                 type: string
 *                 description: New description of the role
 *               privileges:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: New privileges of the role
 *     responses:
 *       200:
 *         description: Returns the updated role
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
roleRouter.patch("/:id", validateUpdateRole, roleExistsById, updateRole);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role by Role Id
 *     tags: [Roles]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the role to delete
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
roleRouter.delete("/:id", roleExistsById, deleteRoleById);

export default roleRouter;
