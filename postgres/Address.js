const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require("../db");
const Users = require("./User");

const Address = sequelize.define('address', {
    postal_code: {type: DataTypes.STRING},
    locality: {type: DataTypes.STRING},
    route: {type: DataTypes.STRING},
    street_number: {type: DataTypes.STRING},
    loc_lat: {type: DataTypes.INTEGER},
    loc_lng: {type: DataTypes.INTEGER},
},{freezeTableName: true, updatedAt: false, createdAt: false})
Address.belongsTo(Users, {foreignKey: 'user_id', targetKey: 'id'})
Address.removeAttribute('id')

module.exports = Address