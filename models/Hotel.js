const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const BookHotel = sequelize.define('Hotels', {
    geoId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
        type: DataTypes.INTEGER,
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