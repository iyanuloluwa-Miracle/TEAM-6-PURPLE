// controllers/itineraryController.js
const Itinerary = require('../models/Itinerary');
const User = require('../models/User');
const itinerarySchema = require('../validators/itineraryValidator');
// Create a new itinerary
const createItinerary = async (req, res) => {
    const { title, destination, startDate, endDate } = req.body;
    const userId = req.user.id;
     // Validate request data
    const { error } = itinerarySchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
    }

    try {
        const itinerary = await Itinerary.create({
            title,
            destination,
            startDate,
            endDate,
            userId,
        });
        res.status(201).json(itinerary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all itineraries for a user
const getUserItineraries = async (req, res) => {
    const userId = req.user.id; // Get user ID from request

    try {
        const itineraries = await Itinerary.findAll({
            where: { userId },
        });
        res.status(200).json(itineraries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific itinerary
const getItinerary = async (req, res) => {
    const { id } = req.params;

    try {
        const itinerary = await Itinerary.findOne({
            where: { id },
        });
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        res.status(200).json(itinerary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an itinerary
const updateItinerary = async (req, res) => {
    const { id } = req.params;
    const { title, destination, startDate, endDate } = req.body;

      // Validate request data
    const { error } = itinerarySchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
    }

    try {
        const [updated] = await Itinerary.update(
            { title, destination, startDate, endDate },
            { where: { id } }
        );
        if (!updated) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        res.status(200).json({ message: 'Itinerary updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an itinerary
const deleteItinerary = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Itinerary.destroy({
            where: { id },
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createItinerary,
    getUserItineraries,
    getItinerary,
    updateItinerary,
    deleteItinerary,
};
