const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const Users = require('./User')

const MLP_Unit = sequelize.define('mlp_unit', {
    residential_house_sale_min: {type: DataTypes.FLOAT},
    residential_house_sale_max: {type: DataTypes.FLOAT},
    residential_house_sale_avg: {type: DataTypes.FLOAT},
    residential_apartment_rent_min: {type: DataTypes.FLOAT},
    residential_apartment_rent_max: {type: DataTypes.FLOAT},
    residential_apartment_rent_avg: {type: DataTypes.FLOAT},
    residential_apartment_sale_min: {type: DataTypes.FLOAT},
    residential_apartment_sale_max: {type: DataTypes.FLOAT},
    residential_apartment_sale_avg: {type: DataTypes.FLOAT},
    office_min: {type: DataTypes.FLOAT},
    office_max: {type: DataTypes.FLOAT},
    office_avg: {type: DataTypes.FLOAT},
    retail_min: {type: DataTypes.FLOAT},
    retail_max: {type: DataTypes.FLOAT},
    retail_avg: {type: DataTypes.FLOAT},
    residential_house_rent_min: {type: DataTypes.FLOAT},
    residential_house_rent_max: {type: DataTypes.FLOAT},
    residential_house_rent_avg: {type: DataTypes.FLOAT},
},{freezeTableName: true, updatedAt: false, createdAt: false})
MLP_Unit.belongsTo(Users, {foreignKey: 'user_id', targetKey: 'id'})
MLP_Unit.removeAttribute('id')

module.exports = MLP_Unit