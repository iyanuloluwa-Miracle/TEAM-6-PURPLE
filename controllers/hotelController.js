const { get } = require('../config/axios');
const { Hotel } = require('../models/Hotel');

const searchLocation = async(req, res) => {
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

const searchHotel = async(req, res) => {
    const url = `hotels/searchHotels`;
    const { goeId, checkIn, checkOut, pageNumber, sort, ...others } = req.body;
    const { adults, rooms, ...rest} = sort;
    
    if (Object.keys(rest).length !== 0) {
        return true;
    }

    const insertSearch = await Hotel.create({
        geoId: goeId,
        checkIn: checkIn,
        checkOut: checkOut,
        ...others
    })
    

}

const lists = async (req, res) => {
    
    const getList = await get();

    if (getList) {
        return res.status(200).json({
            message: 'hotel listing',
            data: getList
        })
    } else {
        return res.status(500).json({
            message: 'unable to get listing',
        })
    }
}

module.exports = {
    lists,
    searchLocation
}