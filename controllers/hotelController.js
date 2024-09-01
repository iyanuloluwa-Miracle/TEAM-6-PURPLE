const { get, getWithParams } = require('../config/axios');
const { searchLocationSchema } = require('../validators/hotelValidator');
const { BookHotel } = require('../models/Hotel');
const { message } = require('../validators/itineraryValidator');

const searchLocation = async (req, res) => {
    const { search } = req.params;
    const url = `hotels/searchLocation?query=${search}`;
    const s = await get(url)
    if (s) {
        return res.status(200).json({
            message: 'hotel location search',
            data: s
        })
    } else {
        return res.status(500).json({
            message: 'unable to get listing',
        })
    }
}

const searchHotels = async (req, res) => {
    // const { error } = await searchLocationSchema.validate(req.params);
    /* if (error) {
        return res.status(400).json({ message: error.details[0].message })
    } */
    const { geoId, checkIn, checkOut, pageNumber, sort, ...others } = req.query;
    const url = `hotels/searchHotels?geoId=${geoId}&checkIn=${checkIn}&checkOut=${checkOut}&pageNumber=${pageNumber}&sort=${sort}`;

    const { data } = await get(url);

    const filteredData = data.map(data => {
        return {
            id: data.id,
            title: data.title,
            provider: data.provider,
            price: data.priceForDisplay,
            photos: data.cardPhotos,
            rating: data.bubbleRating,
            primaryInfo: data.primaryInfo
        }
    })

    return res.status(200).json({
        message: 'hotel listing',
        data: filteredData
    });
    /* const insertSearch = await Hotel.create({
        geoId: goeId,
        checkIn: checkIn,
        checkOut: checkOut,
        ...others
    }) */


}

const lists = async (req, res) => {
    return res.status(200).json({
        message: 'hotel listing',
        data: 'hello'
    })
    /* const getList = await get();

    if (getList) {
        return res.status(200).json({
            message: 'hotel listing',
            data: getList
        })
    } else {
        return res.status(500).json({
            message: 'unable to get listing',
        })
    } */
}

module.exports = {
    lists,
    searchLocation,
    searchHotels
}