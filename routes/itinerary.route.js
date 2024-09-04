// routes/api.route.js
const router = require("express").Router();
const itineraryController = require("../controllers/itineraryController");
const { verifyToken } = require("../middlewares/auth");
const { methodNotAllowedHandler } = require("../middlewares/errorHandler");

 router.use(verifyToken);
// Define the routes and allowed methods
router.route("/")
    .post(itineraryController.createItinerary)
    .all(methodNotAllowedHandler);

router.route("/")
    .get(itineraryController.getUserItineraries)
    .all(methodNotAllowedHandler);

router.route("/:id")
    .get(itineraryController.getItinerary)
    .put(itineraryController.updateItinerary)
    .delete(itineraryController.deleteItinerary)
    .all(methodNotAllowedHandler);

module.exports = router;
