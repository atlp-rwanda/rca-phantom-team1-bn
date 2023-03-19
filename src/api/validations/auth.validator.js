import * as Joi from "joi";
import HttpStatusCodes from "../enums/EHttpStatusCodes";

export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }
  next();
};
