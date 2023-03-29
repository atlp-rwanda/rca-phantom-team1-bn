import express from 'express';

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
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [driver, operator]
 *             required:
 *               - email
 *               - password
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
router.post('/signup', (req, res) => {
  const { email, password, name, role } = req.body;
  
  // Perform validation and save to database, identifying the user's role
  
  res.status(200).json({ message: `Successfully created ${role} account` });
});

export default router;