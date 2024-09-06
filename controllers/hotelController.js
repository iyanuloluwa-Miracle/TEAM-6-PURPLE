const { get, getBooking } = require('../config/axios');
const { searchLocationSchema, searchParamsSchema, bookHotelSchema, listAttractionsSchema } = require('../validators/hotelValidator');
const { BookHotel } = require('../models/Hotel');
const env = require('dotenv').config()
const tripAdvisorUrl = process.env.TRIPADVISOR;


const searchLocation = async (req, res) => {

    const { error } = await searchParamsSchema.validate(req.params);
    const { search } = req.params;
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const url = `hotels/searchLocation?query=${search}`;
    const { data } = await get(tripAdvisorUrl, url)
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

    try {
        const { data } = await get(tripAdvisorUrl, url);
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
    } catch (e) {
        console.log(e, 'error from yes:');
        return res.status(400).json({
            message: 'unable to get hotel listing',
        });
    }

}

const searchAttractionLocation = async (req, res) => {
    const { error } = await searchParamsSchema.validate(req.params);
    const { search } = req.params;
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const url = `attraction/searchLocation?query=${search}`;
    const getAttractions = await getBooking(url);
    return res.status(200).json({
        message: 'attraction location search',
        data: getAttractions.data.data
    });
}
const listAttractions = async (req, res) => {
    const { error } = await listAttractionsSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    const { id, startDate, endDate, page } = req.query;
    const url = `attraction/searchAttractions?id=${id}${startDate ? `&startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}${page ? `&page=${page}` : ''}`;

    try {
        const { data } = await getBooking(url);
        const response = data.data.products;
        const filteredData = response.map(result => {
            return {
                id: result.id,
                name: result.name,
                slug: result.slug,
                shortDescription: result.shortDescription,
                primaryPhoto: result.primaryPhoto,
                ratings: result.reviewsStats,
                flags: result.flags
            }
        })
        return res.status(200).json({
            message: 'attraction listing',
            data: filteredData
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'unable to get listing',
        })
    }

}

const userBookings = async (req, res) => {
    const { id } = req.user;
    // const { userId } = req.params;
    const bookings = await BookHotel.findAll({
        where: { userId: id }
    });
    return res.status(200).json({
        message: 'user bookings',
        data: bookings
    })
}

const cancelBooking = async (req, res) => {
    const { id } = req.params;

    const check = await BookHotel.findOne({
        where: { id },
        status: 'open'
    })

    if (check) {
        await BookHotel.update(
            { status: 'closed' },
            { where: { id } }
        )
        return res.status(200).json({
            message: 'booking closed'
        });
    } else {
        return res.status(400).json({
            message: 'booking not found'
        });
    }
}

const deleteBooking = async (req, res) => {
    const { id } = req.params;

    const check = await BookHotel.findOne({
        where: { id },
        status: 'open'
    })

    if (check) {
        await BookHotel.destroy({
            where: { id },
        })
        return res.status(200).json({
            message: 'booking deleted'
        });
    } else {
        return res.status(400).json({
            message: 'booking not found'
        });
    }
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

    const { id } = req.user;
    req.body.userId = id;

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
    book,
    listAttractions,
    searchAttractionLocation,
    deleteBooking,
    userBookings,
    cancelBooking
}