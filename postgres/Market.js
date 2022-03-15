const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require("../db");
const Users = require("./User");

const Market = sequelize.define('market_yield', {
    office_city_top_min: {type: DataTypes.FLOAT},
    office_city_top_max: {type: DataTypes.FLOAT},
    office_city_top_avg: {type: DataTypes.FLOAT},
    office_city_min: {type: DataTypes.FLOAT},
    office_city_max: {type: DataTypes.FLOAT},
    office_city_avg: {type: DataTypes.FLOAT},
    office_neighborhood_min: {type: DataTypes.FLOAT},
    office_neighborhood_max: {type: DataTypes.FLOAT},
    office_neighborhood_avg: {type: DataTypes.FLOAT},
    retail_city_top_min: {type: DataTypes.FLOAT},
    retail_city_top_max: {type: DataTypes.FLOAT},
    retail_city_top_avg: {type: DataTypes.FLOAT},
    retail_city_min: {type: DataTypes.FLOAT},
    retail_city_max: {type: DataTypes.FLOAT},
    retail_city_avg: {type: DataTypes.FLOAT},
    retail_neighborhood_min: {type: DataTypes.FLOAT},
    retail_neighborhood_max: {type: DataTypes.FLOAT},
    retail_neighborhood_avg: {type: DataTypes.FLOAT},
    residential_city_top_min: {type: DataTypes.FLOAT},
    residential_city_top_max: {type: DataTypes.FLOAT},
    residential_city_top_avg: {type: DataTypes.FLOAT},
    residential_city_min: {type: DataTypes.FLOAT},
    residential_city_max: {type: DataTypes.FLOAT},
    residential_city_avg: {type: DataTypes.FLOAT},
    residential_neighborhood_min: {type: DataTypes.FLOAT},
    residential_neighborhood_max: {type: DataTypes.FLOAT},
    residential_neighborhood_avg: {type: DataTypes.FLOAT},
},{freezeTableName: true, updatedAt: false, createdAt: false})
Market.belongsTo(Users, {foreignKey: 'user_id', targetKey: 'id'})
Market.removeAttribute('id')

module.exports = Market