import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/rondom-email";
import { hashPassword } from "../utils/hash-password";
import { signUpUser } from "../services/user.service";
import ERoles from "../enums/ERole";
import { StatusCodes } from "http-status-codes";

export const signUpDriver = async (req, res) => {
  const { email } = req.body;

  // Generate a random password
  const password = uuidv4().substr(0, 8);
  console.log("password: " + password);

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create the new driver
  const newDriver = { email, password: hashedPassword, role: ERoles.DRIVER };

  // Add the new driver to the list
  const driverData = await signUpUser(newDriver);

  // Send an email to the provider email with the random password
  // await sendEmail(email, 'Your password for the app', `Your password is ${password}`);

  // Return a success message
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Driver registered successfully",
    data: driverData,
  });
};

export const signUpOperator = async (req, res) => {
  const { email } = req.body;

  // Generate a random password
  const password = uuidv4().substr(0, 8);
  console.log("password: " + password);
  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create the new driver
  const newDriver = { email, password: hashedPassword, role: ERoles.OPERATOR };

  // Add the new driver to the list
  const driverData = await signUpUser(newDriver);

  // Send an email to the provider email with the random password
  // await sendEmail(email, 'Your password for the app', `Your password is ${password}`);

  // Return a success message
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Operator registered successfully",
    data: driverData,
  });
};
