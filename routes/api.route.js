const router = require('express').Router();
const { lists, searchLocation } = require('../controllers/hotelController');
const userController = require("../controllers/userController");
const { methodNotAllowedHandler } = require("../middlewares/errorHandler");


router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working " });
});

// Handle unsupported methods
router.use(methodNotAllowedHandler);


router.post("/users/register", userController.register);
router.post("/users/login", userController.login);
router.post("/users/logout", userController.logout); 


// hotels APIs
router
  .get('/search/:search', searchLocation)
  .get('/hotel-list', lists);

module.exports = router;