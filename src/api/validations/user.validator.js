import Joi from "joi";
import { StatusCodes } from "http-status-codes";

export const validateSignupPayload = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    fullname: Joi.string().required(),
    phone_number: Joi.string().required(),
<<<<<<< HEAD
    role: Joi.string().required()
=======
    role: Joi.string().required(),
>>>>>>> 4c9557e296db6a4d79507edde482520cba098023
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }
  next();
<<<<<<< HEAD
};
=======
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
>>>>>>> 4c9557e296db6a4d79507edde482520cba098023
