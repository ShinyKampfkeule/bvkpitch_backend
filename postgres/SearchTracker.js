const {DataTypes} = require('sequelize')
const sequelize = require("../db");
const Users = require("./User");

const SearchTracker = sequelize.define('search_tracker',{
    postal_code: {type: DataTypes.STRING},
    locality: {type: DataTypes.STRING},
    route: {type: DataTypes.STRING},
    street_number: {type: DataTypes.STRING},
    loc_lat: {type: DataTypes.FLOAT},
    loc_lng: {type: DataTypes.FLOAT},
    date: {type: DataTypes.STRING}
},{freezeTableName: true, updatedAt: false, createdAt: false})
SearchTracker.belongsTo(Users, {foreignKey: 'user_id', targetKey: 'id'})

module.exports = SearchTracker