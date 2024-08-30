// routes/api.route.js
const router = require("express").Router();
const itineraryController = require("../controllers/itineraryController");
const {verifyToken} = require("../utils/auth"); // Correctly import verifyToken


// Apply verifyToken middleware to all routes below this line
router.use(verifyToken);
// Protect these routes with the verifyToken middleware
router.post("/", itineraryController.createItinerary); // Create a new itinerary
router.get("/",  itineraryController.getUserItineraries); // Get itineraries for the logged-in user
router.get("/:id", itineraryController.getItinerary); // Get a specific itinerary
router.put("/:id", itineraryController.updateItinerary); // Update an itinerary
router.delete("/:id", itineraryController.deleteItinerary); // Delete an itinerary

module.exports = router;
