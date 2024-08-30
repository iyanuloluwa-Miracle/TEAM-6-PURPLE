const router = require('express').Router();
const { register, login } = require('../controllers/userController');


router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.post('/users/register', register);
router.post('/users/login', login);


module.exports = router;
