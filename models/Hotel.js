const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const BookHotel = sequelize.define('BookHotels', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    geoId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    locationId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    checkIn: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    checkOut: {
        type: DataTypes.DATE,
        allowNull: false
    },
    adults: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photos: {
        type: DataTypes.JSON
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'open'
    }
});

module.exports = {
    BookHotel,
}