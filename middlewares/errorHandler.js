const createError = require('http-errors');

// Middleware to handle unsupported HTTP methods
const methodNotAllowedHandler = (req, res, next) => {
    res.status(405).json({ message: 'Method Not Allowed' });
};

// Middleware to generate 404 error for undefined routes
const notFoundHandler = (req, res, next) => {
    next(createError.NotFound());
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
    });
};

module.exports = { notFoundHandler, errorHandler, methodNotAllowedHandler };
