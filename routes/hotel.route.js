const router = require('express').Router();
const { lists, searchLocation, searchHotels } = require('../controllers/hotelController');

// hotels APIs
router.get('/hotels/search-location/:search', searchLocation)
router.get('/hotels/listHotels', searchHotels)

module.exports = router;