const router = require("express").Router();
const itineraryController = require("../controllers/itineraryController");
const { verifyToken } = require("../middlewares/auth");
const { methodNotAllowedHandler } = require("../middlewares/errorHandler");

// Apply authentication middleware to all routes
router.use(verifyToken);

// Create a new itinerary
router.post("/create", itineraryController.createItinerary);
router.route("/create").all(methodNotAllowedHandler);  // Handle unsupported methods on root route

// Get user itineraries
router.get("/", itineraryController.getUserItineraries);
router.route("/").all(methodNotAllowedHandler);  // Handle unsupported methods on root route

// Get a specific itinerary by ID
router.get("/:id", itineraryController.getItinerary);
router.route("/:id").all(methodNotAllowedHandler);  // Handle unsupported methods for single itinerary route

// Update a specific itinerary by ID
router.put("/:id", itineraryController.updateItinerary);
router.route("/:id").all(methodNotAllowedHandler);  // Handle unsupported methods for single itinerary route

// Delete a specific itinerary by ID
router.delete("/:id", itineraryController.deleteItinerary);
router.route("/:id").all(methodNotAllowedHandler);  // Handle unsupported methods for single itinerary route

module.exports = router;
