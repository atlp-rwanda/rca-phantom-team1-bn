import Joi from "joi";
import { StatusCodes } from "http-status-codes";

export const validateUpdateUserPayload = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string(),
    phone_number: Joi.string(),
    email: Joi.string().email(),
  }).min(1);
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }
  next();
};
