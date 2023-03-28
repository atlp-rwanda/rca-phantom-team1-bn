import { v4 as uuidv4 } from "uuid";
import { omit } from "lodash";
import { hashPassword } from "../utils/hash-password";
import { signUpUser } from "../services/user.service";
import ERoles from "../enums/ERole";
import { StatusCodes } from "http-status-codes";
import mailer from "../utils/mailer";

export const signUpDriver = async (req, res) => {
  const { email } = req.body;

  // Generate a random password
  const password = uuidv4().substr(0, 8);

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create the new driver
  const newDriver = { email, password: hashedPassword, role: ERoles.DRIVER };

  // Add the new driver to the list
  const driverData = await signUpUser(newDriver);

  // Send an email to the provider email with the random password
  await mailer(email, password);

  // Return a success message
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Driver registered successfully",
    data: omit(driverData.dataValues, "password"),
  });
};

export const signUpOperator = async (req, res) => {
  const { email } = req.body;

  // Generate a random password
  const password = uuidv4().substr(0, 8);
  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create the new driver
  const newOperator = {
    email,
    password: hashedPassword,
    role: ERoles.OPERATOR,
  };

  // Add the new driver to the list
  const operatorData = await signUpUser(newOperator);

  // Send an email to the provider email with the random password
  await mailer(email, password);

  // Return a success message
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Operator registered successfully",
    data: omit(operatorData.dataValues, "password"),
  });
};
