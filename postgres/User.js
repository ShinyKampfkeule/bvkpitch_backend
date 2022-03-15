const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require("../db");

const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true },
    name: {type: DataTypes.STRING}
}, {freezeTableName: true, updatedAt: false, createdAt: false})

module.exports = Users