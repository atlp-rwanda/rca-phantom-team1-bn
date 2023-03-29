import express from 'express';
import { signUpDriver, signUpOperator } from '../controllers/signup.controller.js';

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
router.post('/driver', signUpDriver);

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
router.post('/operator', signUpOperator);

export default router;




////////////////////////////////

// import { v4 as uuidv4 } from "uuid";
// import bcrypt from "bcrypt";
// import { sendEmail } from "../utils/rondom-email";
// import { hashPassword } from "../utils/hash-password";
// import { signUpUser } from "../services/user.service";
// import ERoles from "../enums/ERole";
// import { StatusCodes } from "http-status-codes";

// export const signUpDriver = async (req, res) => {
 
//   const { name,email } = req.body;

//   // Generate a random password
//   const password = uuidv4().substr(0, 8);
//   console.log("password: " + password);

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, saltRounds);

//   // Create the new driver
//   const newDriver = { name,email, password: hashedPassword, role: ERoles.DRIVER };

//   // Add the new driver to the list
//   const driverData = await signUpUser(newDriver);

//   // Send an email to the provider email with the random password
//   // await sendEmail(email, 'Your password for the app', `Your password is ${password}`);

//   // Return a success message
//   res.status(StatusCodes.CREATED).json({
//     success: true,
//     message: "Driver registered successfully",
//     data: driverData,
//   });
// };

// export const signUpOperator = async (req, res) => {
//   const { name,email } = req.body;

//   // Generate a random password
//   const password = uuidv4().substr(0, 8);
//   console.log("password: " + password);
//   // Hash the password
  
//   const hashedPassword = await hashPassword(password);

//    // Create the new operator
//    const newOperator = { name,email, password: hashedPassword, role: ERoles.OPERATOR };

//   // Add the new operator to the list
//   const operatorData = await signUpUser(newOperator);

//   // Send an email to the provider email with the random password
//   // await sendEmail(email, 'Your password for the app', `Your password is ${password}`);

//   // Return a success message
//   res.status(StatusCodes.CREATED).json({
//     success: true,
//     message: "Operator registered successfully",
//     data: operatorData,
//   });
// };


