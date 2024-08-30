// validation.js
const Joi = require("joi");

// Joi schema for user registration
const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Joi schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});




module.exports = {
  registerSchema,
  loginSchema


}