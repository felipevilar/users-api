import * as Joi from 'joi';

export default {
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),
  MONGO_URL: Joi.string().required(),
  MONGO_DB: Joi.string().required().default('techleads'),
  JWT_EXPIRATION: Joi.number().default('1d'),
}