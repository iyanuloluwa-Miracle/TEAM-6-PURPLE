// routes/api.route.js
const router = require("express").Router();
const itineraryController = require("../controllers/itineraryController");
const { verifyToken } = require("../middlewares/auth");
const auth = require("../middlewares/auth");


//  router.use(verifyToken);
// Protect these routes with the verifyToken middleware
router.post("/itineraries", [auth.verifyToken], itineraryController.createItinerary);
router.get("/itineraries", [auth.verifyToken], itineraryController.getUserItineraries);
router.get("/:id", [auth.verifyToken], itineraryController.getItinerary);
router.put("/:id", [auth.verifyToken], itineraryController.updateItinerary);
router.delete("/:id", [auth.verifyToken], itineraryController.deleteItinerary);

module.exports = router;
