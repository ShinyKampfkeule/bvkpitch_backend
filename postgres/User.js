const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require("../db");

const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true },
    name: {type: DataTypes.STRING}
})

module.exports = Users