const Joi = require('joi');

const searchLocationSchema = Joi.object({
    geoId: Joi.number().required(),
    checkIn: Joi.string().required(),
    checkOut: Joi.string().required(),
    adults: Joi.number().optional(),
    rooms: Joi.number().optional(),
    pageNumber: Joi.number().required().default(1),
    sort: Joi.object({
        priceMin: Joi.number().optional(),
        priceMax: Joi.number().optional(),
        rating: Joi.number().optional(),
    }).optional(),
});

const searchParamsSchema = Joi.object({
    search: Joi.string().required()
});

module.exports = {
    searchLocationSchema,
    searchParamsSchema
}