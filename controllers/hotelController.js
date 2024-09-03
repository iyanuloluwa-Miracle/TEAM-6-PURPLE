const { get, getWithParams } = require('../config/axios');
const { searchLocationSchema, searchParamsSchema, bookHotelSchema } = require('../validators/hotelValidator');
const { BookHotel } = require('../models/Hotel');
const env = require('dotenv').config()

const searchLocation = async (req, res) => {

    const { error } = await searchParamsSchema.validate(req.params);
    const { search } = req.params;
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const url = `hotels/searchLocation?query=${search}`;
    const { data } = await get(url)
    const result = data.data

    if (result) {
        return res.status(200).json({
            message: 'hotel location search',
            data: result
        })
    } else {
        return res.status(500).json({
            message: 'unable to get listing',
        })
    }
}

const searchHotels = async (req, res) => {

    const { error } = await searchLocationSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    const { geoId, checkIn, checkOut, pageNumber, sort, ...others } = req.query;
    const url = `hotels/searchHotels?geoId=${geoId}&checkIn=${checkIn}&checkOut=${checkOut}&pageNumber=${pageNumber}&sort=${sort}`;

    const { data } = await get(url);
    const results = data.data.data;

    const filteredData = results.map(result => {
        return {
            id: result.id,
            title: result.title,
            provider: result.provider,
            price: result.priceForDisplay,
            photos: result.cardPhotos,
            rating: result.bubbleRating,
            primaryInfo: result.primaryInfo
        }
    })

    return res.status(200).json({
        message: 'hotel listing',
        data: filteredData
    });
}

const listAttractions = async (req, res) => {
    const baseUrl = process.env.BOOKINGDOTCOM;
    const url = ``;
    const getAttractions = await get(baseUrl, url);
}

const deleteBooking = async (req, res) => {

}

const lists = async (req, res) => {
    return res.status(200).json({
        message: 'hotel listing',
        data: 'hello'
    })
}

const book = async (req, res) => {
    const { error } = await bookHotelSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const b = await BookHotel.create(req.body)
    return res.status(201).json({
        message: 'booking',
        data: b
    });

}

module.exports = {
    lists,
    searchLocation,
    searchHotels,
    book
}