const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require("../db");
const Users = require("./User");

const Macro = sequelize.define('macro', {
    name: {type: DataTypes.STRING},
    score: {type: DataTypes.INTEGER}
},{freezeTableName: true, updatedAt: false, createdAt: false})
Macro.belongsTo(Users, {foreignKey: 'user_id', targetKey: 'id'})
Macro.removeAttribute('id')
module.exports = Macro