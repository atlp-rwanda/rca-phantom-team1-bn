import Joi from "joi";
import { StatusCodes } from "http-status-codes";

export const validateCreateBus = (req, res, next) => {
  const schema = Joi.object({
    plate_number: Joi.string().required(),
    driver_id: Joi.number().required(),
    agency_id: Joi.number().required(),
    router_id: Joi.number().required(),
    seats: Joi.number().required(),
    av_seats: Joi.number().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }
  next();
};

export const validateUpdateRole = (req, res, next) => {
  const schema = Joi.object({
    plate_number: Joi.string().required(),
    driver_id: Joi.number().required(),
    agency_id: Joi.number().required(),
    router_id: Joi.number().required(),
    seats: Joi.number().required(),
    av_seats: Joi.number().required(),
  }).min(1);
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }
  next();
};