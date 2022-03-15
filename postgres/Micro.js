const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require("../db");
const Users = require("./User");

const Micro = sequelize.define('micro', {
    name: {type: DataTypes.STRING},
    score: {type: DataTypes.INTEGER}
},{freezeTableName: true, updatedAt: false, createdAt: false})
Micro.removeAttribute('id')
Micro.belongsTo(Users, {foreignKey: 'user_id', targetKey: 'id'})
module.exports = Micro