const router = require('express').Router();
const { register, login } = require('../controllers/userController');


router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.post('/register', register);
router.post('/login', login);


module.exports = router;
