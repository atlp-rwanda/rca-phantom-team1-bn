import Joi from "joi";
import { StatusCodes } from "http-status-codes";

export const validateCreateLocation = (req, res, next) => {
  const schema = Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    name: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }
  next();
};

export const validateUpdateLocation = (req, res, next) => {
  const schema = Joi.object({
    latitude: Joi.number(),
    longitude: Joi.number(),
    name: Joi.string(),
  }).min(1);
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }
  next();
};