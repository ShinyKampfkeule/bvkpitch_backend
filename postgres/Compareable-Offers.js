const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../db')
const Users = require('./User')

const Compareable_Offers = sequelize.define('compareable_offers', {
    offer_date: {type: DataTypes.STRING},
    sqm_price_cents: {type: DataTypes.INTEGER},
    build_year: {type: DataTypes.INTEGER},
    area: {type: DataTypes.INTEGER},
    rooms: {type: DataTypes.INTEGER},
    route: {type: DataTypes.STRING},
    street_number: {type: DataTypes.STRING}
}, {freezeTableName: true, updatedAt: false, createdAt: false})
Compareable_Offers.belongsTo(Users, {foreignKey: 'user_id', targetKey: 'id'})
Compareable_Offers.removeAttribute('id')

module.exports = Compareable_Offers