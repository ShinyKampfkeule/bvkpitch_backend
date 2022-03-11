const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require("../db");
const Users = require("./User");

const Macro = sequelize.define('macro', {
    name: {type: DataTypes.STRING},
    score: {type: DataTypes.INTEGER}
})
Macro.belongsTo(Users, {foreignKey: 'user_id', targetKey: 'id'})

module.exports = Macro