import Joi from "joi";
import { StatusCodes } from "http-status-codes";

export const validateSignupPayload = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    fullname: Joi.string().required(),
    phone_number: Joi.string().required(),
    role: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }
  next();
};

export const validateUpdateUserPayload = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    phone_number: Joi.string().min(10),
    fullname: Joi.string(),
  }).min(1);
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }
  next();
};
