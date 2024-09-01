const router = require('express').Router();
const hotelRoutes = require('./hotel.route');
const apiRoutes = require('./api.route');
const itineraryRoutes = require('./itinerary.route');


router.use('', apiRoutes);
router.use('/itinerary', itineraryRoutes);
router.use('/hotel', hotelRoutes);

module.exports = {
    hotelRoutes,
    apiRoutes,
    itineraryRoutes
}