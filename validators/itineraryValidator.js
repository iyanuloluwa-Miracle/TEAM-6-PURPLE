const Joi = require('joi');

const itinerarySchema = Joi.object({
    title: Joi.string().min(3).max(255).required().messages({
        'string.empty': 'title is required',
        'string.min': 'title must be at least 3 characters long',
        'string.max': 'title must be at most 255 characters long',
    }),
    destination: Joi.string().min(3).max(255).required().messages({
        'string.empty': 'destination is required',
        'string.min': 'destination must be at least 3 characters long',
        'string.max': 'destination must be at most 255 characters long',
    }),
    startDate: Joi.date().iso().required().messages({
        'date.base': 'startDate must be a valid date',
        'date.iso': 'startDate must be in ISO format',
        'any.required': 'startDate is required',
    }),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required().messages({
        'date.base': 'endDate must be a valid date',
        'date.iso': 'endDate must be in ISO format',
        'date.greater': 'endDate must be after the start date',
        'any.required': 'endDate is required',
    }),
});

module.exports = itinerarySchema;