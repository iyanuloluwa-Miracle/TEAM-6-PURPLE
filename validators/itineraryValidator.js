// validators/itineraryValidator.js
const Joi = require('joi');

const itinerarySchema = Joi.object({
    title: Joi.string().min(3).max(255).required().messages({
        'string.empty': 'Title is required',
        'string.min': 'Title must be at least 3 characters long',
        'string.max': 'Title must be at most 255 characters long',
    }),
    destination: Joi.string().min(3).max(255).required().messages({
        'string.empty': 'Destination is required',
        'string.min': 'Destination must be at least 3 characters long',
        'string.max': 'Destination must be at most 255 characters long',
    }),
    startDate: Joi.date().iso().required().messages({
        'date.base': 'Start date must be a valid date',
        'date.iso': 'Start date must be in ISO format',
        'any.required': 'Start date is required',
    }),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required().messages({
        'date.base': 'End date must be a valid date',
        'date.iso': 'End date must be in ISO format',
        'date.greater': 'End date must be after the start date',
        'any.required': 'End date is required',
    }),
});

module.exports = itinerarySchema;
