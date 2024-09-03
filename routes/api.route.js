const router = require('express').Router();
const { lists, searchLocation } = require('../controllers/hotelController');
const userController = require("../controllers/userController");
const { methodNotAllowedHandler } = require("../middlewares/errorHandler");
const { verifyToken } = require("../middlewares/auth");

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working " });
});




router.post("/users/register", userController.register);
router.post("/users/login", userController.login);
router.post("/users/logout",  verifyToken, userController.logout); 

// Handle unsupported methods for registration and login routes
router.route("/users/register").all(methodNotAllowedHandler);
router.route("/users/login").all(methodNotAllowedHandler);
router.route("/users/logout").all(methodNotAllowedHandler);


// hotels APIs
router
  .get('/search/:search', searchLocation)
  .get('/hotel-list', lists);

module.exports = router;