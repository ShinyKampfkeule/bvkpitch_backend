const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const Users = require('./User')

const MLP_Unit = sequelize.define('mlp_unit', {
    residential_house_sale_min: {type: DataTypes.INTEGER},
    residential_house_sale_max: {type: DataTypes.INTEGER},
    residential_house_sale_avg: {type: DataTypes.INTEGER},
    residential_apartment_rent_min: {type: DataTypes.INTEGER},
    residential_apartment_rent_max: {type: DataTypes.INTEGER},
    residential_apartment_rent_avg: {type: DataTypes.INTEGER},
    residential_apartment_sale_min: {type: DataTypes.INTEGER},
    residential_apartment_sale_max: {type: DataTypes.INTEGER},
    residential_apartment_sale_avg: {type: DataTypes.INTEGER},
    office_min: {type: DataTypes.INTEGER},
    office_max: {type: DataTypes.INTEGER},
    office_avg: {type: DataTypes.INTEGER},
    retail_min: {type: DataTypes.INTEGER},
    retail_max: {type: DataTypes.INTEGER},
    retail_avg: {type: DataTypes.INTEGER},
    residential_house_rent_min: {type: DataTypes.INTEGER},
    residential_house_rent_max: {type: DataTypes.INTEGER},
    residential_house_rent_avg: {type: DataTypes.INTEGER},
})
MLP_Unit.belongsTo(Users, {foreignKey: 'user_id', targetKey: 'id'})

module.exports = MLP_Unit