import * as Joi from "joi";
import { StatusCodes } from "http-status-codes";

export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().max(10),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }
  next();
};
