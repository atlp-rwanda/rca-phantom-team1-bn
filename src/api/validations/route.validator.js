import Joi from "joi";
import { StatusCodes } from "http-status-codes";

export const validateCreateRoute = (req, res, next) => {
  const schema = Joi.object({
    route_name: Joi.string().required(),
    origin_id: Joi.number().required(),
    destination_id: Joi.number().required(),
    bus_stop_id: Joi.number().required(),
    created_at: Joi.date().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }
  next();
};

export const validateUpdateRoute = (req, res, next) => {
  const schema = Joi.object({
    route_name: Joi.string(),
    origin_id: Joi.number(),
    destination_id: Joi.number(),
    bus_stop_id: Joi.number(),
    created_at: Joi.date(),
  }).min(1);
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }
  next();
};
