import Joi from "joi";
import HttpStatusCodes from "../enums/EHttpStatusCodes";

export const validateCreateRole = (req, res, next) => {
  const schema = Joi.object({
    role: Joi.string().required(),
    description: Joi.string().required(),
    privileges: Joi.array().items(Joi.string()).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }
  next();
};

export const validateUpdateRole = (req, res, next) => {
  const schema = Joi.object({
    role: Joi.string(),
    description: Joi.string(),
    privileges: Joi.array().items(Joi.string()),
  }).min(1);
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }
  next();
};
