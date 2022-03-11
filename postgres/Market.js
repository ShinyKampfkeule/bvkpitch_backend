const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require("../db");
const Users = require("./User");

const Market = sequelize.define('market_yield', {
    office_city_top_min: {type: DataTypes.INTEGER},
    office_city_top_max: {type: DataTypes.INTEGER},
    office_city_top_avg: {type: DataTypes.INTEGER},
    office_city_min: {type: DataTypes.INTEGER},
    office_city_max: {type: DataTypes.INTEGER},
    office_city_avg: {type: DataTypes.INTEGER},
    office_neighborhood_min: {type: DataTypes.INTEGER},
    office_neighborhood_max: {type: DataTypes.INTEGER},
    office_neighborhood_avg: {type: DataTypes.INTEGER},
    retail_city_top_min: {type: DataTypes.INTEGER},
    retail_city_top_max: {type: DataTypes.INTEGER},
    retail_city_top_avg: {type: DataTypes.INTEGER},
    retail_city_min: {type: DataTypes.INTEGER},
    retail_city_max: {type: DataTypes.INTEGER},
    retail_city_avg: {type: DataTypes.INTEGER},
    retail_neighborhood_min: {type: DataTypes.INTEGER},
    retail_neighborhood_max: {type: DataTypes.INTEGER},
    retail_neighborhood_avg: {type: DataTypes.INTEGER},
    residential_city_top_min: {type: DataTypes.INTEGER},
    residential_city_top_max: {type: DataTypes.INTEGER},
    residential_city_top_avg: {type: DataTypes.INTEGER},
    residential_city_min: {type: DataTypes.INTEGER},
    residential_city_max: {type: DataTypes.INTEGER},
    residential_city_avg: {type: DataTypes.INTEGER},
    residential_neighborhood_min: {type: DataTypes.INTEGER},
    residential_neighborhood_max: {type: DataTypes.INTEGER},
    residential_neighborhood_avg: {type: DataTypes.INTEGER},
})
Market.belongsTo(Users, {foreignKey: 'user_id', targetKey: 'id'})