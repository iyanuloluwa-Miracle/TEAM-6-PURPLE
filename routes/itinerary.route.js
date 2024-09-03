// routes/api.route.js
const router = require("express").Router();
const itineraryController = require("../controllers/itineraryController");
const { verifyToken } = require("../middlewares/auth");


 router.use(verifyToken);
// Protect these routes with the verifyToken middleware
router.post("/itineraries", itineraryController.createItinerary);
router.get("/itineraries", itineraryController.getUserItineraries);
router.get("/:id", itineraryController.getItinerary);
router.put("/:id", itineraryController.updateItinerary);
router.delete("/:id", itineraryController.deleteItinerary);

module.exports = router;
