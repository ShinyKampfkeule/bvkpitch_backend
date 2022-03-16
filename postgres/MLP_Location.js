const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const Users = require('./User')

const MLP_Location = sequelize.define('mlp_location', {
    user_id: {type: DataTypes.INTEGER, primaryKey: true},
    residential_rent_micro_min: {type: DataTypes.FLOAT},
    residential_rent_micro_max: {type: DataTypes.FLOAT},
    residential_rent_micro_avg: {type: DataTypes.FLOAT},
    residential_rent_macro_min: {type: DataTypes.FLOAT},
    residential_rent_macro_max: {type: DataTypes.FLOAT},
    residential_rent_macro_avg: {type: DataTypes.FLOAT},
    residential_sale_micro_min: {type: DataTypes.FLOAT},
    residential_sale_micro_max: {type: DataTypes.FLOAT},
    residential_sale_micro_avg: {type: DataTypes.FLOAT},
    residential_sale_macro_min: {type: DataTypes.FLOAT},
    residential_sale_macro_max: {type: DataTypes.FLOAT},
    residential_sale_macro_avg: {type: DataTypes.FLOAT},
    office_micro_min: {type: DataTypes.FLOAT},
    office_micro_max: {type: DataTypes.FLOAT},
    office_micro_avg: {type: DataTypes.FLOAT},
    office_macro_min: {type: DataTypes.FLOAT},
    office_macro_max: {type: DataTypes.FLOAT},
    office_macro_avg: {type: DataTypes.FLOAT},
    retail_micro_min: {type: DataTypes.FLOAT},
    retail_micro_max: {type: DataTypes.FLOAT},
    retail_micro_avg: {type: DataTypes.FLOAT},
    retail_macro_min: {type: DataTypes.FLOAT},
    retail_macro_max: {type: DataTypes.FLOAT},
    retail_macro_avg: {type: DataTypes.FLOAT},
},{freezeTableName: true, updatedAt: false, createdAt: false})
MLP_Location.belongsTo(Users, {foreignKey: 'user_id', targetKey: 'id'})
MLP_Location.removeAttribute('id')

module.exports = MLP_Location