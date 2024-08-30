// models/Itinerary.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Import User model

class Itinerary extends Model {}

Itinerary.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    // Other itinerary fields can be added here
}, {
    sequelize,
    modelName: 'Itinerary',
    timestamps: true,
});

// Establish the relationship
Itinerary.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Itinerary, { foreignKey: 'userId' });

module.exports = Itinerary;
