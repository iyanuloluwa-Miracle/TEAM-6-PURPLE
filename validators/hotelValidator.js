const Joi = require('joi');

const searchLocationSchema = Joi.object({
    geoId: Joi.number().required().messages({
        'any.required': 'geoId is required',
    }),
    checkIn: Joi.string().required().messages({
        'any.required': 'checkIn is required',
    }),
    checkOut: Joi.string().required().messages({
        'any.required': 'checkOut is required',
    }),
    adults: Joi.number().optional(),
    rooms: Joi.number().optional(),
    pageNumber: Joi.number().required().default(1).messages({
        'any.required': 'pageNumber is required',
    }),
    sort: Joi.object({
        priceMin: Joi.number().optional(),
        priceMax: Joi.number().optional(),
        rating: Joi.number().optional(),
    }).optional(),
});

const bookHotelSchema = Joi.object({
    geoId: Joi.number().required().messages({
        'any.required': 'geoId is required',
    }),
    locationId: Joi.number().required().messages({
        'any.required': 'locationId is required',
    }),
    checkIn: Joi.date().required().messages({
        'any.required': 'checkIn is required',
    }),
    checkOut: Joi.date().required().messages({
        'any.required': 'checkOut is required',
        'any.required': 'checkOut is required',
    }),
    adults: Joi.number().optional(),
    rooms: Joi.number().optional(),
    price: Joi.string().required().messages({
        'any.required': 'price is required',
    }),
    photos: Joi.array().required().messages({
        'any.required': 'photos is required',
    })
});
const searchParamsSchema = Joi.object({
    search: Joi.string().required().messages({
        'any.required': 'search is required',
    })
});

const listAttractionsSchema = Joi.object({
    id: Joi.number().required().messages({
        'any.required': 'id is required',
    }),
    startDate: Joi.date().optional().messages({
        'any.required': 'startDate is required',
    }),
    endDate: Joi.date().optional().messages({
        'any.required': 'endDate is required',
    }),
    page: Joi.number().optional().messages({
        'any.required': 'page is required',
    }),
});
module.exports = {
    searchLocationSchema,
    searchParamsSchema,
    bookHotelSchema
}