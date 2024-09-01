const router = require('express').Router();
const { lists, searchLocation, searchHotels, book } = require('../controllers/hotelController');

// hotels APIs
router.get('/hotels/search-location/:search', searchLocation)
router.get('/hotels/listHotels', searchHotels)
router.post('/hotels/book', book)

module.exports = router;