const router = require('express').Router();
const { lists, searchLocation, searchHotels, book, listAttractions, searchAttractionLocation, deleteBooking, userBookings, cancelBooking } = require('../controllers/hotelController');
const auth = require('../middlewares/auth');
const { methodNotAllowedHandler } = require("../middlewares/errorHandler");

// hotels APIs
router.route('/hotels/search-location/:search')
    .get(searchLocation)
    .all(methodNotAllowedHandler);
router.route('/hotels/listHotels')
    .get(searchHotels)
    .all(methodNotAllowedHandler);
router.route('/hotels/book')
    .post([auth.verifyToken], book)
    .all(methodNotAllowedHandler);
router.route('/hotels/user-bookings')
    .get([auth.verifyToken], userBookings)
    .all(methodNotAllowedHandler);
router.route('/hotels/cancel/:id')
    .patch(cancelBooking)
    .all(methodNotAllowedHandler);
router.route('/hotels/:id')
    .delete(deleteBooking)
    .all(methodNotAllowedHandler);

// attractions APIs
router.route('/attractions/:search')
    .get(searchAttractionLocation)
    .all(methodNotAllowedHandler);
router.route('/attractions/list')
    .get(listAttractions)
    .all(methodNotAllowedHandler);


module.exports = router;