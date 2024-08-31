const router = require('express').Router();
const { register, login } = require('../controllers/userController');
const { lists, searchLocation } = require('../controllers/hotelController');


router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.post('/users/register', register);
router.post('/users/login', login);


// hotels APIs
router
  .get('/search/:search', searchLocation)
  .get('/hotel-list', lists);

module.exports = router;
