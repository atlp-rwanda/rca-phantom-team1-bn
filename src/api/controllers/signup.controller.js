import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { sendEmail } from './email.controller.js';

const drivers = [];
const operators = [];

const saltRounds = 10;

export const signUpDriver = async (req, res) => {
  const { name, email } = req.body;

  // Check if the email is already registered
  if (drivers.find((driver) => driver.email === email)) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  // Generate a random password
  const password = uuidv4().substr(0, 8);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create the new driver
  const newDriver = { name, email, password: hashedPassword };

  // Add the new driver to the list
  drivers.push(newDriver);

  // Send an email to the provider email with the random password
  await sendEmail(email, 'Your password for the app', `Your password is ${password}`);

  // Return a success message
  res.json({ message: 'Driver registered successfully' });
};

export const signUpOperator = async (req, res) => {
  const { name, email } = req.body;

  // Check if the email is already registered
  if (operators.find((operator) => operator.email === email)) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  // Generate a random password
  const password = uuidv4().substr(0, 8);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create the new operator
  const newOperator = { name, email, password: hashedPassword };

  // Add the new operator to the list
  operators.push(newOperator);

  // Send an email to the provider email with the random password
  await sendEmail(email, 'Your password for the app', `Your password is ${password}`);

  // Return a success message
  res.json({ message: 'Operator registered successfully' });
};
