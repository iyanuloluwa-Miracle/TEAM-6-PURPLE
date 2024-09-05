const Itinerary = require('../models/Itinerary');
const itinerarySchema = require('../validators/itineraryValidator');
const createError = require('http-errors');

// Create a new itinerary
const createItinerary = async (req, res, next) => {
    // Validate request data
    const { error } = itinerarySchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details[0].message.replace(/"/g, '');
        return res.status(400).json({ message: errorMessage });
    }


    const { title, destination, startDate, endDate } = req.body;
    const userId = req.user.id; // Access userId from req.user

    try {
        const itinerary = await Itinerary.create({
            title,
            destination,
            startDate,
            endDate,
            userId,
        });
        res.status(201).json({ message: 'Itinerary created', itinerary });
    } catch (err) {
        console.error(err);
        next(createError(500, 'Error creating itinerary'));
    }
};

// Get all itineraries for a user
const getUserItineraries = async (req, res, next) => {
    const userId = req.user.id; // Access userId from req.user

    try {
        const itineraries = await Itinerary.findAll({
            where: { userId },
        });
        res.status(200).json(itineraries);
    } catch (err) {
        console.error(err);
        next(createError(500, 'Error fetching itineraries'));
    }
};

// Get a specific itinerary
const getItinerary = async (req, res, next) => {
    const { id } = req.params;

    try {
        const itinerary = await Itinerary.findOne({
            where: { id },
        });
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        res.status(200).json(itinerary);
    } catch (err) {
        console.error(err);
        next(createError(500, 'Error fetching itinerary'));
    }
};

// Update an itinerary
const updateItinerary = async (req, res, next) => {
    const { id } = req.params;
    const { title, destination, startDate, endDate } = req.body;

    const { error } = itinerarySchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details[0].message.replace(/"/g, '');
        return res.status(400).json({ message: errorMessage });
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
    } catch (err) {
        res.status(500).json({ message: 'Error updating itinerary' });
        /* console.error(err);
        next(createError(500, 'Error updating itinerary')); */
    }
};

// Delete an itinerary
const deleteItinerary = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deleted = await Itinerary.destroy({
            where: { id },
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        res.status(200).json({ message: 'Itinerary deleted successfully' });
    } catch (err) {
        console.error(err);
        next(createError(500, 'Error deleting itinerary'));
    }
};

module.exports = {
    createItinerary,
    getUserItineraries,
    getItinerary,
    updateItinerary,
    deleteItinerary,
};
