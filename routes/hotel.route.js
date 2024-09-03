const router = require('express').Router();
const { lists, searchLocation, searchHotels, book, listAttractions, searchAttractionLocation } = require('../controllers/hotelController');
const auth = require('../middlewares/auth');

// hotels APIs
router.get('/hotels/search-location/:search', searchLocation);
router.get('/hotels/listHotels', searchHotels);
router.post('/hotels/book', [auth.verifyToken], book);

router.get('/attractions/:search', searchAttractionLocation);
router.get('/attractions/list', listAttractions)
module.exports = router;