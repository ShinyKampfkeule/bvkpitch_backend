const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const Users = require('./User')

const MLP_Location = sequelize.define('mlp_location', {
    residential_rent_micro_min: {type: DataTypes.INTEGER},
    residential_rent_micro_max: {type: DataTypes.INTEGER},
    residential_rent_micro_avg: {type: DataTypes.INTEGER},
    residential_rent_macro_min: {type: DataTypes.INTEGER},
    residential_rent_macro_max: {type: DataTypes.INTEGER},
    residential_rent_macro_avg: {type: DataTypes.INTEGER},
    residential_sale_micro_min: {type: DataTypes.INTEGER},
    residential_sale_micro_max: {type: DataTypes.INTEGER},
    residential_sale_micro_avg: {type: DataTypes.INTEGER},
    residential_sale_macro_min: {type: DataTypes.INTEGER},
    residential_sale_macro_max: {type: DataTypes.INTEGER},
    residential_sale_macro_avg: {type: DataTypes.INTEGER},
    office_micro_min: {type: DataTypes.INTEGER},
    office_micro_max: {type: DataTypes.INTEGER},
    office_micro_avg: {type: DataTypes.INTEGER},
    office_macro_min: {type: DataTypes.INTEGER},
    office_macro_max: {type: DataTypes.INTEGER},
    office_macro_avg: {type: DataTypes.INTEGER},
    retail_micro_min: {type: DataTypes.INTEGER},
    retail_micro_max: {type: DataTypes.INTEGER},
    retail_micro_avg: {type: DataTypes.INTEGER},
    retail_macro_min: {type: DataTypes.INTEGER},
    retail_macro_max: {type: DataTypes.INTEGER},
    retail_macro_avg: {type: DataTypes.INTEGER},
})