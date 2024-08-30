const router = require('express').Router();
const { register, login } = require('../controllers/userController');
const { lists } = require('../controllers/hotelController');


router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.post('/users/register', register);
router.post('/users/login', login);



//

router.get('/hotel-list', lists);

module.exports = router;
