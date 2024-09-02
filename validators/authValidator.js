const Joi = require('joi');

// Joi schema for user registration
const registerSchema = Joi.object({
    firstName: Joi.string().max(100).regex(/^[a-zA-Z]+$/).required(),
    lastName: Joi.string().max(100).regex(/^[a-zA-Z]+$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(), // Enforcing password complexity
});

// Joi schema for user login
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = {
    registerSchema,
    loginSchema
};
