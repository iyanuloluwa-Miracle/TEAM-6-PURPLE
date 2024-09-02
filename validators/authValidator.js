const Joi = require('joi');

// Helper function to remove quotes from Joi error messages
const removeQuotesFromMessage = (errors) => {
    return errors.map(err => {
        err.message = err.message.replace(/\"/g, '');
        return err;
    });
};

// Customized Joi schema for user registration
const registerSchema = Joi.object({
    firstName: Joi.string()
        .max(100)
        .regex(/^[a-zA-Z]+$/)
        .required()
        .error(removeQuotesFromMessage),
    lastName: Joi.string()
        .max(100)
        .regex(/^[a-zA-Z]+$/)
        .required()
        .error(removeQuotesFromMessage),
    email: Joi.string()
        .email()
        .required()
        .error(removeQuotesFromMessage),
    password: Joi.string()
        .min(8)
        .required()
        .error(removeQuotesFromMessage),
});

// Customized Joi schema for user login
const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .error(removeQuotesFromMessage),
    password: Joi.string()
        .required()
        .error(removeQuotesFromMessage),
});

module.exports = {
    registerSchema,
    loginSchema
};
