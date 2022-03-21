const {DataTypes} = require('sequelize')
const sequelize = require("../db");

const Seat = sequelize.define('sockets', {
    id: {type: DataTypes.STRING, primaryKey: true },
    socket: {type: DataTypes.STRING},
}, {freezeTableName: true, updatedAt: false, createdAt: false})

module.exports = Seat