const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Hotel = sequelize.define('Hotel', {
    geoId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 1
    },
    rooms: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 1
    }
});

const HotelSearchHistory = sequalize.define('HotelSearchHistory', {
    // goeId:
});

module.exports = {
    Hotel,
    HotelSearchHistory
}