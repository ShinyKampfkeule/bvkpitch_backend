const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require("../db");
const Seat = require("./Seat");

const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true },
    name: {type: DataTypes.STRING},
    socket_analysis: {type: DataTypes.STRING},
    socket_search : {type: DataTypes.STRING},
    username: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    seatplace: {type: DataTypes.STRING},
    last_seatplace: {type: DataTypes.STRING}
}, {freezeTableName: true, updatedAt: false, createdAt: false})
Users.belongsTo(Seat, {foreignKey: 'seatplace', targetKey: 'id'})

module.exports = Users