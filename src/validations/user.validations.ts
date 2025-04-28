import { User } from '../entities/user.entity';
import Joi from 'joi';

// VALIDATE SIGNUP
export const validateSignUp = (user: Partial<User>) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
};

// VALIDATE LOGIN
export const validateLogin = (user: Partial<User>) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
};
