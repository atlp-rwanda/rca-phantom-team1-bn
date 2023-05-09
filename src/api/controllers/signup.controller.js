/* eslint-disable prettier/prettier */
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { getRoleByTitle } from "../services/roles.service";
import { hashPassword } from "../utils/hash-password";
import { sendEmail } from "../utils/email";
import { signUpUser } from "../services/user.service";
import { v4 as uuidv4 } from "uuid";
import { omit } from "lodash";

export const signUpUserWithRole = async (req, res) => {
  try {
    const { fullname, email, phone_number, role } = req.body;

    // Find role by title
    const foundRole = await getRoleByTitle(role);

    if (!foundRole) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `Role '${role}' not found` });
    }

    // Generate a random password
    const password = uuidv4().substr(0, 8);
    console.log("password: " + password);

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the new user
    const newUser = {
      fullname,
      phone_number,
      email,
      password: hashedPassword,
      roleId: foundRole.id,
    };

    // Save the new user
    const userData = await signUpUser(newUser);

    // Send an email to the user with the random password
    await sendEmail('Welcome to Phantom App', email, `<h1>Welcome to PhantomApp.</h1> Your password for the app is <h3>${password}</h3>`);

    // Return a success message
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User registered successfully",
      data: omit(userData.dataValues, "password"),
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
