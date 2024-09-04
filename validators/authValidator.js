const Joi = require('joi');

// Customized Joi schema for user registration
const registerSchema = Joi.object({
    firstName: Joi.string()
        .max(100)
        .regex(/^[a-zA-Z]+$/)
        .required()
        .messages({
            'string.base': 'First name should be a type of text',
            'string.empty': 'First name is required',
            'string.max': 'First name should have a maximum length of 100 characters',
            'any.required': 'First name is required',
            'string.pattern.base': 'First name should only contain alphabetic characters'
        }),
    lastName: Joi.string()
        .max(100)
        .regex(/^[a-zA-Z]+$/)
        .required()
        .messages({
            'string.base': 'Last name should be a type of text',
            'string.empty': 'Last name is required',
            'string.max': 'Last name should have a maximum length of 100 characters',
            'any.required': 'Last name is required',
            'string.pattern.base': 'Last name should only contain alphabetic characters'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'Email should be a type of text',
            'string.empty': 'Email is required',
            'string.email': 'Please enter a valid email address',
            'any.required': 'Email is required'
        }),
    password: Joi.string()
        .min(8)
        .regex(/^(?=.*[A-Z])(?=.*\d)/) // Requires at least one uppercase letter and one number
        .required()
        .messages({
            'string.base': 'Password should be a type of text',
            'string.empty': 'Password is required',
            'string.min': 'Password length must be at least 8 characters long',
            'string.pattern.base': 'Password must contain at least one uppercase letter and one number',
            'any.required': 'Password is required'
        }),
});

// Customized Joi schema for user login
const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'Email should be a type of text',
            'string.empty': 'Email is required',
            'string.email': 'Please enter a valid email address',
            'any.required': 'Email is required'
        }),
    password: Joi.string()
        .regex(/^(?=.*[A-Z])(?=.*\d)/) // Requires at least one uppercase letter and one number
        .required()
        .messages({
            'string.base': 'Password should be a type of text',
            'string.empty': 'Password is required',
            'string.pattern.base': 'Password must contain at least one uppercase letter and one number',
            'any.required': 'Password is required'
        }),
});

module.exports = {
    registerSchema,
    loginSchema
};
